import React from 'react';
import styles from './editor.module.css';

const Editor = ({ list, status }) => {
    // const { id, content, date } = list;

    return (
        <section className={styles.editor}>
            <button className={styles.save}>저장</button>
            <button className={styles.cancle}>취소</button>
            <button className={styles.delete}>삭제</button>
        </section>
    )

};

export default Editor;