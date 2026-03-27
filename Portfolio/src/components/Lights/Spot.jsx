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
  const targetOffset = useMemo(() => new Vector3(1, -3, 0), []);
  const { position, color, intensity, power, distance, angle, penumbra, decay } = useControls(
    'Lights',
    {
      Spot: folder({
        color: '#FFD59E',
        position: {
          value: { x: -4.4, y: 4.75, z: -1 },
        },
        intensity: {
          value: 16,
          min: 0,
          max: 200,
        },
        power: {
          value: 300,
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

  const { bias, normal } = useControls({
    bias: {
      value: -0.0001,
      min: -0.003,
      max: -0.0001,
      step: 0.00001,
    },
    normal: {
      value: 0.13,
      min: 0.02,
      max: 0.3,
      step: 0.001,
    },
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
      shadow-mapSize={[1024, 1024]}
      shadow-camera-near={1}
      shadow-camera-far={10}
      shadow-bias={bias}
      shadow-normalBias={normal}
    />
  );
}
