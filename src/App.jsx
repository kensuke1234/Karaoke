// App.jsx
import React from 'react';
import Form from './Form';
import ItemList from './components/ItemList';


const App = () => {
  return (
    <div className="siimple-box siimple--bg-dark">
    <h1 className="siimple-box-title siimple--color-white">プロジェクトプラン</h1>
        <ItemList />
    </div>
  );
}
export default App;