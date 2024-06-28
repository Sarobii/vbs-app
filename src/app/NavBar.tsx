import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  return (
    <nav>
      <Link href="/">Home</Link>
      <ul>
        <li>All</li>
        <li>To Do </li>
        <li>Category</li>
        <li>Status</li>
      </ul>
    </nav>
  )
}

export default NavBar