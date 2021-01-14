import React from 'react';
import 'milligram/dist/milligram.min.css';
import './App.sass';

const App = () => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
    }}>
      <div>
        <h1>matt cook</h1>
        <h5>developer, designer, creative</h5>
        <h6>currently working at <a href="https://aais.com">Ad Astra</a></h6>
        <a href="mailto:hello@mattcook.io">hello@mattcook.io</a>
      </div>
    </div>
  );
}

export default App;
