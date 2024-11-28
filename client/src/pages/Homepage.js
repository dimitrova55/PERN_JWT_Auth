import React from "react";
import { NavLink } from "react-router-dom";

function Homepage() {
    return(
    <>
        <h1>Home page</h1>
        <NavLink to="/register"><button className="btn btn-primary">Register</button></NavLink>
        <NavLink to="/login"><button className="btn btn-primary">Login</button></NavLink>
        
    </>
    );
}

export default Homepage;