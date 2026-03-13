import {
  PresentationControls,
  useGLTF,
  Environment,
  Float,
  ContactShadows,
  Text,
} from '@react-three/drei';
import Top from './Notebook/Top';
import Bottom from './Notebook/Bottom';
import { useMemo, useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useControls } from 'leva';

export default function Experience() {
  const computer = useGLTF('./macbook_model.gltf');
  const [isOpen, setIsOpen] = useState(false);
  const { camera } = useThree();

  const top = useMemo(() => {
    let top = null;
    computer.scene.traverse((child) => {
      console.log(child.name);
      if (child.name === 'Top') {
        top = child;
      }
    });
    top.rotation.x = Math.PI;
    return top;
  }, [computer]);

  const toggleTop = (e) => {
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
        onUpdate: () => {
          camera.lookAt(0, 0.5, 0);
        },
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
        x: 0,
        y: 4,
        z: 0,
        ease: 'power2.in',
        onUpdate: () => {
          camera.lookAt(0, 0.5, 0);
        },
      });
    }
  };

  return (
    <>
      <Environment files="./potsdamer_platz_1k.hdr" />

      <color args={['#1d1a24']} attach="background" />

      <PresentationControls global polar={[-0.4, 0.2]} azimuth={[-1, 0.75]} damping={0.1} snap>
        <Float rotationIntensity={0.4}>
          <Top toggleTop={toggleTop} top={top} isOpen={isOpen} />
          <Bottom computer={computer} />
        </Float>
      </PresentationControls>

      <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />
    </>
  );
}

useGLTF.preload('./macbook_model.gltf');
