import Table from '../Table/Table';
import Cup from '../Cup/Cup';
import Notebook from '../Notebook/Notebook';

export default function WorkSpace() {
  return (
    <group position={[0, -4, 0]}>
      <Table />
      <Notebook />
      <Cup />
    </group>
  );
}
