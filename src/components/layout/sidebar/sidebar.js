import React from "react"
import styles from "./Sidebar.module.css"

const Sidebar = ({ swapPage }) => {
  const handleClickMemo = () => {
    swapPage("memo")
  }

  const handleClickTodoList = () => {
    swapPage("todoList")
  }

  const handleClickTrash = () => {
    swapPage("Trash")
  }

  return (
    <div className={styles.sidebar}>
      <div className={styles.contents}>
        <span>
          <i onClick={handleClickMemo} className="far fa-sticky-note"></i>
          <h2 onClick={handleClickMemo}>메모장</h2>
        </span>
        <span>
          <i onClick={handleClickTodoList} className="fas fa-calendar-check"></i>
          <h2 onClick={handleClickTodoList}>오늘 할일</h2>
        </span>
        <span>
          <i onClick={handleClickTrash} className="fas fa-trash-alt"></i>
          <h2 onClick={handleClickTrash}>휴지통</h2>
        </span>
      </div>
    </div>
  )
}

export default Sidebar
