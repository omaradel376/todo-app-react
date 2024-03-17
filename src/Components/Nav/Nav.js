import React from 'react'
import "./Nav.css"
import { Link } from 'react-router-dom'
function Nav() {
  return (
    <header>
      <Link to="/" className="logo">react.js</Link>
      <Link to="/add-task">Click To <span>Add</span> Some</Link>
  </header>
  )
}

export default Nav
