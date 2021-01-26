import React, { useCallback, useContext, useEffect, useState } from "react"
import Paper from "../paper/paper"
import Editor from "../editor/editor"
import Loading from "../loading/loading"
import styles from "./list.module.css"
import dateFormat from "dateformat"
import db from "../../service/db"

const List = ({ authService }) => {
  const [list, setList] = useState({
    9999: { id: 9999, content: "간단한 메모는 여기에" },
  })

  const [isLoading, setIsLoading] = useState(true)

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
    const uid = authService.getUserInfo().uid

    const lastIdDoc = db.collection(uid).doc("lastId")
    let lastId = 1

    lastIdDoc
      .get()
      .then((doc) => {
        if (doc.exists) {
          lastId = doc.data().id
          lastId *= 1
          lastId += 1
        }
      })
      .then(() => {
        setList((list) => {
          const added = { ...list }
          // const length = Object.keys(list).length
          added[lastId] = {}
          added[lastId].id = lastId
          added[lastId].content = data.content
          added[lastId].date = dateFormat(new Date(), "yyyy. mm. dd HH:MM")
          return added
        })
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

  const addDbData = (data) => {
    const uid = authService.getUserInfo().uid

    const lastIdDoc = db.collection(uid).doc("lastId")
    let lastId = 1

    lastIdDoc
      .get()
      .then((doc) => {
        if (doc.exists) {
          lastId = doc.data().id
          lastId *= 1
          lastId += 1
        } else {
          // console.log("No such document!")
          // lastId = 1
        }
      })
      .then(() => {
        db.collection(uid).doc("lastId").set({ id: lastId })

        db.collection(uid)
          .doc(lastId.toString())
          .set({
            id: lastId,
            content: data.content,
            date: dateFormat(new Date(), "yyyy. mm. dd HH:MM"),
          })
          .catch((error) => {
            console.error("Error adding document: ", error)
          })
      })
      .catch((error) => {
        console.log("Error getting document:", error)
      })
  }

  const updateDbData = (data) => {
    db.collection(authService.getUserInfo().uid)
      .doc(data.id.toString())
      .set({
        id: data.id,
        content: data.content,
        date: dateFormat(new Date(), "yyyy. mm. dd HH:MM"),
      })
      .catch((error) => {
        console.error("Error adding document: ", error)
      })
  }

  const deleteDbData = (id) => {
    db.collection(authService.getUserInfo().uid)
      .doc(id.toString())
      .delete()
      .then(() => {
        console.log("Document successfully deleted!")
      })
      .catch((error) => {
        console.error("Error removing document: ", error)
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
    console.log("useEffect")
    setTimeout(() => {
      db.collection(authService.getUserInfo().uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach(function (doc) {
            if (doc.id !== "lastId") {
              getDbIntoList(doc.data())
            }
          })
        })
        .catch((error) => {
          console.log("Error getting documents: ", error)
        })
      setIsLoading(false)
    }, 2000)
  }, [])

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
      {isLoading ? (
        <Loading />
      ) : (
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
      )}
    </section>
  )
}

export default List
