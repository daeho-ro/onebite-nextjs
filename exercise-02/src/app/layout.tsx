import Link from 'next/link';
import './globals.css';
import style from './layout.module.css';

export default function Layout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className={style.container}>
          <header className={style.header}>
            <Link href={'/'}>ONEBITE CINEMA</Link>
          </header>
          <main className={style.main}>{children}</main>
        </div>
        {modal}
        <div id="modal-root" />
      </body>
    </html>
  );
}
