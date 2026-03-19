import { OrbitControls, useGLTF } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import {
  CylinderCollider,
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  InstancedRigidBodies,
} from '@react-three/rapier';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Experience() {
  const [hitSound] = useState(() => new Audio('./hit.mp3'));
  const hamburger = useGLTF('./hamburger.glb');
  const cube = useRef();
  const twister = useRef();

  const cubeJump = (e) => {
    e.stopPropagation();
    const mass = cube.current.mass();
    cube.current.applyImpulse({ x: 0, y: 5 * mass, z: 0 });
    cube.current.applyTorqueImpulse({ x: Math.random() - 0.5, y: Math.random() - 0.5, z: Math.random() - 0.5 });
  };

  const collisionEnter = () => {
    // hitSound.currentTime = 0;
    // hitSound.volume = Math.random();
    // hitSound.play();
  };

  useFrame((state) => {
    if (twister.current) {
      const time = state.clock.getElapsedTime();

      const eulerRotation = new THREE.Euler(0, time * 3, 0);
      const quaternionRotation = new THREE.Quaternion();
      quaternionRotation.setFromEuler(eulerRotation);

      twister.current.setNextKinematicRotation(quaternionRotation);

      const angle = time * 0.5;
      const x = Math.cos(angle) * 2;
      const z = Math.sin(angle) * 2;
      twister.current.setNextKinematicTranslation({ x, y: -0.8, z });
    }
  });

  const cubeCount = 300;
  const instances = useMemo(() => {
    const instances = [];

    for (let i = 0; i < cubeCount; i++) {
      instances.push({
        key: `instance_${i}`,
        position: [(Math.random() - 0.5) * 8, 6 * i * 0.5, (Math.random() - 0.5) * 8],
        rotation: [0, 0, 0],
      });
    }

    return instances;
  }, []);

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <Physics debug={false} gravity={[0, -9.81, 0]}>
        <RigidBody colliders="ball">
          <mesh castShadow position={[-1.5, 2, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>

        <RigidBody
          position={[1.5, 2, 0]}
          ref={cube}
          gravityScale={1}
          restitution={0}
          friction={0.7}
          colliders={false}
          onCollisionEnter={collisionEnter}
          // onCollisionExit={() => console.log('exit')}
          // onSleep={() => console.log('sleep')}
          // onWake={() => console.log('wake')}
        >
          <CuboidCollider args={[0.5, 0.5, 0.5]} mass={2} />
          <mesh castShadow onClick={cubeJump}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody>

        <RigidBody type="fixed" friction={0.7}>
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>

        <RigidBody position={[0, -0.8, 0]} friction={0} type="kinematicPosition" ref={twister}>
          <mesh castShadow scale={[0.4, 0.4, 3]}>
            <boxGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>

        <RigidBody colliders={false} position={[0, 4, 0]}>
          <CylinderCollider args={[0.5, 1.25]} />
          <primitive object={hamburger.scene} scale={0.25} />
        </RigidBody>

        <RigidBody type="fixed">
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, 5.25]} />
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, -5.25]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[5.25, 1, 0]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[-5.25, 1, 0]} />
        </RigidBody>

        <InstancedRigidBodies instances={instances}>
          <instancedMesh castShadow args={[null, null, cubeCount]}>
            <boxGeometry />
            <meshStandardMaterial color="tomato" />
          </instancedMesh>
        </InstancedRigidBodies>
      </Physics>
    </>
  );
}

useGLTF.preload('./hamburger.glb');
