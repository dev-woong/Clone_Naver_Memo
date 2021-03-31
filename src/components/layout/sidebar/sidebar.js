import React, { memo } from "react"
import styles from "./Sidebar.module.css"

const Sidebar = memo(({ onLogout }) => (
  <sidebar className={styles.sidebar}>
    <div className={styles.contents}>
      <span>
        <i class="far fa-sticky-note"></i>
        <h2>메모장</h2>
      </span>
    </div>
  </sidebar>
))

export default Sidebar
