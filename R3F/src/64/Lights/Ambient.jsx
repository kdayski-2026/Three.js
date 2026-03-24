import { folder, useControls } from 'leva';

export default function Ambient() {
  const { intensity, color } = useControls('Lights', {
    Ambient: folder({
      intensity: {
        value: 2,
        min: 0,
        max: 5,
      },
      color: '#9da1e3',
    }),
  });

  return <ambientLight intensity={intensity} color={color} />;
}
