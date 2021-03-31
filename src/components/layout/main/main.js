import React from "react"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import List from "../../List/List"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import Sidebar from "../Sidebar/Sidebar"
import styles from "./Main.module.css"

const Main = ({ authService }) => {
  const history = useHistory()

  const [userInfo, setUserInfo] = useState({})

  const onLogout = () => {
    authService.onLogout()
  }

  useEffect(() => {
    authService.onAuthChange((user) => {
      if (!user) {
        history.push("/")
      } else {
        setUserInfo(user)
      }
    })
  }, [])

  return (
    <section className={styles.main}>
      <Header onLogout={onLogout} userInfo={userInfo} />
      <section className={styles.container}>
        <Sidebar />
        <section className={styles.rightContainer}>
          <List userInfo={userInfo} />
        </section>
      </section>
      <Footer isLogin={true} />
    </section>
  )
}

export default Main
