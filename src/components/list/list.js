import React, { useCallback, useContext, useEffect, useState } from "react"
import Paper from "../paper/paper"
import Editor from "../editor/editor"
import styles from "./list.module.css"
import dateFormat from "dateformat"

const List = () => {
  const [list, setList] = useState({
    9999: { id: 9999, content: "간단한 메모는 여기에" },
    1: { id: 1, content: "1, 테스트", date: dateFormat(new Date(), "yyyy. mm. dd hh:MM") },
    2: { id: 2, content: "2, 안녕하세요", date: dateFormat(new Date(), "yyyy. mm. dd hh:MM") },
    3: { id: 3, content: "3, 테스트", date: dateFormat(new Date(), "yyyy. mm. dd hh:MM") },
    4: { id: 4, content: "4, 안녕하세요", date: dateFormat(new Date(), "yyyy. mm. dd hh:MM") },
    5: { id: 5, content: "5, 테스트", date: dateFormat(new Date(), "yyyy. mm. dd hh:MM") },
    6: { id: 6, content: "6, 안녕하세요", date: dateFormat(new Date(), "yyyy. mm. dd hh:MM") },
    7: { id: 7, content: "7, 테스트", date: dateFormat(new Date(), "yyyy. mm. dd hh:MM") },
    8: { id: 8, content: "8, 안녕하세요", date: dateFormat(new Date(), "yyyy. mm. dd hh:MM") },
    9: { id: 9, content: "9, 테스트", date: dateFormat(new Date(), "yyyy. mm. dd hh:MM") },
    10: { id: 10, content: "10 안녕하세요", date: dateFormat(new Date(), "yyyy. mm. dd hh:MM") },
    11: { id: 11, content: "11 테스트", date: dateFormat(new Date(), "yyyy. mm. dd hh:MM") },
    12: { id: 12, content: "12 안녕하세요", date: dateFormat(new Date(), "yyyy. mm. dd hh:MM") },
    13: { id: 13, content: "13 테스트", date: dateFormat(new Date(), "yyyy. mm. dd hh:MM") },
    14: { id: 14, content: "14 안녕하세요", date: dateFormat(new Date(), "yyyy. mm. dd hh:MM") },
    15: { id: 15, content: "15 테스트", date: dateFormat(new Date(), "yyyy. mm. dd hh:MM") },
    16: { id: 16, content: "16 안녕하세요", date: dateFormat(new Date(), "yyyy. mm. dd hh:MM") },
    17: { id: 17, content: "17 테스트", date: dateFormat(new Date(), "yyyy. mm. dd hh:MM") },
    18: { id: 18, content: "18 안녕하세요", date: dateFormat(new Date(), "yyyy. mm. dd hh:MM") },
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
      added[length].date = dateFormat(new Date(), "yyyy. mm. dd hh:MM")
      console.log(added[length].date)
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
        changedData={changedData}
        addList={addList}
        updateList={updateList}
        cancleEvent={cancleEvent}
        dataTobeDeleted={dataTobeDeleted}
        setDataTobeDeleted={setDataTobeDeleted}
        deleteList={deleteList}
      />
      <ul className={styles.list}>
        {Object.keys(list)
          .reverse()
          .map((key) => {
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
