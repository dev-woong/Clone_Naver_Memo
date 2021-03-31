import React, { useState, useEffect } from "react"
import styles from "./Loading.module.css"

const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}>
        <i class="fas fa-spinner fa-10x"></i>
      </div>
    </div>
  )
}

export default Loading
