import React from 'react';
import logo from './logo.svg';
import './App.css';

import Header from './components/Header';
import Body from './components/Body';
import Modal from './components/modal';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Body></Body>
      <Modal/>
    </div>
  );
}

export default App;
