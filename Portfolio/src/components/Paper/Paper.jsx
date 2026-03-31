import gsap from 'gsap';
import useGeometry from '../../stores/useGeometry';
import { useTexture } from '@react-three/drei';

export default function Paper({ visible }) {
  const geometry = useGeometry((state) => state.plane);
  const papers = useTexture([
    './paper/1.jpg',
    './paper/2.jpg',
    './paper/3.jpg',
    './paper/4.jpg',
    './paper/5.jpg',
    './paper/6.1.jpg',
    './paper/6.2.jpg',
    './paper/7.jpg',
    './paper/8.jpg',
    './paper/9.1.jpg',
    './paper/9.2.jpg',
    './paper/9.3.jpg',
    './paper/10.1.jpg',
    './paper/10.2.jpg',
    './paper/11.1.jpg',
    './paper/11.2.jpg',
    './paper/12.1.jpg',
    './paper/12.2.jpg',
    './paper/13.1.jpg',
    './paper/13.2.jpg',
    './paper/14.1.jpg',
    './paper/14.2.jpg',
    './paper/15.1.jpg',
    './paper/15.2.jpg',
    './paper/16.1.jpg',
    './paper/16.2.jpg',
    './paper/17.1.jpg',
    './paper/17.2.jpg',
    './paper/18.1.jpg',
    './paper/18.2.jpg',
    './paper/18.3.jpg',
    './paper/19.1.jpg',
    './paper/19.2.jpg',
    './paper/20.1.jpg',
    './paper/20.2.jpg',
    './paper/20.3.jpg',
    './paper/21.1.jpg',
    './paper/21.2.jpg',
    './paper/22.1.jpg',
    './paper/22.2.jpg',
    './paper/23.1.jpg',
    './paper/23.2.jpg',
    './paper/24.1.jpg',
    './paper/24.2.jpg',
    './paper/25.1.jpg',
    './paper/25.2.jpg',
    './paper/26.1.jpg',
    './paper/26.2.jpg',
    './paper/27.1.jpg',
    './paper/27.2.jpg',
    './paper/28.jpg',
    './paper/29.jpg',
    './paper/30.1.jpg',
    './paper/30.2.jpg',
    './paper/30.3.jpg',
    './paper/31.jpg',
    './paper/32.jpg',
    './paper/33.1.jpg',
    './paper/33.2.jpg',
    './paper/33.3.jpg',
    './paper/34.1.jpg',
    './paper/34.2.jpg',
    './paper/35.1.jpg',
    './paper/35.2.jpg',
    './paper/35.3.jpg',
    './paper/36.1.jpg',
    './paper/36.2.jpg',
    './paper/37.1.jpg',
    './paper/37.2.jpg',
    './paper/38.1.jpg',
    './paper/38.2.jpg',
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
