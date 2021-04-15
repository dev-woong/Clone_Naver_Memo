import React, { useState, useEffect } from "react"
import styles from "./Paper.module.css"

const Paper = ({
  list,
  setList,
  db,
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
  const { id, content, date, important } = list
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
    focusCountPlus && focusCountPlus()
  }

  const handleBlur = (event) => {
    event.preventDefault()
    setStateOfFocus("blur")
    focusCountMinus && focusCountMinus()
  }

  const handleChange = (event) => {
    event.preventDefault()
    setPaperValue(event.target.value)
    changeData({ key: id, value: event.target.value, important })
  }

  const handleImportant = (event) => {
    event.preventDefault()
    setList((list) => {
      const updated = { ...list }
      updated[id].important = !updated[id].important
      return updated
    })
    db.setData(id.toString(), {
      id,
      content,
      date,
      important: !important,
    })
    list.important = !important
  }

  const handleDelete = (event) => {
    event.preventDefault()
    deleteDbData(id)
    deleteList(id)
  }

  const handleClickTextarea = (event) => {
    event.preventDefault()
    onFocus && onFocus(id)
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

  const textAreaProps = {
    className: `${styles.content} ${getStylesToFocus(stateOfFocus)}`,
    value: paperValue,
    onChange: handleChange,
    onClick: handleClickTextarea,
    onFocus: handleFocus,
    onBlur: handleBlur,
    rows: "15",
    cols: "30",
  }

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
          <button
            className={`${styles.important} ${important ? styles.true : styles.false}`}
            onClick={handleImportant}
          >
            <i class="fas fa-star fa-2x"></i>
          </button>
          <button className={styles.delete} onClick={handleDelete}>
            <i class="fas fa-times fa-2x"></i>
          </button>
        </div>
        <div className={styles.area}>
          <textarea {...textAreaProps} readOnly={!changeData} />
        </div>
      </div>
    )
  } else {
    return (
      <div className={`${styles.paper} ${getStylesToFocus(stateOfFocus)}`}>
        <div className={styles.head}></div>
        <div className={styles.area}>
          <textarea {...textAreaProps} />
        </div>
      </div>
    )
  }
}

export default Paper
