import React, { useCallback, useEffect, useState } from "react"
import Paper from "../paper/paper"
import styles from './list.module.css';

const List = () => {

  const [list, setList] = useState({
    0: { content: "간단한 메모는 여기에" },
    1: { id: 1, content: "테스트", date: new Date().toLocaleString() },
    2: { id: 2, content: "안녕하세요", date: new Date().toLocaleString() },
  })


  const addAndUpdateList = (data) => {
    setList((list) => {
      const updated = { ...list }
      updated[data.id] = data
      return updated
    })
  }

  const deleteList = (id) => {
    console.log('onDeleteList')
    setList((list) => {
      const updated = { ...list }
      console.log(updated[id])
      delete updated[id]
      return updated
    })
  }

  return (

    <section>
      <ul className={styles.list}>
        {Object.keys(list).map((key) => {
          return <Paper key={key} list={list[key]} deleteList={deleteList} />
        })}
      </ul>
    </section>
  )
}

export default List
