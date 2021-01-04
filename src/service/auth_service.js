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
    })
  }

  onLogout() {
    firebase.auth().signOut()
  }

  getUserInfo() {
    const firebaseUser = firebase.auth().currentUser
    const user = {
      name: firebaseUser.displayName,
      email: firebaseUser.email,
      photoUrl: firebaseUser.photoURL,
      emailVerified: firebaseUser.emailVerified,
      uid: firebaseUser.uid,
    }
    return user
  }
}

export default AuthService
