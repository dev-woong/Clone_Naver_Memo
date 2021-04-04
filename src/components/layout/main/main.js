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

  const [pageSwapCount, setPageSwapCount] = useState(0)

  const onLogout = () => {
    authService.onLogout()
  }

  const swapPage = (clickedPage) => {
    switch (clickedPage) {
      case "memo":
        memoPage = true
        todoListPage = false
        trashPage = false
        setPageSwapCount(pageSwapCount + 1)
        console.log(pageSwapCount)
        break
      case "todoList":
        memoPage = false
        todoListPage = true
        trashPage = false
        setPageSwapCount(pageSwapCount + 1)
        break
      case "trash":
        memoPage = false
        todoListPage = false
        trashPage = true
        setPageSwapCount(pageSwapCount + 1)
        break
    }
  }

  let memoPage,
    todoListPage,
    trashPage = true

  useEffect(() => {
    authService.onAuthChange((user) => {
      if (!user) {
        history.push("/")
      } else {
        setUserInfo(user)
        setIsLoad(true)
      }
    })
  }, [userInfo, pageSwapCount])

  if (isLoad) {
    return (
      <section className={styles.main}>
        <Header onLogout={onLogout} userInfo={userInfo} />
        <section className={styles.container}>
          <Sidebar swapPage={swapPage} />
          <section className={styles.rightContainer}>
            {memoPage || <Memo userInfo={userInfo} />}
            {todoListPage && <ToDoList />}
            <Trash />
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
