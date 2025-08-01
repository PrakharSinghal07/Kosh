// utils/resolveUserEmail.js

import { Book } from "../models/book.model.js";


export const resolveBookName = async (parameters) => {
  if (parameters.title) {
    const books = await Book.find({ title: { $regex: parameters.title, $options: "i" } });
    if (books.length === 1) {
      return { bookId: books[0]._id };
    } else if (books.length > 1) {
      const bookNames = books
        .map((b) => `${b.title} (${b._id})`)
        .join("<br /><br />");
      return {
        conflict: true,
        message:
          "I found multiple books with the same title:<br /><br />" +
          bookNames +
          "<br /><br />Please specify which book you're referring to.",
      };
    } else {
      return { error: "No book found with that title." };
    }
  }

  return { bookId: parameters.id };
};
