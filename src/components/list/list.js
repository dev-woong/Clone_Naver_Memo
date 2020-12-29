import React, { useCallback, useContext, useEffect, useState } from "react"
import Paper from "../paper/paper"
import Editor from "../editor/editor"
import styles from "./list.module.css"

const List = () => {
  const [list, setList] = useState({
    0: { id: 0, content: "간단한 메모는 여기에" },
    1: { id: 1, content: "테스트", date: new Date().toLocaleString() },
    2: { id: 2, content: "안녕하세요", date: new Date().toLocaleString() },
  })

  const [selectedPaper, setSelectedPaper] = useState(0)

  const [cancleEventValue, setCancleEventValue] = useState(0)

  const [focusCount, setFocusCount] = useState(0)

  const [dataTobeDeleted, setDataTobeDeleted] = useState([])

  // paper의 변경 값이 담기는 임시 데이터
  const [changedData, setChangedData] = useState({
    key: 0,
    data: "",
  })

  const changeData = (obj) => {
    setChangedData({ id: obj.key, content: obj.value })
  }

  const cancleEvent = () => {
    setCancleEventValue((cancleEventValue) => cancleEventValue + 1)
  }

  const addList = (data) => {
    setList((list) => {
      const added = { ...list }
      const length = Object.keys(list).length
      added[length] = {}
      added[length].id = length
      added[length].content = data.content
      added[length].date = new Date().toLocaleString()
      return added
    })
  }

  const updateList = (data) => {
    setList((list) => {
      const updated = { ...list }
      updated[data.id].content = data.content
      return updated
    })
  }

  const deleteList = (id) => {
    setList((list) => {
      const updated = { ...list }
      delete updated[id]
      return updated
    })
  }

  const onFocus = (id) => {
    setSelectedPaper(id)
  }

  const focusCountPlus = () => {
    setFocusCount((focusCount) => focusCount + 1)
  }

  const focusCountMinus = () => {
    setFocusCount((focusCount) => focusCount - 1)
  }

  useEffect(() => {}, [])

  return (
    <section>
      <Editor
        list={list}
        paperNumber={selectedPaper}
        // mode={nowMode}
        changedData={changedData}
        addList={addList}
        updateList={updateList}
        cancleEvent={cancleEvent}
        dataTobeDeleted={dataTobeDeleted}
        setDataTobeDeleted={setDataTobeDeleted}
        deleteList={deleteList}
      />
      <ul className={styles.list}>
        {Object.keys(list).map((key) => {
          return (
            <Paper
              key={key}
              list={list[key]}
              deleteList={deleteList}
              changeData={changeData}
              onFocus={onFocus}
              cancleEvent={cancleEventValue}
              focusCount={focusCount}
              focusCountPlus={focusCountPlus}
              focusCountMinus={focusCountMinus}
              dataTobeDeleted={dataTobeDeleted}
              setDataTobeDeleted={setDataTobeDeleted}
            />
          )
        })}
      </ul>
    </section>
  )
}

export default List
