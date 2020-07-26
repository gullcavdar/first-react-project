import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Navbar({title}) {
    return(
        /*<div>
            <h3>{title}</h3> 
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/add">Add User</Link>
                </li>
                <li>
                    <Link to="/github">Project Files</Link>
                </li>
            </ul>  
        </div>*/

        <nav className="navbar-nav navbar-expand-lg navbar-dark bg-dark mb-3 p-3">
        
            <a href="/" className="navbar-brand">{title}</a>

            <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item active">
                    <Link to="/add" className="nav-link">Add User</Link>
                </li>
                <li className="nav-item active">
                    <Link to="/github" className="nav-link">Project Files</Link>
                </li>
            </ul>
        
        </nav>
    )
}

Navbar.propTypes ={
    title : PropTypes.string.isRequired
}

Navbar.defaultProps ={
    title: "Default App"
}

export default Navbar;
