import React from 'react'
import "./Nav.css"
import { Link, NavLink } from 'react-router-dom'
import { faReact } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function Nav() {
  return (
    <header>
      <Link to="/" className="logo">react.js <FontAwesomeIcon icon={faReact} /> </Link>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/add-task/add-new-task">Add Task</NavLink>
      </nav>
  </header>
  )
}

export default Nav
