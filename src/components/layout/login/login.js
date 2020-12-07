import React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';
import styles from './login.module.css'


const Login = ({authService}) => {
    const history = useHistory();
    const goToMain = (userId) =>{
        history.push({
            pathname:'/main',
            state:{id:userId},
        })
    }

    const onLogin = event =>{
        console.log(event.currentTarget.textContent);
        authService
        .login(event.currentTarget.textContent)
        .then(data => console.log(data))
        // .then(data => goToMain(data.user.uid))
    }

    useEffect(()=>{
        authService
        .onAuthChange(user =>{
            user && goToMain(user.uid);
        })
    })

    return (
        <section className={styles.login}>
      <Header />
      <section>
        <h1>Login</h1>
        <ul className={styles.list}>
          <li className={styles.item}>
            <button onClick={onLogin} className={styles.button} >
              Google
            </button>
          </li>
          <li className={styles.item}>
            <button onClick={onLogin} className={styles.button} >
              Github
            </button>
          </li>
        </ul>
      </section>
      <Footer isLogin={false}/>
    </section>
    );
};

export default Login;