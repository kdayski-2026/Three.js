import {
  shaderMaterial,
  Sparkles,
  Center,
  OrbitControls,
  useGLTF,
  useTexture,
} from '@react-three/drei';
import { extend } from '@react-three/fiber';
import * as THREE from 'three';
import vertexShader from './shaders/portal/vertex.glsl';
import fragmentShader from './shaders/portal/fragment.glsl';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

const material = new THREE.MeshBasicMaterial({ color: '#fffdfa' });
const PortalMaterial = shaderMaterial(
  {
    uColorStart: new THREE.Color('#061319'),
    uColorEnd: new THREE.Color('#86fefe'),
    uTime: 0,
  },
  vertexShader,
  fragmentShader,
);

extend({ PortalMaterial });

export default function Experience() {
  const portalRef = useRef();
  const { nodes } = useGLTF('./model/portal.glb');
  const bakedTexture = useTexture('./model/baked.jpg');
  bakedTexture.flipY = false;

  useFrame((_, delta) => {
    portalRef.current.uTime += delta;
  });

  return (
    <>
      <color args={['#061319']} attach={'background'} />

      <OrbitControls makeDefault />

      <Center>
        <mesh
          geometry={nodes.baked.geometry}
          position={nodes.baked.position}
          rotation={nodes.baked.rotation}
          scale={nodes.baked.scale}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>

        <mesh
          geometry={nodes.poleLightA.geometry}
          position={nodes.poleLightA.position}
          rotation={nodes.poleLightA.rotation}
          scale={nodes.poleLightA.scale}
          material={material}
        />

        <mesh
          geometry={nodes.poleLightB.geometry}
          position={nodes.poleLightB.position}
          rotation={nodes.poleLightB.rotation}
          scale={nodes.poleLightB.scale}
          material={material}
        />

        <mesh
          geometry={nodes.portalLight.geometry}
          position={nodes.portalLight.position}
          rotation={nodes.portalLight.rotation}
          scale={nodes.portalLight.scale}
        >
          <portalMaterial ref={portalRef} />
        </mesh>

        <Sparkles size={6} scale={[4, 2, 4]} position-y={1} speed={0.2} count={40} />
      </Center>
    </>
  );
}

useGLTF.preload('./model/portal.glb');
