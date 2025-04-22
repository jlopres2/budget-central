 // Navbar.jsx
 import React from 'react';
 import './../styles/NavBar.css'
  import { Link } from 'react-router-dom';
 
 function Navbar() {
   return (
    <div className="navbar bg-primary text-primary-content">
        <div className="flex-1">
            <a className="btn btn-ghost text-xl">Budget-Central</a>
        </div>
        <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <details>
                <summary>Profile</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                    <li><Link to="/register/"><a>Register</a></Link></li>
                    <li><Link to="/login/">Login</Link></li>
                    <li><Link to="/logout/">Logout</Link></li>
                </ul>
                </details>
            </li>
            </ul>
        </div>
    </div>



   );
 }
 
 export default Navbar;