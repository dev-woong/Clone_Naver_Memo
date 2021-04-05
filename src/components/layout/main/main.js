import React from "react"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import Memo from "../../Memo/Memo"
import Trash from "../../Trash/Trash"
import ToDoList from "../../ToDoList/ToDoList"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import Sidebar from "../Sidebar/Sidebar"
import Loading from "../../Loading/Loading"
import styles from "./Main.module.css"

const Main = ({ authService }) => {
  const history = useHistory()

  const [userInfo, setUserInfo] = useState({})

  const [isLoad, setIsLoad] = useState(false)

  const [selectedPage, setSelectedPage] = useState("memo")
  
  const onLogout = () => {
    authService.onLogout()
  }

  useEffect(() => {
    authService.onAuthChange((user) => {
      if (!user) {
        history.push("/")
      } else {
        setUserInfo(user)
        setIsLoad(true)
      }
    })
  }, [userInfo, selectedPage])

  if (isLoad) {
    return (
      <section className={styles.main}>
        <Header onLogout={onLogout} userInfo={userInfo} />
        <section className={styles.container}>
          <Sidebar swapPage={setSelectedPage} />
          <section className={styles.rightContainer}>
            {selectedPage === "memo" && <Memo userInfo={userInfo} />}
            {selectedPage === "todoList" && <ToDoList />}
            {selectedPage === "trash" && <Trash />}
          </section>
        </section>
        <Footer isLogin={true} />
      </section>
    )
  } else {
    return <Loading />
  }
}

export default Main
