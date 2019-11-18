import React, { createContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { gameStates } from '../gameStates';
import { useInterval } from '../hooks/useInterval';

export const GameContext = createContext();

export function GameContextProvider({ children }) {
  const [gameState, setGameState] = useState(gameStates.WELCOME);
  const [gameID, setGameID] = useState(null);
  const [gameURL, setGameURL] = useState(null);
  const [socket, setSocket] = useState(null);
  const [playerNumber, setPlayerNumber] = useState(null);
  const [movementX, setMovementX] = useState(false);
  const [movementY, setMovementY] = useState(false);
  const [assetPositions, setAssetPositions] = useState({
    puck: 0,
    paddle1: { x: 0, y: 0 },
    paddle2: { x: 0, y: 0 }
  });

  useInterval(() => {
    if (gameState === gameStates.STARTED) {
      if (movementX === false && movementY === false) {
        socket.emit('player-moved', { x: 0, y: 0 });
      } else {
        socket.emit('player-moved', {
          x: movementX,
          y: movementY
        });
        setMovementX(false);
        setMovementY(false);
      }
    }
  }, 0);

  useEffect(() => {
    const urlGameID = window.location.pathname.split('/')[1];
    if (urlGameID) {
      setGameID(urlGameID);
    }
  }, []);

  useEffect(() => {
    if (gameID) {
      setSocket(io(`${process.env.REACT_APP_SERVER_URL}/${gameID}`, { transports: ['websocket'] }));
    }
  }, [gameID]);

  useEffect(() => {
    if (socket) {
      socket.on('player-number-assigned', data => setPlayerNumber(data));
      socket.on('status-updated', data =>
        data === 'ready' ? setGameState(gameStates.READY_UP) : handleStart()
      );
      socket.on('simulation-updated', data => updateMovement(data));
    }
  }, [socket]);

  const handleReadyUp = () => {
    socket.emit('player-ready');
    setGameState(gameStates.READY);
    document.body.requestPointerLock();
  };

  const handleCreateGame = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/create-game`)
      .then(res => res.json())
      .then(({ gameID }) => {
        setGameState(gameStates.INVITE_PENDING);
        setGameURL(`${process.env.REACT_APP_CLIENT_URL}/${gameID}`);
        setGameID(gameID);
      });
  };

  const handleStart = () => {
    setGameState(gameStates.STARTED);
    window.addEventListener('click', () => document.body.requestPointerLock());
    window.addEventListener('mousemove', e => {
      setMovementX(e.movementX);
      setMovementY(e.movementY);
    });
  };

  const updateMovement = data => {
    setAssetPositions(data);
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        gameID,
        gameURL,
        socket,
        playerNumber,
        movementX,
        movementY,
        assetPositions,
        handleReadyUp,
        handleCreateGame
      }}>
      {children}
    </GameContext.Provider>
  );
}
