import gsap from 'gsap';
import useGeometry from '../../stores/useGeometry';
import { useTexture } from '@react-three/drei';

export default function Paper({ visible }) {
  const geometry = useGeometry((state) => state.plane);
  const papers = useTexture([
    './paper/1.jpg',
    './paper/2.jpg',
    './paper/10.jpg',
    './paper/12.jpg',
    './paper/15.jpg',
    './paper/17.jpg',
    './paper/19.jpg',
    './paper/20.jpg',
    './paper/21.jpg',
    './paper/22.jpg',
    './paper/25.jpg',
    './paper/26.jpg',
    './paper/27.jpg',
    './paper/28.jpg',
    './paper/30.jpg',
    './paper/31.jpg',
    './paper/32.jpg',
    './paper/33.jpg',
    './paper/34.jpg',
    './paper/35.jpg',
    './paper/36.jpg',
    './paper/37.jpg',
    './paper/38.jpg',
    './paper/40.jpg',
    './paper/41.jpg',
    './paper/42.jpg',
    './paper/43.jpg',
    './paper/44.jpg',
    './paper/45.jpg',
    './paper/47.jpg',
    './paper/48.jpg',
    './paper/49.jpg',
    './paper/50.jpg',
    './paper/51.jpg',
    './paper/52.jpg',
    './paper/53.jpg',
    './paper/54.jpg',
    './paper/55.jpg',
    './paper/56.jpg',
    './paper/57.jpg',
    './paper/58.jpg',
    './paper/59.jpg',
    './paper/60.jpg',
    './paper/61.jpg',
    './paper/62.jpg',
    './paper/63.jpg',
    './paper/64.jpg',
    './paper/65.jpg',
  ]);

  const movePaper = (e) => {
    e.stopPropagation();
    const mesh = e.eventObject;
    gsap.killTweensOf(mesh.position);
    gsap.killTweensOf(mesh.rotation);
    if (mesh.position.x === -3) {
      gsap.to(mesh.position, {
        duration: 1,
        x: mesh.position.x + 4 + Math.random() * 3,
        z: mesh.position.z + (Math.random() - 0.5) * 0.5,
        ease: 'power4.out',
      });
      gsap.to(mesh.rotation, {
        duration: 1,
        z: Math.PI * (Math.random() - 0.5) * 0.1,
        ease: 'power4.out',
      });
    } else {
      gsap.to(mesh.position, {
        duration: 1,
        x: -3,
        z: 1.5,
        ease: 'power4.out',
      });
      gsap.to(mesh.rotation, {
        duration: 1,
        z: Math.PI * (Math.random() - 0.5) * 0.05,
        ease: 'power4.out',
      });
    }
  };

  return (
    <group>
      {papers.map((paper, index) => (
        <mesh
          key={paper.uuid}
          geometry={geometry}
          rotation={[-Math.PI * 0.5, 0, Math.PI * (Math.random() - 0.5) * 0.05]}
          scale={[2.1 * 1.5, 2.97 * 1.5, 0.01]}
          position={[-3, -2.09 + (index + 1) * 0.01, 1.5]}
          receiveShadow={false}
          onClick={movePaper}
          visible={visible}
        >
          <meshBasicMaterial map={paper} roughness={1} metalness={0} />
        </mesh>
      ))}
    </group>
  );
}
