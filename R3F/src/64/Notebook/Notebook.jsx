import { useGLTF } from '@react-three/drei';
import Top from './Top';
import Bottom from './Bottom';
import { useMemo, useState, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useControls } from 'leva';

export default function Notebook() {
  const computer = useGLTF('./portfolio/macbook_model.gltf');
  const [isOpen, setIsOpen] = useState(false);
  const { camera } = useThree();

  const { openEnable } = useControls('Notebook', { openEnable: false });

  const top = useMemo(() => {
    let top = null;
    computer.scene.traverse((child) => {
      if (child.name === 'Top') {
        top = child;
      }
    });
    if (top) {
      top = top.clone();
      top.rotation.x = Math.PI;
      return top;
    } else return null;
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
          x: 0,
          y: 1,
          z: 3,
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
          x: -2,
          y: 2,
          z: 3,
          ease: 'power2.out',
        });
      }
    }
  };

  return (
    <>
      {/* <Float rotationIntensity={0.4}> */}
      <group scale={0.6}>
        <Top toggleTop={toggleTop} top={top} isOpen={isOpen} />
        <Bottom computer={computer} />
      </group>
      {/* </Float> */}
    </>
  );
}

useGLTF.preload('./macbook_model.gltf');
