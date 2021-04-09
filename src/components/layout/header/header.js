import React, { memo, useEffect } from "react"
import { Link } from "react-router-dom"
import styles from "./Header.module.css"

const Header = ({ onLogout, userInfo }) => {
  useEffect(() => {}, [userInfo])

  return (
    <header className={onLogout ? styles.header_login : styles.header_logout}>
      {onLogout && (
        <div>
          {userInfo.displayName && (
            <span className={styles.user_name}>{userInfo.displayName}님 환영합니다</span>
          )}
          <button className={styles.logout} onClick={onLogout}>
            <i className="fas fa-sign-out-alt fa-2x"></i>
          </button>
        </div>
      )}
      <Link to="/main" className={styles.title}>
        <img src={require("../../../common/naver_logo.png")} />
      </Link>
    </header>
  )
}

export default Header
