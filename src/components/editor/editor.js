import React, { useState } from 'react';
import styles from './editor.module.css';

const Editor = ({ list, mode, changedData, fnSaveList, fnCancleData }) => {

    const [originData, setOriginData] = useState(list)

    const handleSave = e => {
        e.preventDefault();
        fnSaveList(changedData);
        (function (changedData) {
            setOriginData((originData) => {
                const updated = { ...originData }
                updated[changedData.id] = changedData
                return updated
            })
        })(changedData)
    }

    const handleCancle = e => {
        e.preventDefault();
        fnCancleData(originData);

    }

    return (
        <section className={styles.editor}>
            <button onClick={handleSave} className={styles.save}>저장</button>
            <button onClick={handleCancle} className={styles.cancle}>취소</button>
            <button className={styles.delete}>삭제</button>
        </section>
    )

};

export default Editor;