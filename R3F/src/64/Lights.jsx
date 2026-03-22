import { DirectionalLightHelper } from 'three';
import { Environment, useHelper } from '@react-three/drei';
import { useControls } from 'leva';
import { useRef } from 'react';

export default function Lights() {
  const directionalLightRef = useRef();
  const {
    background,
    environment,
    height,
    radius,
    scale,
    backgroundBlurriness,
    backgroundIntensity,
    backgroundRotation,
    environmentIntensity,
    environmentRotation,
    lightPosition,
    lightColor,
    lightIntensity,
    lightScale,
  } = useControls('Lights', {
    background: false,
    environment: {
      options: ['wooden_studio_11_1k', 'theater_01_1k', 'golden_bay_1k', 'potsdamer_platz_1k', 'fireplace_1k'],
    },
    lightColor: '#fce1be',
    lightPosition: {
      value: { x: -10, y: 10, z: 5 },
    },
    lightScale: {
      value: 2,
      min: 0,
      max: 10,
    },
    lightIntensity: {
      value: 9.9,
      min: 0,
      max: 10,
    },
    height: {
      value: 7,
      min: 0,
      max: 100,
    },
    radius: {
      value: 28,
      min: 10,
      max: 1000,
    },
    scale: {
      value: 100,
      min: 10,
      max: 1000,
    },
    backgroundBlurriness: {
      value: 0,
      min: 0,
      max: 1,
    },
    backgroundIntensity: {
      value: 1,
      min: 0,
      max: 5,
    },
    backgroundRotation: {
      value: 6.28,
      min: 0,
      max: Math.PI * 2,
    },
    environmentIntensity: {
      value: 1.25,
      min: 0,
      max: 5,
    },
  });
  // useHelper(directionalLightRef, DirectionalLightHelper, 1);

  return (
    <>
      <Environment
        files={`./portfolio/environment/${environment}.hdr`}
        background={background}
        // ground={{
        //   height,
        //   radius,
        //   scale,
        // }}
        backgroundBlurriness={backgroundBlurriness}
        backgroundIntensity={backgroundIntensity}
        backgroundRotation={[0, backgroundRotation, 0]}
        environmentIntensity={environmentIntensity}
        environmentRotation={[0, backgroundRotation, 0]}
      />
      <directionalLight
        ref={directionalLightRef}
        castShadow
        position={[lightPosition.x, lightPosition.y, lightPosition.z]}
        color={lightColor}
        intensity={lightIntensity}
        scale={lightScale}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={100}
        shadow-camera-top={20}
        shadow-camera-right={20}
        shadow-camera-bottom={-20}
        shadow-camera-left={-20}
        shadow-normalBias={0.04}
        shadow-bias={-0.0004}
      />
    </>
  );
}
