import React from "react";
import styles from "./style.module.css";

const TermsAndConditions = () => {
  return (
    <div className={styles.termsContainer}>
      <div className={styles.header}>
        <h1>WiseTraveler - Terms and Conditions</h1>
      </div>

      <div className={styles.form}>
        <div className={styles.label}>
          <h2>Introduction</h2>
          <p>
            Welcome to WiseTraveler! By using our service, you agree to comply
            with the following terms and conditions. If you do not agree, please
            refrain from using our platform.
          </p>
        </div>

        <div className={styles.label}>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using the WiseTraveler application, you agree to
            abide by these Terms and Conditions, as well as our Privacy Policy.
            If you do not agree, you may not use our service.
          </p>
        </div>

        <div className={styles.label}>
          <h2>2. Account Registration</h2>
          <p>
            You may be required to register for an account to use certain
            features of WiseTraveler. You must provide accurate, current, and
            complete information during the registration process. You are
            responsible for maintaining the confidentiality of your account
            information.
          </p>
        </div>

        <div className={styles.label}>
          <h2>3. Use of Services</h2>
          <p>
            WiseTraveler provides a platform for planning trips and vacations.
            You agree to use the services for lawful purposes and in compliance
            with all applicable laws.
          </p>
        </div>

        <div className={styles.label}>
          <h2>4. User Conduct</h2>
          <p>
            You agree not to misuse or interfere with the functionality of
            WiseTraveler. This includes, but is not limited to, uploading or
            transmitting harmful content, or attempting unauthorized access to
            other users' accounts.
          </p>
        </div>

        <div className={styles.label}>
          <h2>5. Privacy</h2>
          <p>
            Your privacy is important to us. Please review our Privacy Policy to
            understand how we collect, use, and protect your personal
            information.
          </p>
        </div>

        <div className={styles.label}>
          <h2>6. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your access to
            WiseTraveler at any time for violation of these terms or for any
            other reason.
          </p>
        </div>

        <div className={styles.label}>
          <h2>7. Limitation of Liability</h2>
          <p>
            WiseTraveler is not responsible for any damages, losses, or expenses
            arising from the use or inability to use the platform.
          </p>
        </div>

        <div className={styles.label}>
          <h2>8. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms and Conditions at any
            time. We will notify users of significant changes through the
            application. By continuing to use WiseTraveler, you accept any
            modifications to these terms.
          </p>
        </div>

        <div className={styles.label}>
          <h2>9. Contact Us</h2>
          <p>
            If you have any questions or concerns regarding these Terms and
            Conditions, please contact us at support@wisetraveler.com.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
