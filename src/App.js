import React from 'react';
import Nav from './components/Nav/Nav'
import routes from './routes'
import './App.css';

function App() {
  return (
    <div className="app">
      <Nav />
      {routes}
    </div>
  );
}

export default App;
