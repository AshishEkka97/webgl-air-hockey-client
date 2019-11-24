import React, { useContext, useEffect, useRef } from 'react';
import { Vector3 } from 'three';

import { useAnimationFrame } from '../../hooks/useAnimationFrame';
import { gameStates } from '../../constants';
import { GameContext } from '../GameContext';

import { camera, renderer, scene } from './renderer';
import { lightAmbient, lightHemisphere, lightPoint, lightSpotBlue, lightSpotRed } from './lights';
import { meshPaddle1, meshPaddle2, meshPuck, meshTable } from './meshes';

export function ThreeScene() {
  const { socket } = useContext(GameContext);
  const cameraRotation = useRef(0);
  const cameraSet = useRef(false);
  const container = useRef();
  const controlledPlayer = useRef();
  const gameState = useRef(gameStates.WELCOME);
  const assetPositions = useRef({
    puck: 0,
    paddle1: { x: 0, y: 0 },
    paddle2: { x: 0, y: 0 }
  });

  // Gameplay Animation
  function animationGameplay() {
    if (!cameraSet.current) {
      const cameraPositionZ = controlledPlayer.current === 'player1' ? 21 : -21;
      cameraSet.current = true;
      camera.position.set(0, 8, cameraPositionZ);
      camera.lookAt(new Vector3(0, -3, 0));
    }
    meshPuck.position.x = assetPositions.current.puck.x / 2;
    meshPuck.position.z = assetPositions.current.puck.y / 2;
    meshPaddle1.position.x = assetPositions.current.paddle1.x / 2;
    meshPaddle1.position.z = assetPositions.current.paddle1.y / 2;
    meshPaddle2.position.x = assetPositions.current.paddle2.x / 2;
    meshPaddle2.position.z = assetPositions.current.paddle2.y / 2;
  }

  // Idle Animation
  function animationIdle() {
    cameraRotation.current += 0.0025;
    camera.position.y = 10;
    camera.position.x = Math.sin(cameraRotation.current) * 20;
    camera.position.z = Math.cos(cameraRotation.current) * 20;
    camera.lookAt(new Vector3(0, -3, 0));
  }

  // Animation
  useAnimationFrame(() => {
    if (gameState.current === gameStates.STARTED) {
      animationGameplay();
    } else {
      animationIdle();
    }
    renderer.render(scene, camera);
  });

  // Scene
  useEffect(() => {
    function init() {
      container.current.appendChild(renderer.domElement);
      renderer.setSize(window.innerWidth, window.innerHeight);
      if (window.devicePixelRatio > 1) renderer.setPixelRatio(window.devicePixelRatio * 0.5);
      scene.add(
        lightAmbient,
        lightHemisphere,
        lightPoint,
        lightSpotBlue,
        lightSpotRed,
        meshPaddle1,
        meshPaddle2,
        meshPuck,
        meshTable
      );
    }
    init();
  }, []);

  // Socket Events
  useEffect(() => {
    function initSocketEvents() {
      socket.on('player-number-assigned', data => {
        controlledPlayer.current = data.controlledPlayer;
      });
      socket.on('game-started', () => {
        gameState.current = gameStates.STARTED;
      });
      socket.on('game-simulation-updated', data => {
        assetPositions.current = data.assetPositions;
      });
    }
    if (socket) {
      initSocketEvents();
    }
  }, [socket]);

  // Window Events
  useEffect(() => {
    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', () => handleResize());
    return window.removeEventListener('resize', () => handleResize());
  }, []);

  return <div ref={container} />;
}

export default ThreeScene;
