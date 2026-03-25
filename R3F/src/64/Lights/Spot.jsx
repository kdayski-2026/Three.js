import { Quaternion, SpotLightHelper, Vector3 } from 'three';
import { useHelper } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { folder, useControls } from 'leva';
import { useMemo, useRef } from 'react';

export default function Spot() {
  const spotLightRef = useRef();
  const worldPosition = useMemo(() => new Vector3(), []);
  const worldQuaternion = useMemo(() => new Quaternion(), []);
  const rotatedOffset = useMemo(() => new Vector3(), []);
  const targetOffset = useMemo(() => new Vector3(1, -2.2, 1), []);
  const { position, color, intensity, power, distance, angle, penumbra, decay } = useControls(
    'Lights',
    {
      Spot: folder({
        color: '#FFD59E',
        position: {
          value: { x: -2.4, y: 1.05, z: -1 },
        },
        intensity: {
          value: 16,
          min: 0,
          max: 200,
        },
        power: {
          value: 800,
          min: 0,
          max: 2000,
        },
        distance: {
          value: 12,
          min: 0,
          max: 100,
        },
        angle: {
          value: 0.46,
          min: 0,
          max: 1,
        },
        penumbra: {
          value: 0.5,
          min: 0,
          max: 10,
          hint: 'Realistic value is 0.5',
        },
        decay: {
          value: 2,
          min: 0,
          max: 10,
          hint: 'Realistic value is 2',
        },
      }),
    },
  );
  // useHelper(spotLightRef, SpotLightHelper, 1);
  useFrame(() => {
    if (spotLightRef.current) {
      spotLightRef.current.getWorldPosition(worldPosition);
      spotLightRef.current.getWorldQuaternion(worldQuaternion);
      rotatedOffset.copy(targetOffset).applyQuaternion(worldQuaternion);
      spotLightRef.current.target.position.copy(worldPosition).add(rotatedOffset);
      spotLightRef.current.target.updateMatrixWorld();
    }
  });

  return (
    <spotLight
      ref={spotLightRef}
      position={[position.x - 1.6, position.y + 4.5, position.z - 0.1]}
      color={color}
      intensity={intensity}
      power={power}
      distance={distance}
      angle={Math.PI * angle}
      penumbra={penumbra}
      decay={decay}
      castShadow={true}
      shadow-mapSize={[512, 512]}
      shadow-camera-near={1}
      shadow-camera-far={10}
      shadow-bias={-0.0004}
      shadow-normalBias={0.085}
    />
  );
}
