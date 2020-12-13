import React, { useState } from 'react';
import styles from './paper.module.css';

const Paper = ({ list, status, deleteList, changeData }) => {
    const { id, content, date } = list;

    const checkNoDate = (date) => {
        return date !== undefined
    }

    const [paperValue, setPaperValue] = useState(content);

    const handleChange = event => {
        event.preventDefault();
        setPaperValue(event.target.value)
        changeData({ key: id, value: event.target.value })
    }

    const handleDelete = event => {
        event.preventDefault();
        deleteList(id)
    }


    if (checkNoDate(date)) {
        return (
            <div className={styles.paper}>
                <div className={styles.head}>
                    <input className={styles.checkbox} type="checkbox"></input>
                    <label className={styles.date}>{date}</label>
                    <button className={styles.delete} onClick={handleDelete}>삭제</button>
                </div>
                <div className={styles.area}>
                    <textarea className={styles.content} value={paperValue} onChange={handleChange} rows="15" cols="28"></textarea>
                </div>
            </div>
        );
    } else {
        return (
            <div className={styles.paper}>
                <div className={styles.head}>
                </div>
                <div className={styles.area}>
                    <textarea className={styles.content} value={paperValue} onChange={handleChange} rows="15" cols="28"></textarea>
                </div>
            </div>
        );
    }

};

export default Paper;