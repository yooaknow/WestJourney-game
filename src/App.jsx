import React from 'react';
import ScoreBoard from './components/ScoreBoard';
import background from './assets/게임배경.png';
import './style.css';

const App = () => {
  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <ScoreBoard />
    </div>
  );
};

export default App;
