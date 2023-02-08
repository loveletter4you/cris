import React from "react";
import './App.css';
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import {Route, Routes} from "react-router-dom";
import Authors from "./Components/AllAuthors/Authors";
import Author from "./Components/Authors/Author";
import Publications from "./Components/Publications/Publications";
import Auth from "./Components/Auth/Auth";
import SignUp from "./Components/Auth/SignUp";
import Publication from "./Components/OnePublication/Publication";
import AuthorsOfPublication from "./Components/Publications/AuthorsOfPublication";

function App(props) {
    return <div className='app-wrapper'>
        <main className="main">
        <div className="app-wrapper__container">
            <Header/>
            <div className='app-wrapper-content'>
                <Routes>
                    <Route path='/author/:id'
                           element={<Author/>}/>
                    <Route path='/authors'
                           element={<Authors/>}/>
                    <Route path={'/publication/:id/authors'}
                           element={<AuthorsOfPublication/>}/>
                    <Route path='/publications'
                           element={<Publications/>}/>
                    <Route path='/publication/:id'
                           element={<Publication/>}/>
                    <Route path = '/login'
                           element={<Auth/>}/>
                    <Route path = '/registration'
                           element={<SignUp/>}/>
                </Routes>
            </div>
            <Footer/>
        </div>
        </main>
    </div>
}

export default App;
