import React from "react"
import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import styles from "./Login.module.css"

const Login = ({ authService }) => {
  const history = useHistory()
  const goToMain = (userId) => {
    history.push({
      pathname: "/main",
      state: { id: userId },
    })
  }

  const onLogin = (event) => {
    authService.login(event.currentTarget.textContent).catch((err) => alert(err.message))
  }

  useEffect(() => {
    authService.onAuthChange((user) => {
      user && goToMain(user.uid)
    })
  })

  return (
    <section className={styles.login}>
      <Header />
      <section>
        <h1>Login</h1>
        <ul className={styles.list}>
          <li className={styles.item}>
            <button onClick={onLogin} className={styles.button}>
              Google
            </button>
          </li>
          <li className={styles.item}>
            <button onClick={onLogin} className={styles.button}>
              Github
            </button>
          </li>
        </ul>
      </section>
      <Footer isLogin={false} />
    </section>
  )
}

export default Login
