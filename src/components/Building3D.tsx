import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// A single building block that rotates slowly
function BuildingStructure() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1; // slow rotation
      // Add slight floating effect
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Core Structure */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3, 10, 3]} />
        <meshStandardMaterial color="#111" transparent opacity={0.8} />
        {/* Wireframe overlay to look like blueprints/tech */}
        <lineSegments>
          <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(3, 10, 3)]} />
          <lineBasicMaterial color="#dc2626" transparent opacity={0.5} />
        </lineSegments>
      </mesh>

      {/* Outer abstract frame */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4, 12, 4]} />
        <meshBasicMaterial color="#444" wireframe transparent opacity={0.2} />
      </mesh>

      {/* Floating horizontal floors */}
      {[...Array(8)].map((_, i) => (
        <mesh key={i} position={[0, -4 + i * 1.2, 0]}>
          <boxGeometry args={[3.2, 0.1, 3.2]} />
          <meshStandardMaterial color="#dc2626" emissive="#dc2626" emissiveIntensity={0.5} transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
}

export default function Building3D() {
  return (
    <div className="absolute inset-0 z-0 bg-black pointer-events-none">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 2, 15]} fov={45} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#dc2626" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
        
        <BuildingStructure />
        
        {/* Red mist/fog for atmosphere */}
        <fog attach="fog" args={['#000', 10, 30]} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
