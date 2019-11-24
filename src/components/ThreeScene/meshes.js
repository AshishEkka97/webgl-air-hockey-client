import { BufferGeometryLoader, Mesh } from 'three';

import tableJSON from '../../assets/mesh-table.json';
import paddleJSON from '../../assets/mesh-paddle.json';
import puckJSON from '../../assets/mesh-puck.json';

import { materialAccessories, materialTable } from './materials';

const geometryLoader = new BufferGeometryLoader();

// Table Mesh
export const meshTable = new Mesh(geometryLoader.parse(tableJSON), materialTable);
meshTable.castShadow = true;
meshTable.receiveShadow = true;

// Paddle 1 Mesh
export const meshPaddle1 = new Mesh(geometryLoader.parse(paddleJSON), materialAccessories);
meshPaddle1.castShadow = true;
meshPaddle1.receiveShadow = true;
meshPaddle1.position.z = -8;

// Paddle 2 Mesh
export const meshPaddle2 = new Mesh(geometryLoader.parse(paddleJSON), materialAccessories);
meshPaddle2.castShadow = true;
meshPaddle2.receiveShadow = true;
meshPaddle2.position.z = 8;

// Puck Mesh
export const meshPuck = new Mesh(geometryLoader.parse(puckJSON), materialAccessories);
meshPuck.castShadow = true;
meshPuck.receiveShadow = true;
