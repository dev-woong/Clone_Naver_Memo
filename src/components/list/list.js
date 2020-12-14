import React, { useCallback, useContext, useEffect, useState } from "react"
import Paper from "../paper/paper"
import Editor from '../editor/editor';
import styles from './list.module.css';

const List = () => {

  const [list, setList] = useState({
    0: { content: "간단한 메모는 여기에" },
    1: { id: 1, content: "테스트", date: new Date().toLocaleString() },
    2: { id: 2, content: "안녕하세요", date: new Date().toLocaleString() },
  })

  const chooseMode = {
    read: 'read',
    write: 'write',
    update: 'update'
  }
  const nowMode = chooseMode.read;

  // paper의 변경 값이 담기는 임시 데이터 
  const [changedData, setChangedData] = useState({
    key: 0,
    data: ''
  })

  const objData = { changedData, setChangedData }

  const fnChangeData = (obj) => {
    setChangedData({ id: obj.key, content: obj.value })
  }

  const fnCancleData = (data) => {
    console.log('onCancle')
    console.log(data);
    setList(data)
  }

  const fnAddAndUpdateList = (data) => {
    setList((list) => {
      const updated = { ...list }
      updated[data.id].content = data.content
      return updated
    })
  }

  const fnDeleteList = (id) => {
    setList((list) => {
      const updated = { ...list }
      delete updated[id]
      return updated
    })
  }

  useEffect(() => {

  })
  return (

    <section>
      <Editor list={list} mode={nowMode} changedData={changedData} fnSaveList={fnAddAndUpdateList} fnCancleData={fnCancleData} />
      <ul className={styles.list}>
        {Object.keys(list).map((key) => {
          return <Paper key={key} list={list[key]} fnDeleteList={fnDeleteList} fnChangeData={fnChangeData} />
        })}
      </ul>
    </section>
  )
}

export default List
