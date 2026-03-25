import * as THREE from 'three';
import { useControls } from 'leva';
import vertexShader from '../shaders/smoke/vertex.glsl?raw';
import fragmentShader from '../shaders/smoke/fragment.glsl?raw';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

export default function Smoke() {
  const smokeRef = useRef();
  const texture = useTexture('./portfolio/tea/perlin.png', (texture) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
  });

  const { rotation, position, scale, uColor, uRemapFrom, uRemapTo, uRotateYSpeed, uTwistPower } =
    useControls('Smoke', {
      rotation: {
        value: {
          x: 0,
          y: 5.1,
          z: -1.8,
        },
      },
      position: {
        value: {
          x: 0.05,
          y: 0.04,
          z: 0.18,
        },
      },
      scale: { value: 1.2, min: 0, max: 5 },
      uColor: '#beb7b6',
      uRemapFrom: {
        value: 0.45,
        min: 0,
        max: 5,
      },
      uRemapTo: {
        value: 1.6,
        min: 0,
        max: 5,
      },
      uRotateYSpeed: {
        value: 0.005,
        min: 0,
        max: 1,
      },
      uTwistPower: {
        value: 5,
        min: 0,
        max: 20,
      },
    });

  useFrame((_, delta) => {
    if (smokeRef.current) {
      smokeRef.current.uniforms.uTime.value += delta;
    }
  });

  return (
    <group rotation-z={Math.PI * 1.1} position={[0.02, 0.04, 0]}>
      <mesh
        rotation={[rotation.x, rotation.y, rotation.z]}
        position={[position.x, position.y, position.z]}
        scale={scale}
      >
        <circleGeometry args={[0.14, 32]} />
        <shaderMaterial
          wireframe={false}
          ref={smokeRef}
          transparent={true}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={{
            uTime: new THREE.Uniform(0),
            uColor: new THREE.Uniform(new THREE.Color(uColor)),
            uRemapFrom: new THREE.Uniform(uRemapFrom),
            uRemapTo: new THREE.Uniform(uRemapTo),
            uRotateYSpeed: new THREE.Uniform(uRotateYSpeed),
            uTwistPower: new THREE.Uniform(uTwistPower),
            uPerlinTexture: new THREE.Uniform(texture),
          }}
        />
      </mesh>
    </group>
  );
}
