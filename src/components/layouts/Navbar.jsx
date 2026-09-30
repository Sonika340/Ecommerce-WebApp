import React from 'react';
import Styles from "./_navbar.module.css";
import { Link } from 'react-router-dom';
import AuthNav from './navbar/AuthNav';
import AnonUser from './navbar/AnonUser';
import { useAuth } from '../../hooks/fetchUser';

const Navbar = () => {
    const {user} = useAuth();
    console.log(user)

  return (
    <section id={Styles.navbar}>
        <article className={Styles.container}>
            <aside className={Styles.logoBlock}>
                <a href='#'>SELLIT</a>
            </aside>
            <aside className={Styles.menuBlock}>
               <nav>
                <ul>
                    {
                        user ? <AuthNav /> : <AnonUser /> 
                    }
                   
                </ul>
               </nav>
            </aside>
        </article>
    </section>
  )
}

export default Navbar;