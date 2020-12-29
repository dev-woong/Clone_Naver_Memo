import { logDOM } from "@testing-library/react"
import React, { useState, useEffect } from "react"
import styles from "./paper.module.css"

const Paper = ({
  list,
  status,
  deleteList,
  changeData,
  onFocus,
  cancleEvent,
  focusCount,
  focusCountPlus,
  focusCountMinus,
}) => {
  const { id, content, date } = list
  const checkNoDate = (date) => {
    return date !== undefined
  }

  const [paperValue, setPaperValue] = useState(content)
  const [stateOfFocus, setStateOfFocus] = useState("blur")

  const handleChange = (event) => {
    event.preventDefault()
    setPaperValue(event.target.value)
    changeData({ key: id, value: event.target.value })
  }

  const handleDelete = (event) => {
    event.preventDefault()
    deleteList(id)
  }

  const handleClick = (event) => {
    event.preventDefault()
    onFocus(id)
  }

  const handleFocus = (event) => {
    event.preventDefault()
    setStateOfFocus("focus")
    focusCountPlus()
  }

  const handleBlur = (event) => {
    event.preventDefault()
    setStateOfFocus("blur")
    focusCountMinus()
  }

  const getStylesToFocus = (state) => {
    if (focusCount === 0) {
      return styles.focus
    } else {
      switch (state) {
        case "focus":
          return styles.focus
        case "blur":
          return styles.blur
        default:
          throw new Error(`unknown theme: ${state}`)
      }
    }
  }

  useEffect(() => {
    setPaperValue(content)
  }, [content, cancleEvent])

  if (checkNoDate(date)) {
    return (
      <div className={`${styles.paper} ${getStylesToFocus(stateOfFocus)}`}>
        <div className={styles.head}>
          <input className={styles.checkbox} type="checkbox"></input>
          <label className={styles.date}>{date}</label>
          <button className={styles.delete} onClick={handleDelete}>
            삭제
          </button>
        </div>
        <div className={styles.area}>
          <textarea
            className={`${styles.content} ${getStylesToFocus(stateOfFocus)}`}
            value={paperValue}
            onChange={handleChange}
            onClick={handleClick}
            onFocus={handleFocus}
            onBlur={handleBlur}
            rows="15"
            cols="30"
          ></textarea>
        </div>
      </div>
    )
  } else {
    return (
      <div className={`${styles.paper} ${getStylesToFocus(stateOfFocus)}`}>
        <div className={styles.head}></div>
        <div className={styles.area}>
          <textarea
            className={`${styles.content} ${getStylesToFocus(stateOfFocus)}`}
            value={paperValue}
            onChange={handleChange}
            onClick={handleClick}
            onFocus={handleFocus}
            onBlur={handleBlur}
            rows="15"
            cols="30"
          ></textarea>
        </div>
      </div>
    )
  }
}

export default Paper
