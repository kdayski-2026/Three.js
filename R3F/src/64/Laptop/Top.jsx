import { Html, useHelper } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useControls } from 'leva';
import useCamera from '../stores/useCamera';
import useScenePosition from '../stores/useScenePosition';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';

export default function Top({ top }) {
  const rectAreaRef = useRef();
  const [loaded, setLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [light, setLight] = useState(false);
  const position = useCamera((state) => state.position);
  const setCenterPosition = useScenePosition((state) => state.setPosition);
  const { camera } = useThree();
  const { openEnable } = useControls('Laptop', { openEnable: true });

  const handleIframeLoaded = () => {
    setLoaded(true);
  };

  const toggleTop = (e) => {
    if (openEnable) {
      e.stopPropagation();
      if (top.rotation.x >= Math.PI * 0.25) {
        setCenterPosition(0, -2, 0);
        gsap.to(top.rotation, {
          duration: 2,
          x: Math.PI * -0.05,
        });
        gsap.to(camera.position, {
          duration: 2,
          ...position,
          y: position.y * 0.25,
          z: position.z * 0.5,
          ease: 'power2.out',
          onComplete: () => {
            setIsOpen(true);
            setLoaded(false);
            gsap.delayedCall(1, () => {
              setLight(true);
            });
          },
        });
      } else {
        gsap.delayedCall(0.5, () => {
          setIsOpen(false);
          setLoaded(false);
          setLight(false);
        });
        setCenterPosition(0, 0, 0);
        gsap.to(top.rotation, {
          duration: 2,
          x: Math.PI * 0.5,
        });
        gsap.to(camera.position, {
          duration: 2,
          ...position,
          ease: 'power2.out',
        });
      }
    }
  };

  useHelper(rectAreaRef, RectAreaLightHelper, 1);

  return (
    <>
      {light && (
        <rectAreaLight
          ref={rectAreaRef}
          castShadow={false}
          width={2.3}
          height={1.3}
          intensity={30}
          color={'#5900ff'}
          rotation={[-0.16, Math.PI, 0]}
          position={[0, 0.5, -0.53]}
        />
      )}

      <primitive
        rotation-x={Math.PI * 0.5}
        object={top}
        position={[0, -0.5, -0.345]}
        scale={10}
        onClick={toggleTop}
      >
        <Html
          transform
          scale={0.05}
          wrapperClass="htmlScreen"
          distanceFactor={1.96}
          position={[0, 0.1, -0.004]}
        >
          {!loaded && isOpen && (
            <div className="loader-overlay">
              <div className="loader-circle" />
            </div>
          )}
          {isOpen && (
            <iframe
              // src="https://tymio-landing.vercel.app/"
              src="https://docs.tymio.com/en"
              onLoad={handleIframeLoaded}
            />
          )}
        </Html>
      </primitive>
    </>
  );
}
