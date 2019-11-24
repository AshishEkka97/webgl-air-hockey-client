import React from 'react';
import { GameContextProvider } from './GameContext';
import { UserInterface } from './UserInterface';
import { ThreeScene } from './ThreeScene';

function App() {
  return (
    <GameContextProvider>
      <UserInterface />
      <ThreeScene />
    </GameContextProvider>
  );
}

export default App;
