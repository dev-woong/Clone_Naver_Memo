import React, { useEffect, useState } from "react"
import Paper from "../Paper/Paper"
import Editor from "../Editor/Editor"
// import Loading from "../Loading/Loading"
import styles from "./Memo.module.css"
import dateFormat from "dateformat"
import Db from "../../service/db"

const List = ({ userInfo }) => {
  const db = new Db(userInfo.uid)

  const [list, setList] = useState({
    9999: { id: 9999, content: "간단한 메모는 여기에" },
  })

  // const [isLoading, setIsLoading] = useState(false)

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

  const getDbIntoList = (data) => {
    setList((list) => {
      const added = { ...list }
      added[data.id] = {}
      added[data.id].id = data.id
      added[data.id].content = data.content
      added[data.id].date = data.date
      return added
    })
  }

  const addList = (data) => {
    let lastId = 1
    db.getLastData(
      (doc) => {
        if (doc.exists) {
          lastId = doc.data().id
          lastId *= 1
          lastId += 1
        }
      },
      () => {
        setList((list) => {
          const added = { ...list }
          added[lastId] = {}
          added[lastId].id = lastId
          added[lastId].content = data.content
          added[lastId].date = dateFormat(new Date(), "yyyy. mm. dd HH:MM")
          return added
        })
      }
    )
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

  const addDbData = (data) => {
    let lastId = 1
    db.getLastData(
      (doc) => {
        if (doc.exists) {
          lastId = doc.data().id
          lastId *= 1
          lastId += 1
        }
      },
      () => {
        db.setData("lastId", { id: lastId })
        db.setData(lastId.toString(), {
          id: lastId,
          content: data.content,
          date: dateFormat(new Date(), "yyyy. mm. dd HH:MM"),
        })
      }
    )
  }

  const updateDbData = (data) => {
    db.setData(data.id.toString(), {
      id: data.id,
      content: data.content,
      date: dateFormat(new Date(), "yyyy. mm. dd HH:MM"),
    })
  }

  const deleteDbData = (id) => {
    db.deleteData(id.toString())
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
    if (userInfo.uid) {
      db.getAllData((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          doc.id === "lastId" || getDbIntoList(doc.data())
        })
      })
    }
  }, [userInfo])

  return (
    <section>
      <Editor
        list={list}
        paperNumber={selectedPaper}
        changedData={changedData}
        addList={addList}
        updateList={updateList}
        deleteList={deleteList}
        addDbData={addDbData}
        updateDbData={updateDbData}
        deleteDbData={deleteDbData}
        cancleEvent={cancleEvent}
        dataTobeDeleted={dataTobeDeleted}
        setDataTobeDeleted={setDataTobeDeleted}
      />
      <div>
        <ul className={styles.list}>
          {Object.keys(list)
            .reverse()
            .map((key) => {
              return (
                <Paper
                  key={key}
                  list={list[key]}
                  deleteList={deleteList}
                  deleteDbData={deleteDbData}
                  changeData={changeData}
                  onFocus={onFocus}
                  cancleEvent={cancleEventValue}
                  focusCount={focusCount}
                  focusCountPlus={focusCountPlus}
                  focusCountMinus={focusCountMinus}
                  setDataTobeDeleted={setDataTobeDeleted}
                />
              )
            })}
        </ul>
      </div>
    </section>
  )
}

export default List
