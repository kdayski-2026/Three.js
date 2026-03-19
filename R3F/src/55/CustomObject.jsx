import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

export default function CustomObject() {
  const geometryRef = useRef();
  const verticesCount = 10 * 3;

  const positions = useMemo(() => {
    const positions = new Float32Array(verticesCount * 3);

    for (let i = 0; i < verticesCount; i++) {
      const i3 = i * 3;
      positions[i3 + 0] = (Math.random() - 0.5) * 3;
      positions[i3 + 1] = (Math.random() - 0.5) * 3;
      positions[i3 + 2] = (Math.random() - 0.5) * 3;
    }
    return positions;
  }, []);

  useEffect(() => {
    geometryRef.current.computeVertexNormals();

    return () => {};
  }, []);

  return (
    <mesh>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute attach="attributes-position" count={verticesCount} itemSize={3} array={positions} />
      </bufferGeometry>
      <meshStandardMaterial color="red" side={THREE.DoubleSide} />
    </mesh>
  );
}
