import React, { memo, useEffect } from "react"
import { Link } from "react-router-dom"
import styles from "./Header.module.css"

const Header = ({ onLogout, userInfo }) => {
  useEffect(() => {}, [userInfo])

  return (
    <header className={onLogout ? styles.header_login : styles.header_logout}>
      {onLogout && (
        <div>
          <span>{userInfo.displayName}</span>
          <button className={styles.logout} onClick={onLogout}>
            <i class="fas fa-sign-out-alt fa-2x"></i>
          </button>
        </div>
      )}
      <Link to="/" className={styles.title}>
        메모
      </Link>
    </header>
  )
}

export default Header
