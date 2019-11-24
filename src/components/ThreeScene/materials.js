import { CubeTextureLoader, MeshStandardMaterial, TextureLoader } from 'three';

import accessoriesAlbedo from '../../assets/accessories-albedo.jpg';
import accessoriesNormal from '../../assets/accessories-normal.jpg';
import accessoriesRoughness from '../../assets/accessories-roughness.jpg';
import environmentNx from '../../assets/environment-nx.png';
import environmentNy from '../../assets/environment-ny.png';
import environmentNz from '../../assets/environment-nz.png';
import environmentPx from '../../assets/environment-px.png';
import environmentPy from '../../assets/environment-py.png';
import environmentPz from '../../assets/environment-pz.png';
import tableAlbedo from '../../assets/table-albedo.jpg';
import tableMetalness from '../../assets/table-metalness.jpg';
import tableNormal from '../../assets/table-normal.jpg';
import tableRoughness from '../../assets/table-roughness.jpg';

// Texture Loaders
const cubeTextureLoader = new CubeTextureLoader();
const textureLoader = new TextureLoader();

// Environment Texture
const textureEnvironment = cubeTextureLoader.load([
  environmentPx,
  environmentNx,
  environmentPy,
  environmentNy,
  environmentPz,
  environmentNz
]);

//Accessories Textures
const textureAccessoriesAlbedo = textureLoader.load(accessoriesAlbedo);
const textureAccessoriesRoughness = textureLoader.load(accessoriesRoughness);
const textureAccessoriesNormal = textureLoader.load(accessoriesNormal);

// Table Textures
const textureTableAlbedo = textureLoader.load(tableAlbedo);
textureTableAlbedo.anisotropy = 4;

const textureTableMetalness = textureLoader.load(tableMetalness);
textureTableMetalness.anisotropy = 4;

const textureTableNormal = textureLoader.load(tableNormal);
textureTableNormal.anisotropy = 4;

const textureTableRoughness = textureLoader.load(tableRoughness);
textureTableRoughness.anisotropy = 4;

// Accessories Material
export const materialAccessories = new MeshStandardMaterial({
  roughnessMap: textureAccessoriesRoughness,
  normalMap: textureAccessoriesNormal,
  envMap: textureEnvironment,
  map: textureAccessoriesAlbedo,
  roughness: 1.5,
  metalness: 0
});

// Table Material
export const materialTable = new MeshStandardMaterial({
  roughnessMap: textureTableRoughness,
  metalnessMap: textureTableMetalness,
  normalMap: textureTableNormal,
  envMap: textureEnvironment,
  map: textureTableAlbedo,
  roughness: 1,
  metalness: 1
});
