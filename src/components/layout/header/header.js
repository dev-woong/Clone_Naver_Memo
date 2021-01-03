import React, { memo } from "react"
import styles from "./header.module.css"

const Header = memo(({ onLogout }) => (
  <header className={styles.header}>
    {onLogout && (
      <button className={styles.logout} onClick={onLogout}>
        <i class="fas fa-sign-out-alt fa-2x"></i>
      </button>
    )}
    <h1 className={styles.title}>메모장</h1>
  </header>
))

export default Header
