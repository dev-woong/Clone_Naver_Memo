import React, { useState, useEffect } from "react"
import styles from "./editor.module.css"

const Editor = ({
  list,
  paperNumber,
  changedData,
  addList,
  updateList,
  cancleEvent,
  dataTobeDeleted,
  setDataTobeDeleted,
  deleteList,
}) => {
  const { id, content, date } = list
  const checkNoDate = (date) => {
    return date !== undefined
  }

  const isSaveBtnAbled =
    changedData.content !== undefined && list[paperNumber].content !== changedData.content

  const isDeleteBtnAbled = dataTobeDeleted.length > 0

  const handleSave = (e) => {
    e.preventDefault()
    if (!checkNoDate(date)) {
      addList(changedData)
      cancleEvent()
    } else {
      updateList(changedData)
    }
  }

  const handleCancle = (e) => {
    e.preventDefault()
    cancleEvent()
  }

  const handleDelete = (e) => {
    e.preventDefault()
    dataTobeDeleted.forEach((id) => {
      deleteList(id)
    })
    setDataTobeDeleted([])
  }

  useEffect(() => {}, [])

  return (
    <section className={styles.editor}>
      <button onClick={handleSave} className={styles.save} disabled={!isSaveBtnAbled}>
        저장
      </button>
      <button onClick={handleCancle} className={styles.cancle}>
        취소
      </button>
      <button onClick={handleDelete} className={styles.delete} disabled={!isDeleteBtnAbled}>
        삭제
      </button>
    </section>
  )
}

export default Editor
