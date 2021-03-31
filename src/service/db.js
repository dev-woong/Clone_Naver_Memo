import firebaseApp from "./firebase"
import firebase from "firebase"

class Db {
  getAllData(uid, callback) {
    firebase
      .firestore()
      .collection(uid)
      .get()
      .then(callback)
      .catch((error) => {
        console.log("Error getting documents: ", error)
      })
  }

  getLastData(uid, callback, callback2) {
    firebase
      .firestore()
      .collection(uid)
      .doc("lastId")
      .get()
      .then(callback)
      .then(callback2)
      .catch((error) => {
        console.log("Error getting documents: ", error)
      })
  }

  setData(uid, id, obj) {
    firebase
      .firestore()
      .collection(uid)
      .doc(id)
      .set(obj)
      .catch((error) => {
        console.error("Error adding document: ", error)
      })
  }

  deleteData(uid, id) {
    firebase
      .firestore()
      .collection(uid)
      .doc(id)
      .delete()
      .catch((error) => {
        console.error("Error removing document: ", error)
      })
  }
}

export default Db
