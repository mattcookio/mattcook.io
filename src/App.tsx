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
        <h1>matt cook (<a href="mailto:hello@mattcook.io">hello@mattcook.io</a>)</h1>
        <h5>developer, designer, creative</h5>
        <h6>cto and co-founder at hively (site coming soon)</h6>
        <h6>former software engineer @ <a href="https://www.equipmentshare.com/">EquipmentShare</a>, <a href="https://rfp360.com">RFP360</a>, <a href="https://www.aais.com">Ad Astra</a></h6>
      </div>
    </div>
  );
}

export default App;
