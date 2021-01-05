import React, { memo } from "react"
import { Link } from "react-router-dom"
import styles from "./header.module.css"

const Header = memo(({ onLogout }) => (
  <header className={onLogout ? styles.header_login : styles.header_logout}>
    {onLogout && (
      <button className={styles.logout} onClick={onLogout}>
        <i class="fas fa-sign-out-alt fa-2x"></i>
      </button>
    )}
    <Link to="/" className={styles.title}>
      메모
    </Link>
  </header>
))

export default Header
