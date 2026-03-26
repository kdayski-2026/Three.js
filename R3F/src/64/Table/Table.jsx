import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { useControls } from 'leva';
import gsap from 'gsap';
import useTable from '../stores/useTable.js';
import useGeometry from '../stores/useGeometry.js';
import useCamera from '../stores/useCamera.js';
import useScenePosition from '../stores/useScenePosition.js';
import useMaterial from '../stores/useMaterial.js';
import Paper from '../Paper/Paper.jsx';

export default function Table() {
  const commodeRef = useRef();
  const baseRef = useRef();
  const commodeBodyRef = useRef();
  const { camera } = useThree();
  const position = useCamera((state) => state.position);
  const geometry = useGeometry((state) => state.box);
  const basic = useMaterial((state) => state.basic);
  const material = useTable((state) => state.material);
  const setTextures = useTable((state) => state.setTextures);
  const setAttributes = useTable((state) => state.setAttributes);
  const setCenterPosition = useScenePosition((state) => state.setPosition);
  const textures = useTexture(
    {
      map: '/portfolio/table/min/wood_table_001_diff_1k.jpg',
      normalMap: '/portfolio/table/min/wood_table_001_nor_gl_1k.jpg',
      aoMap: '/portfolio/table/min/wood_table_001_arm_1k.jpg',
      roughnessMap: '/portfolio/table/min/wood_table_001_rough_1k.jpg',
    },
    () => {
      setTextures(textures);
    }
  );

  const { openEnable, roughness, metalness } = useControls('Table', {
    openEnable: true,
    roughness: {
      value: 0.5,
      min: 0,
      max: 1,
      step: 0.01,
    },
    metalness: {
      value: 0.0,
      min: 0,
      max: 1,
      step: 0.01,
    },
  });

  useEffect(() => {
    if (roughness || metalness) setAttributes({ roughness, metalness });
  }, [roughness, metalness]);

  const tempObject = useMemo(() => new THREE.Object3D(), []);

  useLayoutEffect(() => {
    if (!baseRef.current || !commodeBodyRef.current) return;

    const baseParts = [
      {
        position: [0, 0, 0.25],
        rotation: [0, 0, 0],
        scale: [12.75, 0.2, 8.5],
      },
      {
        position: [0, -3.85, -3.9],
        rotation: [Math.PI * 0.5, 0, 0],
        scale: [11.6, 0.2, 7.5],
      },
      {
        position: [-5.9, -3.85, 0],
        rotation: [0, 0, Math.PI * 0.5],
        scale: [7.5, 0.2, 8],
      },
      {
        position: [5.9, -3.85, 0],
        rotation: [0, 0, Math.PI * 0.5],
        scale: [7.5, 0.2, 8],
      },
    ];

    baseParts.forEach((part, i) => {
      tempObject.position.set(...part.position);
      tempObject.rotation.set(...part.rotation);
      tempObject.scale.set(...part.scale);
      tempObject.updateMatrix();
      baseRef.current.setMatrixAt(i, tempObject.matrix);
    });
    baseRef.current.instanceMatrix.needsUpdate = true;

    const commodeParts = [
      {
        position: [5.725, -1.1, 0.1],
        rotation: [0, 0, Math.PI * 0.5],
        scale: [2, 0.15, 7.8],
      },
      {
        position: [-5.725, -1.1, 0.1],
        rotation: [0, 0, Math.PI * 0.5],
        scale: [2, 0.15, 7.8],
      },
      {
        position: [0, -2.175, 0.1],
        rotation: [0, 0, 0],
        scale: [11.6, 0.15, 7.8],
      },
    ];

    commodeParts.forEach((part, i) => {
      tempObject.position.set(...part.position);
      tempObject.rotation.set(...part.rotation);
      tempObject.scale.set(...part.scale);
      tempObject.updateMatrix();
      commodeBodyRef.current.setMatrixAt(i, tempObject.matrix);
    });
    commodeBodyRef.current.instanceMatrix.needsUpdate = true;
  }, [geometry, material, tempObject]);

  const commodeToggle = (e) => {
    if (openEnable) {
      e.stopPropagation();
      // gsap.killTweensOf(commodeRef.current.position);
      // gsap.killTweensOf(camera.position);
      if (commodeRef.current.position.z < 2.5) {
        setCenterPosition(1, 1, -3);
        gsap.to(commodeRef.current.position, {
          duration: 2,
          z: 5,
          onUpdate: () => {
            camera.lookAt(commodeRef.current.position);
          },
        });
        gsap.to(camera.position, {
          duration: 2,
          ...position,
          y: position.y * 1,
          z: position.z * 0.2,
        });
      } else {
        setCenterPosition(0, 0, 0);
        gsap.to(commodeRef.current.position, {
          duration: 2,
          z: 0,
          onUpdate: () => {
            camera.lookAt(commodeRef.current.position);
          },
        });
        gsap.to(camera.position, {
          duration: 2,
          ...position,
        });
      }
    }
  };

  return (
    <group position-y={2} scale={[1.2, 1, 1]}>
      {/* Base */}
      <group>
        <instancedMesh
          ref={baseRef}
          args={[geometry, material, 4]}
          castShadow
          receiveShadow
          onClick={(e) => e.stopPropagation()}
        />
      </group>

      {/* Commode */}
      <group ref={commodeRef}>
        <instancedMesh ref={commodeBodyRef} args={[geometry, material, 3]} receiveShadow onClick={commodeToggle} />
        <Paper />
        {/* Front */}
        <mesh
          position={[0, -1.175, 4.075]}
          scale={[12, 0.15, 2.15]}
          rotation-x={Math.PI * 0.5}
          geometry={geometry}
          material={material}
          onClick={commodeToggle}
        />
        {/* Handle */}
        <mesh
          position={[0, -1.1, 4.3]}
          scale={[0.1, 0.1, 0.1]}
          rotation={[-Math.PI * 0.5, Math.PI * 0.25, 0]}
          onClick={commodeToggle}
        >
          <cylinderGeometry args={[Math.PI * 0.5, Math.PI * 0.8, 4, 4]} />
          <meshStandardMaterial color="#C0C0C0" roughness={0.2} metalness={0.8} />
        </mesh>
      </group>
    </group>
  );
}
