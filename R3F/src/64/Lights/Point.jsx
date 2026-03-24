import { Color, MeshBasicMaterial, PointLightHelper } from 'three';
import { useGLTF, useHelper } from '@react-three/drei';
import { folder, useControls } from 'leva';
import { useEffect, useRef } from 'react';

export default function Point() {
  const pointLightRef = useRef();
  const lamp = useGLTF('./portfolio/lights/uploads_files_3727623_Lamp.glb');
  const { position, color, intensity, power, distance, decay } = useControls('Lights', {
    Point: folder({
      color: '#fce1be',
      position: {
        value: { x: -5, y: 4.2, z: -1 },
      },
      intensity: {
        value: 20,
        min: 0,
        max: 200,
      },
      power: {
        value: 1000,
        min: 0,
        max: 2000,
      },
      distance: {
        value: 20,
        min: 0,
        max: 100,
      },
      decay: {
        value: 2,
        min: 0,
        max: 10,
        hint: 'Realistic value is 2',
      },
    }),
  });
  useHelper(pointLightRef, PointLightHelper, 1);

  useEffect(() => {
    lamp.scene.traverse((child) => {
      if (child.name === 'Lamphead') {
        child.material = new MeshBasicMaterial({
          color: new Color(color).lerp(new Color(0, 0, 0), 0.6),
        });
      }
      if (child.name === 'Lightbulb') {
        child.material = new MeshBasicMaterial({ color });
      }
    });
  }, []);

  return (
    <>
      <pointLight
        ref={pointLightRef}
        position={[position.x, position.y, position.z]}
        color={color}
        intensity={intensity}
        power={power}
        distance={distance}
        decay={decay}
        castShadow
        shadow-mapSize={[512, 512]}
        shadow-camera-near={1}
        shadow-camera-far={100}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
        shadow-normalBias={0.007}
      />
      <primitive
        scale={5}
        object={lamp.scene}
        position={[position.x, position.y - 7, position.z]}
        rotation-y={Math.PI * 0.2}
      />
    </>
  );
}

useGLTF.preload('./portfolio/lights/uploads_files_3727623_Lamp.glb');
