import { PresentationControls, OrbitControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useControls } from 'leva';
import { useEffect, useRef, useState } from 'react';

export default function Controls({ children }) {
  const lookTarget = useRef(new Vector3());
  const [smoothedTargetPosition] = useState(() => new Vector3());
  const { camera } = useThree();
  const { orbit, movePower, smoothPower, mouseTrack } = useControls(
    'Controls',
    {
      orbit: false,
      mouseTrack: true,
      movePower: {
        value: 1.1,
        min: 0,
        max: 5,
      },
      smoothPower: {
        value: 3.8,
        min: 0,
        max: 5,
      },
    },
    { collapsed: true }
  );

  useEffect(() => {
    const cameraMove = (e) => {
      e.stopPropagation();
      if (e.pressure) lookTarget.current.set(0, 0, 0);
      else
        lookTarget.current.set(
          (e.x / window.innerWidth - 0.5) * movePower,
          -(e.y / window.innerHeight - 0.5) * movePower,
          0
        );
    };

    document.addEventListener('pointermove', cameraMove);

    return () => {
      document.removeEventListener('pointermove', cameraMove);
    };
  }, [movePower]);

  useEffect(() => {
    if (!mouseTrack) {
      lookTarget.current.set(0, 0, 0);
      camera.lookAt(lookTarget.current);
    }
  }, [mouseTrack]);

  useFrame((state, delta) => {
    if (mouseTrack) state.camera.lookAt(smoothedTargetPosition.lerp(lookTarget.current, delta * smoothPower));
  });

  return (
    <>
      {orbit && <OrbitControls makeDefault />}
      <PresentationControls global polar={[-0.1, 0.3]} azimuth={[-0.7, 0.7]} damping={0.1} snap enabled={!orbit}>
        {children}
      </PresentationControls>
    </>
  );
}
