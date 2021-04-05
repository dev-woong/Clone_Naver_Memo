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
    swapPage("trash")
  }

  return (
    <div className={styles.sidebar}>
      <div className={styles.contents}>
        <ul className={styles.underLine}>
          <li>
            <span>
              <i onClick={handleClickTodoList} className="fas fa-calendar-check"></i>
              <h2 onClick={handleClickTodoList}>중요 메모</h2>
            </span>
          </li>
          <li>
            <span>
              <i onClick={handleClickTodoList} className="fas fa-star"></i>
              <h2 onClick={handleClickTodoList}>오늘 할일</h2>
            </span>
          </li>
        </ul>
        <ul className={styles.underLine}>
          <li>
            <span>
              <i onClick={handleClickMemo} className="far fa-sticky-note"></i>
              <h2 onClick={handleClickMemo}>메모장</h2>
            </span>
          </li>
        </ul>
        <ul>
          <li>
            <span>
              <i onClick={handleClickTrash} className="fas fa-trash-alt"></i>
              <h2 onClick={handleClickTrash}>휴지통</h2>
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
