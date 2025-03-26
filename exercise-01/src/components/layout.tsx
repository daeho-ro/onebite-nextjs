import Link from 'next/link';
import style from './layout.module.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <Link href={'/'}>ONEBITE CINEMA</Link>
      </header>
      <main className={style.main}>{children}</main>
    </div>
  );
}
