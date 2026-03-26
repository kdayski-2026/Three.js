import { useTexture } from '@react-three/drei';
import useGeometry from '../stores/useGeometry';
import { useMemo, useState } from 'react';
import gsap from 'gsap';
import useScenePosition from '../stores/useScenePosition';
import { useThree } from '@react-three/fiber';
import useCamera from '../stores/useCamera';
import {
  Color,
  LinearSRGBColorSpace,
  MeshBasicMaterial,
  MeshStandardMaterial,
  RepeatWrapping,
  SRGBColorSpace,
} from 'three';
import useBoard from '../stores/useBoard';
import useLights from '../stores/useLights';

export default function Board() {
  const [isInView, setIsInView] = useState(false);
  const box = useGeometry((state) => state.box);
  const plane = useGeometry((state) => state.plane);
  const material = useBoard((state) => state.material);
  const setTextures = useBoard((state) => state.setTextures);
  const setCenterPosition = useScenePosition((state) => state.setPosition);
  const position = useCamera((state) => state.position);
  const { camera } = useThree();
  const board = useTexture(
    {
      map: '/portfolio/board/min/wood_chips_diff_1k.jpg',
      aoMap: '/portfolio/board/min/wood_chips_arm_1k.jpg',
      roughnessMap: '/portfolio/board/min/wood_chips_rough_1k.jpg',
    },
    () => {
      setTextures(board);
    }
  );
  const certs = useTexture([
    '/portfolio/certs/4.jpg',
    '/portfolio/certs/1.jpg',
    '/portfolio/certs/2.jpg',
    '/portfolio/certs/3.jpg',

    '/portfolio/certs/5.jpg',
    '/portfolio/certs/6.jpg',
    '/portfolio/certs/8.jpg',
    '/portfolio/certs/9.jpg',
    '/portfolio/certs/10.jpg',
    '/portfolio/certs/11.jpg',
    '/portfolio/certs/7.jpg',
  ]);

  const handleClick = (e) => {
    e.stopPropagation();
    if (isInView) {
      setCenterPosition(0, 0, 0);
      gsap.to(camera.position, {
        duration: 2,
        ...position,
        onComplete: () => setIsInView((prev) => !prev),
      });
    } else {
      setCenterPosition(0, -3, 2);
      gsap.to(camera.position, {
        duration: 2,
        ...position,
        y: position.y * 0.05,
        z: position.z * 0.3,
        onComplete: () => setIsInView((prev) => !prev),
      });
    }
  };

  const handleLink = (e, idx) => {
    e.stopPropagation();
    window.open(links[idx], '_blank');
  };

  const [positions, rotations, links] = useMemo(() => {
    const positions = [
      [-3.5 + (Math.random() - 0.5) * 0.25, 1.75 + (Math.random() - 0.5) * 0.25, 0],
      [-1 + (Math.random() - 0.5) * 0.25, 1.75 + (Math.random() - 0.5) * 0.25, 0],
      [1.5 + (Math.random() - 0.5) * 0.25, 1.75 + (Math.random() - 0.5) * 0.25, 0],
      [4 + (Math.random() - 0.5) * 0.25, 1.75 + (Math.random() - 0.5) * 0.25, 0],
      [-3 + (Math.random() - 0.5) * 0.25, 0 + (Math.random() - 0.5) * 0.25, 0],
      [0 + (Math.random() - 0.5) * 0.25, 0 + (Math.random() - 0.5) * 0.25, 0],
      [4 + (Math.random() - 0.5) * 0.25, -1.75 + (Math.random() - 0.5) * 0.25, 0],
      [3 + (Math.random() - 0.5) * 0.25, 0 + (Math.random() - 0.5) * 0.25, 0],
      [-3.5 + (Math.random() - 0.5) * 0.25, -1.75 + (Math.random() - 0.5) * 0.25, 0],
      [-1 + (Math.random() - 0.5) * 0.25, -1.75 + (Math.random() - 0.5) * 0.25, 0],
      [1.5 + (Math.random() - 0.5) * 0.25, -1.75 + (Math.random() - 0.5) * 0.25, 0],
    ];
    const rotations = [
      Math.PI * 0.1 * (Math.random() - 0.5),
      Math.PI * 0.1 * (Math.random() - 0.5),
      Math.PI * 0.1 * (Math.random() - 0.5),
      Math.PI * 0.1 * (Math.random() - 0.5),
      Math.PI * 0.1 * (Math.random() - 0.5),
      Math.PI * 0.1 * (Math.random() - 0.5),
      Math.PI * 0.1 * (Math.random() - 0.5),
      Math.PI * 0.1 * (Math.random() - 0.5),
      Math.PI * 0.1 * (Math.random() - 0.5),
      Math.PI * 0.1 * (Math.random() - 0.5),
      Math.PI * 0.1 * (Math.random() - 0.5),
    ];
    const links = [
      'https://stepik.org/cert/244172?lang=en',
      'https://stepik.org/cert/251962?lang=en',
      'https://stepik.org/cert/231191?lang=en',
      'https://stepik.org/cert/180777?lang=en',
      'https://www.udemy.com/certificate/UC-2ff01463-277e-4b7f-ac8d-b3cfc7492a02/',
      'https://threejs-journey.com/certificate/view/50609',
      'https://www.udemy.com/certificate/UC-4201f6e7-70ec-4d61-968b-22ebd9910821/',
      'https://www.udemy.com/certificate/UC-107169d6-8156-43ec-a577-5c4dda7296b4/',
      'https://www.udemy.com/certificate/UC-45802941-e07b-46ca-9168-a6d4bef0de6c/',
      'https://www.udemy.com/certificate/UC-f1780233-8af5-4ffa-a75f-fa23d187ad89/',
      'https://www.udemy.com/certificate/UC-499fb776-d2b2-45ea-a244-48b666c898df/',
    ];
    return [positions, rotations, links];
  }, []);

  return (
    <group position={[0, 6, -4.9]}>
      {/* Board */}
      <mesh
        geometry={box}
        material={material}
        material-map={board.map}
        material-normalMap={board.normalMap}
        material-aoMap={board.aoMap}
        material-roughnessMap={board.roughnessMap}
        scale={[12, 6, 0.25]}
        castShadow
        receiveShadow
        onClick={handleClick}
      />

      {/* Certs */}
      <group position={[0, 0, 0.15]}>
        {positions.map((pos, idx) => (
          <mesh
            key={idx}
            scale={[2, 1.5, 0.1]}
            geometry={plane}
            position={pos}
            rotation-z={rotations[idx]}
            material={(() => {
              const mat = new MeshStandardMaterial({ map: certs[idx] });
              if (certs[idx]) certs[idx].colorSpace = SRGBColorSpace;
              return mat;
            })()}
            material-metalness={0}
            material-roughness={1}
            onClick={(e) => handleLink(e, idx)}
          />
        ))}
      </group>
    </group>
  );
}
