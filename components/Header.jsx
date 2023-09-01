import Link from "next/link"
import styles from './Header.module.css';

const pages = [
    {href:'/', name:'На главную'},
    {href:'/about', name:'О сайте'},
    {href:'/contact', name:'Контакты'},
];

export default function Header(){
    return <header>
        <nav className={styles.nav}>
            <ul>
                {pages.map(({href, name})=>
                <li key={href}>
                    <Link href={href}>{name}</Link></li>)}
                {/* {<li><Link href="/">Home</Link></li>
                <li><Link href="/about">About</Link></li>} */}
            </ul>
        </nav>
    </header>
}