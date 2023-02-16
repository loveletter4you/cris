import React, {useState} from "react";
import n from "./Navbar.module.css"
import {NavLink} from "react-router-dom";


const Navbar = () => {


    const [Active, setActive] = useState(false);

    const toggle = () => {
        setActive(!Active);
    }

    return (
        <div className={n.appWrapperNavbar}>

            <div className={n.burger } onClick={toggle}>
                <span></span>
            </div>
            <div className={Active? n.back: null}>
            <div className={Active? n.menu+" "+n.active :n.menu}>
                    <div className={n.item}>
                        <NavLink to="/publications"
                                 className={navData => navData.isActive ? n.active : n.item}>Публикации</NavLink>
                    </div>
                    <div className={n.item}>
                        <NavLink to="/authors"
                                 className={navData => navData.isActive ? n.active : n.item}>Персоналии</NavLink>
                    </div>
                    <div className={n.item}>
                        <NavLink to="/" className={navData => navData.isActive ? n.active : n.item}>Источники</NavLink>
                    </div>
                    <NavLink to="/login">
                        <button className={n.btn}>Войти</button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Navbar;