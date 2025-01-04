import Link from 'next/link'

export default function Sidebar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href='/data-analysis/dashboard01'>Dashboard 01</Link>
        </li>
        <li>
          <Link href='/data-analysis/dashboard02'>Dashboard 02</Link>
        </li>
      </ul>
    </nav>
  )
}
