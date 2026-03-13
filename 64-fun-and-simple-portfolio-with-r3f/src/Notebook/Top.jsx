import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function Top({ top, toggleTop, isOpen }) {
  const [loaded, setLoaded] = useState(false);

  const handleIframeLoaded = () => {
    setLoaded(true);
  };

  return (
    <>
      {loaded && isOpen && (
        <rectAreaLight
          width={2.5}
          height={1.65}
          intensity={65}
          color={'#5900ff'}
          rotation={[-0.1, Math.PI, 0]}
          position={[0, 0.55, -1.15]}
        />
      )}

      <primitive object={top} position={[0, -0.7, -1.09]} scale={0.6} onClick={toggleTop}>
        <Html
          transform
          wrapperClass="htmlScreen"
          distanceFactor={1.96}
          position={[0, -0.05, -1.9]}
          rotation-x={-1.58}
        >
          {!loaded && isOpen && (
            <div className="loader-overlay">
              <div className="loader-circle" />
            </div>
          )}
          <iframe
            src="https://tymio-landing.vercel.app/"
            onLoad={handleIframeLoaded}
            style={{ display: isOpen ? 'block' : 'none' }}
          />
        </Html>
      </primitive>
    </>
  );
}
