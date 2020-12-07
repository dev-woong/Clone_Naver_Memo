import React, { memo } from 'react';
import styles from './sidebar.module.css';

const Sidebar = memo(({ onLogout }) => (

    <sidebar className={styles.sidebar}>
        <b>할일</b>
    </sidebar>
));

export default Sidebar;