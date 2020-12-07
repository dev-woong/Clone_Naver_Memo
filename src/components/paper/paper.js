import React from 'react';
import styles from './paper.module.css';

const Paper = ({ list, deleteList }) => {
    const { id, content, date } = list;

    const checkNoDate = (date) => {
        return date !== undefined
    }

    const handleDelete = event => {
        console.log(event)
        event.preventDefault();
        deleteList(id)
    }



    if (checkNoDate(date)) {
        return (
            <div className={styles.paper}>
                <div className={styles.head}>
                    <input className={styles.checkbox} type="checkbox"></input>
                    <label className={styles.date}>{date}</label>
                    {/* <button className={styles.delete} >삭제</button> */}
                    <button className={styles.delete} onClick={handleDelete}>삭제</button>
                </div>
                <div className={styles.area}>
                    <textarea className={styles.content} value={content}></textarea>
                </div>
            </div>
        );
    } else {
        return (
            <div className={styles.paper}>
                <div className={styles.head}>
                </div>
                <div className={styles.area}>
                    <textarea className={styles.content} value={content}></textarea>
                </div>
            </div>
        );
    }

};

export default Paper;