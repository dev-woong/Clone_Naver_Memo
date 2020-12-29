import React, { useCallback, useContext, useEffect, useState } from "react"
import Paper from "../paper/paper"
import Editor from "../editor/editor"
import styles from "./list.module.css"

const List = () => {
  const [list, setList] = useState({
    0: { content: "간단한 메모는 여기에" },
    1: { id: 1, content: "테스트", date: new Date().toLocaleString() },
    2: { id: 2, content: "안녕하세요", date: new Date().toLocaleString() },
  })

  const [selectedPaper, setSelectedPaper] = useState(0)

  const [cancleEventValue, setCancleEventValue] = useState(0)

  const [focusCount, setFocusCount] = useState(0)

  // const chooseMode = {
  //   read: "read",
  //   write: "write",
  //   update: "update",
  // }
  // const nowMode = chooseMode.read

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

  const addAndUpdateList = (data) => {
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

  useEffect(() => {
    console.log(focusCount)
  }, [focusCount])

  return (
    <section>
      <Editor
        list={list}
        paperNumber={selectedPaper}
        // mode={nowMode}
        changedData={changedData}
        saveList={addAndUpdateList}
        cancleEvent={cancleEvent}
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
            />
          )
        })}
      </ul>
    </section>
  )
}

export default List
