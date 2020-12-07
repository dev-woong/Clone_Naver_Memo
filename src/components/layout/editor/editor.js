import React from 'react';
import styles from './editor.module.css';

const Editor = ({ list }) => {
    // const { id, content, date } = list;

    return (
        <section className={styles.editor}>
            <button className={styles.delete}>삭제</button>
        </section>
    )

};

export default Editor;