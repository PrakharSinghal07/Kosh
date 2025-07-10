import React from "react";
import styles from "./LandingPage.module.css";
import illustration from "../../assets/image.png";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function LandingPage() {
  const {isAuthenticated} = useContext(AuthContext);
  const navigate = useNavigate()
  return (
    <div className={styles.landingPageContainer}>
      <header className={styles.header}>
        <div className={styles.logoCreative}>
          <div className={styles.logoCircle}></div>
          <span className={styles.logoText}>BookWorm</span>
        </div>

        <div className={styles.decorativeGeometry}>
          <svg className={styles.hexagon} viewBox="0 0 100 100">
            <polygon points="50,0 93,25 93,75 50,100 7,75 7,25" />
          </svg>
          <svg className={styles.circle} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" />
          </svg>
          <div className={styles.wave}></div>
        </div>

        <button className={styles.getStartedButton} onClick={() => {isAuthenticated ? navigate("/dashboard") : navigate("/register")}}>Register</button>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.textSection}>
          <h1 className={styles.heading}>
            Online <br /> Library
          </h1>
          <p className={styles.description}>
            BookWorm is your intelligent digital library—borrow, manage, and return books effortlessly. Discover a seamless reading experience built for modern learners and
            institutions.
          </p>

          <button className={styles.readMoreButton} onClick={() => {isAuthenticated ? navigate("/dashboard") : navigate("/login")}}>Get Started</button>
        </div>
        <div className={styles.illustrationSection}>
          <img src={illustration} alt="Online Library Illustration" className={styles.illustrationImage} />
          <div className={styles.triangle1}></div>
          <div className={styles.triangle2}></div>
          <div className={styles.line1}></div>
          <div className={styles.line2}></div>
          <div className={styles.circle1}></div>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;
