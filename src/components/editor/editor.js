import React, { useState } from "react"
import styles from "./editor.module.css"

const Editor = ({ list, paperNumber, changedData, saveList, cancleEvent }) => {
  // const Editor = ({ list, mode, changedData, saveList, cancleData }) => {

  const isSaveBtnAbled =
    changedData.content !== undefined && list[paperNumber].content !== changedData.content

  const handleSave = (e) => {
    e.preventDefault()
    saveList(changedData)
    console.log(changedData)
  }

  const handleCancle = (e) => {
    e.preventDefault()
    cancleEvent()
  }

  return (
    <section className={styles.editor}>
      <button onClick={handleSave} className={styles.save} disabled={!isSaveBtnAbled}>
        저장
      </button>
      <button onClick={handleCancle} className={styles.cancle}>
        취소
      </button>
      <button className={styles.delete} disabled={true}>
        삭제
      </button>
    </section>
  )
}

export default Editor
