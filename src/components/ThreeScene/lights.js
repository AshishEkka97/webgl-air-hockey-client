import { AmbientLight, SpotLight, HemisphereLight, PointLight } from 'three';

// Ambient Light
export const lightAmbient = new AmbientLight(0xffb783, 0.2);
lightAmbient.position.set(0, 0, 0);

// Hemisphere Light
export const lightHemisphere = new HemisphereLight(0xffffff, 0x777788, 0.3);
lightHemisphere.position.set(0.5, 1, 0.75);

//Point Light
export const lightPoint = new PointLight(0xffffff, 0.6);
lightPoint.position.set(0, 3.75, 0);
lightPoint.castShadow = true;
lightPoint.shadow.mapSize.width = 1024;
lightPoint.shadow.mapSize.height = 1024;
lightPoint.shadow.camera.near = 0.5;
lightPoint.shadow.camera.far = 100;

// Spot Light Red
export const lightSpotRed = new SpotLight(0xbd5467, 0.2);
lightSpotRed.position.set(20, 20, 20);
lightSpotRed.castShadow = true;
lightSpotRed.shadow.mapSize.width = 1024;
lightSpotRed.shadow.mapSize.height = 1024;
lightSpotRed.shadow.camera.near = 0.5;
lightSpotRed.shadow.camera.far = 100;

// Spot Light Blue
export const lightSpotBlue = new SpotLight(0x3c7fff, 0.2);
lightSpotBlue.position.set(-20, 20, -20);
lightSpotBlue.castShadow = true;
lightSpotBlue.shadow.mapSize.width = 1024;
lightSpotBlue.shadow.mapSize.height = 1024;
lightSpotBlue.shadow.camera.near = 0.5;
lightSpotBlue.shadow.camera.far = 100;
