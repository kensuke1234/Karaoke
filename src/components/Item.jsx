// Item.jsx
import React from 'react';
// ↓追加
import firebase from '../firebase';
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, InputGroup, Input, InputGroupAddon, Button } from "reactstrap";


const Item = ({ index, todo, getTodosFromFirestore }) => {
  // timestamp形式のデータをいい感じの形式に変換する関数
  const convertFromTimestampToDatetime = timestamp => {
    const _d = timestamp ? new Date(timestamp * 1000) : new Date();
    const Y = _d.getFullYear();
    const m = (_d.getMonth() + 1).toString().padStart(2, '0');
    const d = _d.getDate().toString().padStart(2, '0');
    const H = _d.getHours().toString().padStart(2, '0');
    const i = _d.getMinutes().toString().padStart(2, '0');
    const s = _d.getSeconds().toString().padStart(2, '0');
    return `${Y}/${m}/${d} ${H}:${i}:${s}`;
  }

  // ↓追加 ドキュメントIDを指定してFirestoreのデータを更新する関数
  const updateDataOnFirestore = async (collectionName, documentId, isDone) => {
    const updatedData = await firebase.firestore()
      .collection(collectionName)
      .doc(documentId)
      .update({
        isDone: isDone ? false : true,
      });
    getTodosFromFirestore();
    return
  }

    // ↓追加 ドキュメントIDを指定してFirestoreのデータを削除する関数
    const deleteDataOnFirestore = async (collectionName, documentId) => {
      const removedData = await firebase.firestore()
        .collection(collectionName)
        .doc(documentId)
        .delete();
      getTodosFromFirestore();
      return
    }

    return (
      <ol key={index} id={todo.id}>
  
        <Button
          value={todo.id}
          color="primary"
          onClick={e => deleteDataOnFirestore('todos', todo.id)}
        >delete</Button>
        <p>タスク:{todo.data.title}</p>
        <p>概要：{todo.data.todo}</p>
        
        <p>デッドライン：{convertFromTimestampToDatetime(todo.data.limit.seconds)}</p>
        
      </ol>
  )
}
export default Item;