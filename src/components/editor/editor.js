import React, { useState, useEffect } from "react"
import styles from "./Editor.module.css"

const Editor = ({
  list,
  paperNumber,
  changedData,
  addList,
  updateList,
  deleteList,
  addDbData,
  updateDbData,
  deleteDbData,
  cancleEvent,
  dataTobeDeleted,
  setDataTobeDeleted,
}) => {
  const checkNoDate = (list) => {
    return list[paperNumber].date !== undefined
  }

  const [isSaveBtnAbled, setIsSaveBtnAbled] = useState(false)

  const isDeleteBtnAbled = dataTobeDeleted.length > 0

  const handleSave = (e) => {
    e.preventDefault()
    if (!checkNoDate(list)) {
      addList(changedData)
      addDbData(changedData)
      cancleEvent()
    } else {
      updateDbData(changedData)
      updateList(changedData)
    }
    setIsSaveBtnAbled(false)
  }

  const handleCancle = (e) => {
    e.preventDefault()
    cancleEvent()
  }

  const handleDelete = (e) => {
    e.preventDefault()
    dataTobeDeleted.forEach((id) => {
      deleteDbData(id)
      deleteList(id)
    })
    setDataTobeDeleted([])
  }

  useEffect(() => {
    if (changedData.content !== undefined && list[paperNumber].content !== changedData.content) {
      setIsSaveBtnAbled(true)
    }
  }, [changedData])

  return (
    <section className={styles.editor}>
      <button onClick={handleSave} className={styles.save} id="btnSave" disabled={!isSaveBtnAbled}>
        <i class="fas fa-check"></i> 저장
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
