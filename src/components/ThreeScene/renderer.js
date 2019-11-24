import { Color, Fog, PerspectiveCamera, PCFSoftShadowMap, Scene, WebGLRenderer } from 'three';

// Camera
export const camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

// Renderer
export const renderer = new WebGLRenderer({ alpha: true, antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap;

// Scene
export const scene = new Scene();
scene.fog = new Fog(new Color(0x0e111b), 0.5, 55);
