import type { NextPageWithLayout } from '../types';

import Layout from '../components/Layout';
import styles from '../page_styles/success.module.scss';

const Success: NextPageWithLayout = function () {
  return (
    <>
      <h1 className={styles.title}>
        Great news! You are registered to attend Wayru Conf 2022.
      </h1>
      <p className={styles.text}>
        You should be receiving an email with more information shortly. Make
        sure to check your spam folder just in case.
      </p>
      <p className={styles.text}>
        Thank you for the interest in our products, and for being part of our
        fantastic community.
      </p>
    </>
  );
};

Success.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout title="Success - Wayru Conf 2022">{page}</Layout>;
};

export default Success;
