import { DirectionalLightHelper, Quaternion, Vector3 } from 'three';
import { useHelper } from '@react-three/drei';
import { folder, useControls } from 'leva';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Directional() {
  const directionalLightRef = useRef();
  const worldPosition = useMemo(() => new Vector3(), []);
  const worldQuaternion = useMemo(() => new Quaternion(), []);
  const rotatedOffset = useMemo(() => new Vector3(), []);
  const offsetPosition = useMemo(() => new Vector3(-8, -16, 12), []);
  const { position, color, intensity } = useControls('Lights', {
    Directional: folder({
      color: '#6c78a3',
      position: {
        value: { x: 16, y: 12, z: -4.99 },
      },
      target: {
        value: {
          x: -9,
          y: -15,
        },
        joystick: 'invertY',
      },
      targetZ: {
        value: 10,
      },
      intensity: {
        value: 6.8,
        min: 0,
        max: 10,
      },
    }),
  });
  // useHelper(directionalLightRef, DirectionalLightHelper, 1);
  useFrame(() => {
    if (directionalLightRef.current) {
      directionalLightRef.current.getWorldPosition(worldPosition);
      directionalLightRef.current.getWorldQuaternion(worldQuaternion);
      rotatedOffset.copy(offsetPosition).applyQuaternion(worldQuaternion);
      directionalLightRef.current.target.position.copy(worldPosition).add(rotatedOffset);
      directionalLightRef.current.target.updateMatrixWorld();
    }
  });

  return (
    <directionalLight
      ref={directionalLightRef}
      position={[position.x, position.y, position.z]}
      color={color}
      intensity={intensity}
      castShadow={false}
      // shadow-mapSize={[1024, 1024]}
      // shadow-camera-near={1}
      // shadow-camera-far={100}
      // shadow-camera-top={10}
      // shadow-camera-right={10}
      // shadow-camera-bottom={-10}
      // shadow-camera-left={-10}
      // shadow-bias={-0.0002}
      // shadow-normalBias={0.03}
    />
  );
}
