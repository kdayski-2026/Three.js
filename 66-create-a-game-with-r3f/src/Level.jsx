import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { CuboidCollider, CylinderCollider, RigidBody } from '@react-three/rapier';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

const floor1Material = new THREE.MeshStandardMaterial({ color: 'limegreen' });
const floor2Material = new THREE.MeshStandardMaterial({ color: 'greenyellow' });
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 'orangered' });
const wallMaterial = new THREE.MeshStandardMaterial({ color: 'slategrey' });

export function BlockStart({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={floor1Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
    </group>
  );
}

export function BlockEnd({ position = [0, 0, -16] }) {
  const hamburger = useGLTF('./hamburger.glb');
  hamburger.scene.children.forEach((mesh) => (mesh.castShadow = true));

  return (
    <group position={position}>
      <RigidBody type="fixed">
        <CuboidCollider args={[2, 0.1, 2]} />
        <mesh
          geometry={boxGeometry}
          material={floor1Material}
          position={[0, 0, 0]}
          scale={[4, 0.2, 4]}
          receiveShadow
        />
      </RigidBody>

      <RigidBody type="fixed" colliders={false} position={[0, 0.25, 0]}>
        <CylinderCollider args={[0.5, 1]} restitution={0.2} friction={0} position={[0, 0.5, 0]} />
        <primitive object={hamburger.scene} scale={0.2} />
      </RigidBody>
    </group>
  );
}

export function BlockSpinner({ position = [0, 0, -4] }) {
  const obstacle = useRef();
  const [speed] = useState(() => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1));

  useFrame((state) => {
    if (obstacle) {
      const elapsed = state.clock.getElapsedTime();
      const eulerRotation = new THREE.Euler(0, elapsed * speed, 0);
      const quaternionRotation = new THREE.Quaternion();
      quaternionRotation.setFromEuler(eulerRotation);
      obstacle.current.setNextKinematicRotation(quaternionRotation);
    }
  });

  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={floor2Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />

      <RigidBody ref={obstacle} type="kinematicPosition" colliders={false} position={[0, 0.3, 0]}>
        <CuboidCollider args={[1.75, 0.15, 0.15]} restitution={0.2} friction={0} />
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[3.5, 0.3, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

export function BlockLimbo({ position = [0, 0, -8] }) {
  const obstacle = useRef();
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const sinOffset = 1;
    const limboHeight = 0.3;
    const y = Math.sin(elapsed + timeOffset) + sinOffset + limboHeight / 2;
    obstacle.current.setNextKinematicTranslation({
      x: position[0],
      y: position[1] + y,
      z: position[2],
    });
  });

  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={floor2Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />

      <RigidBody ref={obstacle} type="kinematicPosition" colliders={false} position={[0, 0.3, 0]}>
        <CuboidCollider args={[2, 0.15, 0.15]} restitution={0.2} friction={0} />
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[4, 0.3, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

export function BlockAxe({ position = [0, 0, -12] }) {
  const obstacle = useRef();
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const x = Math.sin(elapsed + timeOffset) * 1.25;
    obstacle.current.setNextKinematicTranslation({
      x: position[0] + x,
      y: position[1] + 0.75,
      z: position[2],
    });
  });

  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={floor2Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />

      <RigidBody ref={obstacle} type="kinematicPosition" colliders={false} position={[0, 0.3, 0]}>
        <CuboidCollider args={[0.75, 0.75, 0.15]} restitution={0.2} friction={0} />
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[1.5, 1.5, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

function Bounds({ length = 1 }) {
  return (
    <group>
      <RigidBody type="fixed" restitution={0.2} friction={0}>
        <mesh
          geometry={boxGeometry}
          material={wallMaterial}
          receiveShadow
          position={[-2.15, 0.65, -(length * 2) + 2]}
          scale={[0.3, 1.7, length * 4]}
        />
        <mesh
          geometry={boxGeometry}
          material={wallMaterial}
          castShadow
          position={[2.15, 0.65, -(length * 2) + 2]}
          scale={[0.3, 1.7, length * 4]}
        />
        <mesh
          geometry={boxGeometry}
          material={wallMaterial}
          castShadow
          position={[0, 0.65, -(length * 4) + 1.85]}
          scale={[4.6, 1.7, 0.3]}
        />

        <CuboidCollider
          args={[2, 0.1, 2 * length]}
          position={[0, -0.1, -(length * 2) + 2]}
          restitution={0.2}
          friction={1}
        />
      </RigidBody>
    </group>
  );
}

export function Level({ count = 5, types = [BlockSpinner, BlockAxe, BlockLimbo] }) {
  const blocks = useMemo(() => {
    const blocks = [];

    for (let i = 0; i < count; i++) {
      const typeIndex = Math.floor(Math.random() * types.length);
      blocks.push(types[typeIndex]);
    }

    return blocks;
  }, [count, types]);

  return (
    <>
      <BlockStart position={[0, 0, 0]} />

      {blocks.map((Block, index) => (
        <Block key={index} position={[0, 0, -4 * (index + 1)]} />
      ))}

      <BlockEnd position={[0, 0, -4 * (count + 1)]} />

      <Bounds length={count + 2} />
    </>
  );
}

useGLTF.preload('./hamburger.glb');
