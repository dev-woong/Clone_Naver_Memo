import { logDOM } from "@testing-library/react"
import React, { useState, useEffect } from "react"
import styles from "./paper.module.css"

const Paper = ({
  list,
  deleteList,
  deleteDbData,
  changeData,
  onFocus,
  cancleEvent,
  focusCount,
  focusCountPlus,
  focusCountMinus,
  setDataTobeDeleted,
}) => {
  const { id, content, date } = list
  const checkNoDate = (date) => {
    return date !== undefined
  }

  const [paperValue, setPaperValue] = useState(content)

  const [isChecked, setIsChecked] = useState(true)

  // paper 하나를 클릭했을때 다른 paper들 흐리게 css 효과
  const [stateOfFocus, setStateOfFocus] = useState("blur")

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

  const handleChange = (event) => {
    event.preventDefault()
    setPaperValue(event.target.value)
    changeData({ key: id, value: event.target.value })
  }

  const handleDelete = (event) => {
    event.preventDefault()
    deleteDbData(id)
    deleteList(id)
  }

  const handleClickTextarea = (event) => {
    event.preventDefault()
    onFocus(id)
    console.log(`id : ${id}`)
    console.log(`content : ${content}`)
    if (!checkNoDate(date)) {
      setPaperValue("")
    }
  }

  const handleClickCheckbox = () => {
    setIsChecked(!isChecked)

    if (isChecked) {
      setDataTobeDeleted((dataTobeDeleted) => dataTobeDeleted.concat(id))
    } else {
      setDataTobeDeleted((dataTobeDeleted) => {
        const idx = dataTobeDeleted.indexOf(id)
        return dataTobeDeleted.splice(idx, 1)
      })
    }
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
          <input
            className={styles.checkbox}
            type="checkbox"
            checked={!isChecked}
            onChange={handleClickCheckbox}
          ></input>
          <label className={styles.date}>{date}</label>
          <button className={styles.delete} onClick={handleDelete}>
            <i class="fas fa-times fa-2x"></i>
          </button>
        </div>
        <div className={styles.area}>
          <textarea
            className={`${styles.content} ${getStylesToFocus(stateOfFocus)}`}
            value={paperValue}
            onChange={handleChange}
            onClick={handleClickTextarea}
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
            onClick={handleClickTextarea}
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
