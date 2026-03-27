import gsap from 'gsap';
import { useGLTF } from '@react-three/drei';
import Top from './Top';
import Bottom from './Bottom';
import { useMemo, useState } from 'react';
import { useThree } from '@react-three/fiber';
import useCamera from '../../stores/useCamera';
import useScenePosition from '../../stores/useScenePosition';

export default function Laptop() {
  const [isOpen, setIsOpen] = useState(false);
  const position = useCamera((state) => state.position);
  const setCameraMove = useCamera((state) => state.setCameraMove);
  const setCenterPosition = useScenePosition((state) => state.setPosition);
  const computer = useGLTF('./laptop/Low_Poly_Laptop.gltf');
  const { camera } = useThree();

  const [top, bottom] = useMemo(() => {
    computer.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    const top = computer.scene.getObjectByName('Screen');
    const bottom = computer.scene.getObjectByName('Scene');
    return [top, bottom];
  }, [computer]);

  const zoomToLaptop = (e) => {
    e.stopPropagation();

    gsap.killTweensOf(camera.position);
    gsap.killTweensOf(top.rotation);

    if (top.rotation.x >= Math.PI * 0.25) {
      setCenterPosition(0, -1.5, 0);
      gsap.to(camera.position, {
        duration: 2,
        ...position,
        y: position.y * 0.2,
        z: position.z * 0.4,
        ease: 'power2.out',
      });
      gsap.to(top.rotation, {
        duration: 2,
        x: Math.PI * -0.05,
        onComplete: () => {
          setIsOpen(true);
          setCameraMove(false);
        },
      });
    } else {
      setCenterPosition(0, 0, 0);
      setIsOpen(false);
      setCameraMove(true);
      gsap.to(camera.position, {
        duration: 2,
        ...position,
        ease: 'power2.out',
      });
      gsap.to(top.rotation, {
        duration: 2,
        x: Math.PI * 0.5,
      });
    }
  };

  return (
    <group scale={1.5} position={[0, 3, 0]} onClick={zoomToLaptop}>
      <Top top={top} isOpen={isOpen} />
      <Bottom bottom={bottom} />
    </group>
  );
}

useGLTF.preload('./laptop/Low_Poly_Laptop.gltf');
