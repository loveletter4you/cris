import React, {useState, useEffect} from "react";
import n from "./Navbar.module.css"
import {NavLink} from "react-router-dom";


const Navbar = () => {


    const [Active, setActive] = useState(false);

    const toggle = () => {
        setActive(!Active);
    }

    useEffect(() => {
        if(Active===true){
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = 'unset';
        }
    }, [Active]);


    return (
        <div className={n.appWrapperNavbar}>

            <div className={n.burger } onClick={toggle}>
                <span></span>
            </div>
            <div className={Active? n.back: null}>
            <div className={Active? n.menu+" "+n.active :n.menu}>
                    <div className={n.item} onClick={toggle}>
                        <NavLink to="/publications"
                                 className={navData => navData.isActive ? n.active : null}>Публикации</NavLink>
                    </div>
                    <div className={n.item} onClick={toggle}>
                        <NavLink to="/authors"
                                 className={navData => navData.isActive ? n.active : null}>Персоналии</NavLink>
                    </div>
                    <div className={n.item} onClick={toggle}>
                        <NavLink to="/"
                                 className={navData => navData.isActive ? n.active : null}>Источники</NavLink>
                    </div>
                    <NavLink to="/login">
                        <button className={n.btn} onClick={toggle}>Войти</button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Navbar;