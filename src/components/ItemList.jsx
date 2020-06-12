// Itemlist.jsx
import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import InputForm from './InputForm';
// ↓↓↓ 追加 ↓↓↓
import Item from './Item';

const ItemList = props => {

  const [todoList, setTodoList] = useState(null);

  // firestoreから全データを取得してstateに格納する関数
  const getTodosFromFirestore = async () => {
    const itemListArray = await firebase.firestore().collection('todos')
      .orderBy('limit')
      .get();
    const todoArray = itemListArray.docs.map(x => {
      return {
        id: x.id,
        data: x.data(),
      }
    })
    setTodoList(todoArray);
    return todoArray;
  }

  // useEffectを利用してFirestoreからデータの一覧を取得．
  useEffect(() => {
    const result = getTodosFromFirestore();
  }, [props])

  return (
    <div>
         {/* ↓↓↓ 追加 ↓↓↓ */}
         <InputForm
        getTodosFromFirestore={getTodosFromFirestore}
      />

<ul>
        {
          todoList?.map((x, index) =>
            // ↓新しく作成した`Item.jsx`
            <Item
              key={index}
              todo={x}
              index={index}
              getTodosFromFirestore={getTodosFromFirestore}
            />
            // ↓直接記述したものは削除してOK．
            // <li key={index} id={x.id}>
            //   <input type="checkbox" value={x.id} />
            //   <button value={x.id}>delete</button>
            //   <p>締め切り：{x.data.limit.seconds}</p>
            //   <p>やること：{x.data.todo}</p>
            // </li>
          )
        }
      </ul>
    </div>
  );
}
export default ItemList;