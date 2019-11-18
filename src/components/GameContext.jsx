import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { gameStates } from '../gameStates';
import { useInterval } from '../hooks/useInterval';

export const GameContext = createContext();

export function GameContextProvider({ children }) {
  const [gameState, setGameState] = useState(gameStates.WELCOME);
  const [gameID, setGameID] = useState(null);
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

  const handleCreateGame = async () => {
    const result = await axios.get(`${process.env.REACT_APP_SERVER_URL}/create-game`);
    const { gameID } = result.data;
    setGameID(gameID);
    setGameState(gameStates.INVITE_PENDING);
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
        assetPositions,
        gameID,
        gameState,
        handleCreateGame,
        handleReadyUp,
        movementX,
        movementY,
        playerNumber,
        socket
      }}>
      {children}
    </GameContext.Provider>
  );
}
