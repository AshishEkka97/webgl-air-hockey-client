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
  const [movementX, setMovementX] = useState(false);
  const [movementY, setMovementY] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [controlledPlayer, setControlledPlayer] = useState(null);

  const [gameDetails, setGameDetails] = useState({
    player1: {
      name: '',
      ready: false,
      score: 0
    },
    player2: {
      name: '',
      ready: false,
      score: 0
    },
    winner: null
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
      socket.on('player-number-assigned', data => setControlledPlayer(data.controlledPlayer));
      socket.on('game-details-updated', data => setGameDetails(data.gameDetails));
      socket.on('game-full', () => setGameState(gameStates.READY_UP));
      socket.on('game-starting', () => setGameState(gameStates.STARTING));
      socket.on('game-starting-countdown', data => setCountdown(data.countdown));
      socket.on('game-started', () => setGameState(gameStates.STARTED));
      socket.on('game-goal', () => setGameState(gameStates.GOAL));
      socket.on('game-end', () => setGameState(gameStates.END));
    }
  }, [socket]);

  useEffect(() => {
    const handleMouseMove = event => {
      setMovementX(event.movementX);
      setMovementY(event.movementY);
    };

    if (gameState === gameStates.STARTED) {
      window.addEventListener('click', () => document.body.requestPointerLock());
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('click', () => document.body.requestPointerLock());
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [gameState]);

  const handleReadyUp = () => {
    socket.emit('player-ready');
    document.body.requestPointerLock();
  };

  const handleCreateGame = async () => {
    const result = await axios.get(`${process.env.REACT_APP_SERVER_URL}/create`);
    const { gameID } = result.data;
    setGameID(gameID);
    setGameState(gameStates.INVITE_PENDING);
  };

  return (
    <GameContext.Provider
      value={{
        controlledPlayer,
        countdown,
        gameDetails,
        gameID,
        gameState,
        handleCreateGame,
        handleReadyUp,
        movementX,
        movementY,
        socket
      }}>
      {children}
    </GameContext.Provider>
  );
}
