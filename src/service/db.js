import firebaseApp from "./firebase"
import firebase from "firebase"

class Db {
  constructor(uid) {
    this.uid = uid
  }
  getAllData(callback) {
    firebase
      .firestore()
      .collection(this.uid)
      .get()
      .then(callback)
      .catch((error) => {
        console.log("Error getting documents: ", error)
      })
  }

  getLastData(callback, callback2) {
    firebase
      .firestore()
      .collection(this.uid)
      .doc("lastId")
      .get()
      .then(callback)
      .then(callback2)
      .catch((error) => {
        console.log("Error getting documents: ", error)
      })
  }

  setData(id, obj) {
    firebase
      .firestore()
      .collection(this.uid)
      .doc(id)
      .set(obj)
      .catch((error) => {
        console.error("Error adding document: ", error)
      })
  }

  deleteData(id) {
    firebase
      .firestore()
      .collection(this.uid)
      .doc(id)
      .delete()
      .catch((error) => {
        console.error("Error removing document: ", error)
      })
  }
}

export default Db
