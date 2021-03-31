import firebase from "firebase"
import firebaseApp from "./firebase"

class AuthService {
  login(providerName) {
    const authProvider = new firebase.auth[`${providerName}AuthProvider`]()
    return firebase.auth().signInWithPopup(authProvider)
  }

  onAuthChange(onUserChanged) {
    firebase.auth().onAuthStateChanged((user) => {
      onUserChanged(user)
      console.log("onUserChanged")
      console.log(user)
      return user
    })
  }

  onLogout() {
    firebase.auth().signOut()
  }
}

export default AuthService
