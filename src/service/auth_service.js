import firebase from "firebase"
import firebaseApp from "./firebase"

class AuthService {
  login(providerName) {
    const authProvider = new firebase.auth[`${providerName}AuthProvider`]()
    providerName === "Github" && authProvider.addScope("repo")
    return firebase.auth().signInWithPopup(authProvider)
  }

  onAuthChange(onUserChanged) {
    firebase.auth().onAuthStateChanged((user) => {
      onUserChanged(user)
      return user
    })
  }

  onLogout() {
    firebase.auth().signOut()
  }
}

export default AuthService
