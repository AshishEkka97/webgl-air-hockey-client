import React from 'react';
import { GameContextProvider } from './GameContext';
import { GlobalStyles } from './GlobalStyles';
import { ThreeScene } from './ThreeScene';
import { UserInterface } from './UserInterface';

function App() {
  return (
    <GameContextProvider>
      <GlobalStyles />
      <UserInterface />
      <ThreeScene />
    </GameContextProvider>
  );
}

export default App;
