import React from 'react';
import styles from './editor.module.css';

const Editor = ({ list, mode, objData, saveList }) => {
    const { changedData, setChangedData, originData, setOriginData } = objData

    const handleSave = e => {
        e.preventDefault();
        console.log(changedData);
        saveList(changedData)
    }

    const handleCancle = e => {
        e.preventDefault();

    }

    return (
        <section className={styles.editor}>
            <button onClick={handleSave} className={styles.save}>저장</button>
            <button onCancle={handleCancle} className={styles.cancle}>취소</button>
            <button className={styles.delete}>삭제</button>
        </section>
    )

};

export default Editor;