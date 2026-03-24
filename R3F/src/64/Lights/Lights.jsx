import { useControls } from 'leva';
import Ambient from './Ambient';
import Directional from './Directional';
import Spot from './Spot';
import RectArea from './RectArea';
import Point from './Point';

export default function Lights() {
  const { ambient, spot, directional, rectArea, point } = useControls('Lights', {
    ambient: true,
    spot: true,
    directional: true,
    rectArea: true,
    point: false,
  });

  return (
    <>
      {directional && <Directional />}
      {ambient && <Ambient />}
      {spot && <Spot />}
      {rectArea && <RectArea />}
      {point && <Point />}
    </>
  );
}
