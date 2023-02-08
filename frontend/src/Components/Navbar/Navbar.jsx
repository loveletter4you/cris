import React from "react";
import n from "./Navbar.module.css"
import {NavLink} from "react-router-dom";


const Navbar = () => {
    return
    <nav>
        <div className={n.appWrapperNavbar}>
            <input type="checkbox" name="menu" id="btn-menu"/>
            <label for="btn-menu">btn menu</label>
            <div className={n.item}>
                <NavLink to="/publications"
                         className={navData => navData.isActive ? n.active : n.item}>Публикации</NavLink>
            </div>
            <div className={n.item}>
                <NavLink to="/authors" className={navData => navData.isActive ? n.active : n.item}>Персоналии</NavLink>
            </div>
            <div className={n.item}>
                <NavLink to="/" className={navData => navData.isActive ? n.active : n.item}>Источники</NavLink>
            </div>
            <NavLink to="/login">
                <button className={n.btn}>Войти</button>
            </NavLink>

        </div>
    </nav>
}

export default Navbar;