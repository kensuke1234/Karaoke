// InputForm.jsx
import React, { useState } from 'react';
import firebase from '../firebase';
import { Formik, Form, Field } from "formik";
import { withFormik} from "formik";
import Yup from 'yup'
import { TextField } from "@material-ui/core"
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, InputGroup, Input, Label, Button, FormGroup } from "reactstrap";
import { onLog } from 'firebase';

const InputForm = ({ getTodosFromFirestore }) => {
  const [title, setTitle] = useState('');
  const [todo, setTodo] = useState('');
  const [limit, setLimit] = useState('');

  // Firestoreにデータを送信する関数
  const postDataToFirestore = async (collectionName, postData) => {
    const addedData = await firebase.firestore().collection(collectionName).add(postData);
    return addedData;
  }

  // submitボタンクリック時の処理
  const submitData = async () => {
    if (todo === '' || limit === ''|| title === '') { return false };
    const postData = {
      title: title,
      todo: todo,
      limit: new Date(limit),
      isDone: false,
    }
    const addedData = await postDataToFirestore('todos', postData);
    setTitle('')
    setTodo('');
    setLimit('');
    getTodosFromFirestore();
  }

  return (
    <Formik>
      <ul>
      <ol>
      <FormGroup>
        <Label for="exampleEmail">歌った曲</Label>
        <Input 
        type="textarea" 
        name="text" 
        id="title" 
        placeholder="タイトル/バンド名" 
        onChange={e => setTitle(e.target.value)}
　　　　　/>
      </FormGroup>
      </ol>
        <ol>
        <FormGroup>
          <Label for="todo">コメント：</Label>
        <Input 
        type="textarea" 
        name="text" 
        id="todo" 
        onLog placeholder="感想コメント"
        value={todo}
        onChange={e => setTodo(e.target.value)}
        />
      </FormGroup>
        </ol>
        <ol>
          <label htmlFor="limit">日付：</label>
          <input
            type="datetime-local"
            id="limit"
            value={limit}
            onChange={e => setLimit(e.target.value)}
          />
        </ol>
        <ol>
          <Button
            type="button"
            color="primary"
            onClick={submitData}
          >メモする</Button>
        </ol>
      </ul>
    </Formik>
  )
}
export default InputForm;