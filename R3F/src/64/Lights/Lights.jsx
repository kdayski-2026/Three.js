import Ambient from './Ambient';
import Directional from './Directional';
import Spot from './Spot';
import RectArea from './RectArea';
import useLights from '../stores/useLights';

export default function Lights() {
  const ambient = useLights((state) => state.ambient);
  const directional = useLights((state) => state.directional);
  const spot = useLights((state) => state.spot);
  const rectArea = useLights((state) => state.rectArea);

  return (
    <>
      {directional && <Directional />}
      {ambient && <Ambient />}
      {spot && <Spot />}
      {/* {rectArea && <RectArea />} */}
    </>
  );
}
