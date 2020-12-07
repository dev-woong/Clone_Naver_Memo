import React, { memo } from 'react';
import styles from './footer.module.css';

const Footer = memo(({isLogin}) => {
    return(
        <footer className={isLogin?styles.footer:styles.loginFooter}>
            <p className={styles.title}>dev_woong@naver.com</p>
          </footer>
            )
          
})

export default Footer;
