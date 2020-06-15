// InputForm.jsx
import React, { useState } from 'react';
import firebase from '../firebase';
import { Formik, Form, Field } from "formik";
import { withFormik} from "formik";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, InputGroup, Input, Label, Button, FormGroup } from "reactstrap";

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
        <Label for="exampleEmail">タスク</Label>
        <Input 
        type="textarea" 
        name="text" 
        id="title" 
        rows="1"
        placeholder="タスク" 
        onChange={e => setTitle(e.target.value)}
　　　　　/>
      </FormGroup>
      </ol>
        <ol>
        <FormGroup>
          <Label for="todo">概要：</Label>
        <Input 
        type="textarea" 
        name="text" 
        id="todo"
        rows="10"
        onLog placeholder="どのような作業内容なのか"
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