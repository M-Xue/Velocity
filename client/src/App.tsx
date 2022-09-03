import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Tasks from './pages/tasks/Tasks';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Tasks/>
    </div>
  );
}

export default App;
