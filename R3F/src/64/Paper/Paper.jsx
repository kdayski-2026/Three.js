import gsap from 'gsap';
import useGeometry from '../stores/useGeometry';
import { useTexture } from '@react-three/drei';

export default function Paper() {
  const geometry = useGeometry((state) => state.plane);
  const papers = useTexture([
    './portfolio/paper/1.jpg',
    './portfolio/paper/2.jpg',
    './portfolio/paper/3.jpg',
    './portfolio/paper/4.jpg',
    './portfolio/paper/5.jpg',
    './portfolio/paper/6.1.jpg',
    './portfolio/paper/6.2.jpg',
    './portfolio/paper/7.jpg',
  ]);

  const movePaper = (e) => {
    e.stopPropagation();
    const mesh = e.eventObject;
    gsap.killTweensOf(mesh.position);
    gsap.killTweensOf(mesh.rotation);
    if (mesh.position.x === -3) {
      gsap.to(mesh.position, {
        duration: 1,
        x: mesh.position.x + 4 + Math.random() * 4,
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
          receiveShadow
          onClick={movePaper}
        >
          <meshStandardMaterial map={paper} roughness={1} metalness={0} />
        </mesh>
      ))}
    </group>
  );
}
