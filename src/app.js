import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import styles from "./App.module.css"
import Login from "./components/layout/Login/Login"
import Main from "./components/layout/Main/Main"

function App({ authService }) {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login authService={authService} />
          </Route>
          <Route path="/main">
            <Main authService={authService} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
