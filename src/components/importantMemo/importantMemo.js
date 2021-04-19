import React, { useEffect, useState } from "react"
import styles from "./ImportantMemo.module.css"
import Db from "../../service/db"
import Paper from "../Paper/Paper"
import Editor from "../Editor/Editor"

const ImportantMemo = ({ userInfo }) => {
  const db = new Db(userInfo.uid)

  const [list, setList] = useState({})

  const [dataTobeDeleted, setDataTobeDeleted] = useState([])

  const getImportantMemoList = (data) => {
    console.log(data.important)
    setList((list) => {
      const added = { ...list }
      added[data.id] = {}
      added[data.id].id = data.id
      added[data.id].content = data.content
      added[data.id].date = data.date
      added[data.id].important = data.important
      return added
    })
  }

  const deleteList = (id) => {
    setList((list) => {
      const updated = { ...list }
      delete updated[id]
      return updated
    })
  }

  const deleteDbData = (id) => {
    db.deleteData(id.toString())
  }

  useEffect(() => {
    console.log("test")
    userInfo.uid &&
      db.getAllData((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          doc.id === "lastId" || (doc.data().important && getImportantMemoList(doc.data()))
        })
      })
  }, [userInfo])

  useEffect(() => {
    console.log("test")
  })

  return (
    <section>
      <Editor
        list={list}
        deleteList={deleteList}
        deleteDbData={deleteDbData}
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
                  setList={setList}
                  db={db}
                  deleteList={deleteList}
                  deleteDbData={deleteDbData}
                  setDataTobeDeleted={setDataTobeDeleted}
                  type="important"
                />
              )
            })}
        </ul>
      </div>
    </section>
  )
}

export default ImportantMemo
