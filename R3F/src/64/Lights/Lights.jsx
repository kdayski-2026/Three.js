import { useControls } from 'leva';
import Ambient from './Ambient';
import Directional from './Directional';
import Spot from './Spot';
import RectArea from './RectArea';

export default function Lights() {
  const { ambient, spot, directional, rectArea } = useControls('Lights', {
    ambient: true,
    spot: true,
    directional: true,
    rectArea: true,
  });

  return (
    <>
      {directional && <Directional />}
      {ambient && <Ambient />}
      {spot && <Spot />}
      {rectArea && <RectArea />}
    </>
  );
}
