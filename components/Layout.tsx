import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import styles from './Layout.module.scss';

type LayoutProps = {
  title: string;
  children: React.ReactNode;
};

const Layout = function ({ title, children }: LayoutProps): JSX.Element {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.header}>
        <Link href="/">
          <a>
            <Image
              src="/wayru_logo_white.png"
              alt="Wayru logo with name"
              width={127}
              height={38}
            />
          </a>
        </Link>
      </div>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <strong>Disclaimer</strong>
        <p>
          Wayru is a trademark of Wayru Inc., and its brand is used on this site
          for demonstration purposes only.
        </p>
      </footer>
    </div>
  );
};

export default Layout;
