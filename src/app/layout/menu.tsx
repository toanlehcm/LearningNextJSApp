import Link from 'next/link'

export default function Menu() {
  return (
    <nav className='menu'>
      <div className='menu__logo'>
        <Link href='/'>WNE</Link>
      </div>
      <ul className='menu__items'>
        <li>
          <Link href='/data-analysis'>Data Analysis</Link>
        </li>
        <li>
          <Link href='/test'>Test</Link>
        </li>
        <li>
          <Link href='/blog'>Blog</Link>
        </li>
      </ul>
    </nav>
  )
}
