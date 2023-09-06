import Link from 'next/link';
import styles from './Header.module.css';

const pages = [
  { href: '/', name: 'Home' },
  { href: '/about', name: 'About' },
  { href: '/users', name: 'Users' },
  { href: '/users-on-click', name: 'Users (on click)'},
  { href: '/userst', name: 'Таблица пользователей' },
];


export default function Header() {
  return <header>
    <nav className={styles.nav}>
      <ul>
        {pages.map(({ href, name }) =>
          <li key={href}>
            <Link href={href}>{name}</Link></li>)}
        {/* <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About</Link></li> */}
      </ul>
    </nav>
  </header>;
}