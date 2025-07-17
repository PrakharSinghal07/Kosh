import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.middleware.js";
import { Book } from "../models/book.model.js";
import { Borrow } from "../models/borrow.model.js";
import { User } from "../models/user.model.js";
import { calculateFine } from "../utils/fineCalculator.js";

export const recordBorrowBook = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { email } = req.body;

  const book = await Book.findById(id);
  if (!book) {
    return next(new ErrorHandler("Book not found", 404));
  }

  const user = await User.findOne({ email, accountVerified: true });

  if (!user) {
    return next(new ErrorHandler("User not found!", 404));
  }
  if (book.quantity === 0) {
    return next(new ErrorHandler("Book is out of stock", 400));
  }

  const populatedUser = await user.populate({
    path: "borrowedBooks.borrowId",
    populate: { path: "book" },
  });

  const isAlreadyBorrowed = populatedUser.borrowedBooks.find((b) => {
    return b.borrowId?.book?._id.toString() === id && b.returned === false;
  });

  if (isAlreadyBorrowed) {
    return next(new ErrorHandler("Book Already Borrowed"));
  }

  book.quantity -= 1;
  book.availability = book.quantity > 0;

  const borrow = await Borrow.create({
    user: user._id,
    price: book.price,
    book: book._id,
    borrowDate: Date.now(),
    dueDate: Date.now() + 7 * 24 * 60 * 60 * 1000,
  });

  user.borrowedBooks.push({
    borrowId: borrow._id,
    returned: false,
  });

  await user.save();
  await book.save();

  res.status(200).json({
    success: true,
    message: "Borrowed book recorded successfully",
  });
});

export const returnBook = catchAsyncErrors(async (req, res, next) => {
  const { bookId } = req.params;
  const { email } = req.body;

  const book = await Book.findById(bookId);
  if (!book) {
    return next(new ErrorHandler("Book not found", 404));
  }

  const user = await User.findOne({ email, accountVerified: true });
  if (!user) {
    return next(new ErrorHandler("User not found!", 404));
  }

  const populatedUser = await user.populate({
    path: "borrowedBooks.borrowId",
    populate: { path: "book" },
  });

  const borrowedBook = populatedUser.borrowedBooks.find((b) => {
    return b.borrowId?.book?._id.toString() === bookId && b.returned === false;
  });

  if (!borrowedBook) {
    return next(new ErrorHandler("You have not borrowed this book", 400));
  }

  const borrowId = borrowedBook.borrowId;
  borrowedBook.returned = true;
  await user.save();

  book.quantity += 1;
  book.availability = book.quantity > 0;
  await book.save();

  const borrow = await Borrow.findById(borrowId);
  if (!borrow) {
    return next(new ErrorHandler("Borrow record not found", 400));
  }

  borrow.returnDate = Date.now();
  const fine = calculateFine(borrow.dueDate);
  borrow.fine = fine;
  await borrow.save();

  res.status(200).json({
    success: true,
    message:
      fine != 0
        ? `The book has been returned successfully. The total charges including a fine are ${fine + book.price}`
        : `The book has been returned successfully. The total charges are ${book.price}`,
    fine,
  });
});

export const getBorrowedBooks = catchAsyncErrors(async (req, res, next) => {

  const user = await req.user.populate({
    path: "borrowedBooks.borrowId",
    populate: { path: "book" },
  });

  const borrowedBooks = user.borrowedBooks.map((entry) => {
    const borrow = entry.borrowId;
    return {
      book: {
        title: borrow?.book?.title,
        author: borrow?.book?.author,
        price: borrow?.price,
      },
      returned: entry.returned,
      borrowDate: borrow?.borrowDate,
      dueDate: borrow?.dueDate,
      returnDate: borrow?.returnDate,
      fine: borrow?.fine,
    };
  });

  res.status(200).json({
    success: true,
    borrowedBooks,
  });
});

export const getBorrowedBooksForAdmin = catchAsyncErrors(async (req, res, next) => {
  
  const borrows = await Borrow.find({}).populate("user").populate("book");
  res.status(200).json({
    success: true,
    borrows,
  });
});
