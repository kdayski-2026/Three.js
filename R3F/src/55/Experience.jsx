import { extend, useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import CustomObject from './CustomObject';
import { useControls } from 'leva';

extend({ OrbitControls });

export default function Experience() {
  const cubeRef = useRef();
  const groupRef = useRef();
  const { camera, gl } = useThree();
  const { cameraRotate, objectsRotate } = useControls({
    cameraRotate: false,
    objectsRotate: false,
  });

  useFrame((state, delta) => {
    cubeRef.current.rotation.y += delta;

    if (cameraRotate) {
      const angle = state.clock.elapsedTime;
      camera.position.x = Math.sin(angle) * 8;
      camera.position.z = Math.cos(angle) * 8;
      camera.lookAt(0, 0, 0);
    }

    if (objectsRotate) {
      groupRef.current.rotation.y += delta;
    }
  });

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} enableDamping />

      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <group ref={groupRef}>
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color={'orange'} />
        </mesh>
        <mesh ref={cubeRef} position-x={2} scale={1.5} rotation-y={Math.PI * 0.25}>
          <boxGeometry />
          <meshStandardMaterial color={'mediumpurple'} />
        </mesh>
      </group>

      <mesh position-y={-1} scale={10} rotation-x={-Math.PI * 0.5}>
        <planeGeometry />
        <meshStandardMaterial color={'greenyellow'} />
      </mesh>

      <CustomObject />
    </>
  );
}
