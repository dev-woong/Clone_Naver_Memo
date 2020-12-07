import React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import List from '../../list/list';
import Footer from '../footer/footer';
import Header from '../header/header';
import Sidebar from '../sidebar/sidebar';
// import Editor from '../editor/editor';
import styles from './main.module.css';

const Main = ({ list, authService }) => {
    const history = useHistory();
    const onLogout = () => {
        authService.onLogout();
    }

    useEffect(() => {
        authService.onAuthChange(user => {
            if (!user) {
                history.push('/')
            }
        })
    })
    return (
        <section className={styles.main}>
            <Header onLogout={onLogout} />
            <section className={styles.container}>
                <Sidebar />
                <List list={list} />
            </section>
            <Footer isLogin={true} />
        </section>
    );
};

export default Main;