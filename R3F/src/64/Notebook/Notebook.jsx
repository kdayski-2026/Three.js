import { useGLTF } from '@react-three/drei';
import Top from './Top';
import Bottom from './Bottom';
import { useMemo, useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useControls } from 'leva';
import useCamera from '../stores/useCamera';

export default function Notebook() {
  const computer = useGLTF('./portfolio/macbook_model.gltf');
  const position = useCamera((state) => state.position);
  const [isOpen, setIsOpen] = useState(false);
  const { camera } = useThree();

  const { openEnable } = useControls('Notebook', { openEnable: true });

  const [top, bottom] = useMemo(() => {
    computer.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    const top = computer.scene.getObjectByName('Top');
    const bottom = computer.scene.clone(true);
    let camera = null;
    bottom.traverse((child) => {
      if (child.name === 'FrontCameraRing001') camera = child;
      if (child.name === 'Top') {
        child.removeFromParent();
      }
    });
    if (camera) camera.removeFromParent();
    return [top, bottom];
  }, [computer]);

  const toggleTop = (e) => {
    if (openEnable) {
      e.stopPropagation();
      if (top.rotation.x >= Math.PI * 0.5) {
        gsap.to(top.rotation, {
          duration: 2,
          x: Math.PI * 0.44,
        });
        gsap.to(camera.position, {
          duration: 2,
          ...position,
          y: position.y * 0.25,
          z: position.z * 0.25,
          ease: 'power2.out',
          onComplete: () => {
            setIsOpen(true);
          },
        });
      } else {
        gsap.delayedCall(0.5, () => {
          setIsOpen(false);
        });
        gsap.to(top.rotation, {
          duration: 2,
          x: Math.PI,
        });
        gsap.to(camera.position, {
          duration: 2,
          ...position,
          ease: 'power2.out',
        });
      }
    }
  };

  return (
    <group scale={1.5} position={[0, 3.2, 0]}>
      <Top toggleTop={toggleTop} top={top} isOpen={isOpen} />
      <Bottom bottom={bottom} />
    </group>
  );
}

useGLTF.preload('./macbook_model.gltf');
