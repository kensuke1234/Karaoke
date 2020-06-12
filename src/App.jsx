// App.jsx
import React from 'react';
import ItemList from './components/ItemList';


const App = () => {
  return (
    <div className="App">
        <h1 className="mt-4">カラオケメモ</h1>
        <ItemList />
    </div>
  );
}
export default App;