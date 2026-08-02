import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Environment, Float, Box } from '@react-three/drei';
import * as THREE from 'three';

// A modern abstract geometric background component
function FloatingCubes() {
  const group = useRef<THREE.Group>(null);
  
  // Create 15 abstract cubes with random positions
  const cubes = useMemo(() => {
    return Array.from({ length: 15 }).map(() => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15 - 5
      ] as [number, number, number],
      scale: Math.random() * 1.5 + 0.5,
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number]
    }));
  }, []);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.05;
      group.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <group ref={group}>
      {cubes.map((cube, i) => (
        <Float
          key={i}
          speed={1.5}
          rotationIntensity={2}
          floatIntensity={2}
          position={cube.position}
        >
          <Box args={[cube.scale, cube.scale, cube.scale]} rotation={cube.rotation}>
            <meshStandardMaterial
              color={i % 3 === 0 ? "#8B0000" : i % 2 === 0 ? "#111111" : "#333333"} // Dark red, black, dark gray
              metalness={0.8}
              roughness={0.2}
              wireframe={i % 4 === 0} // Some wireframes for tech look
            />
          </Box>
        </Float>
      ))}
    </group>
  );
}

export default function GeometricBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <Suspense fallback={null}>
          <color attach="background" args={['#050505']} />
          
          {/* Lighting */}
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
          <pointLight position={[-10, -10, -5]} intensity={2} color="#8B0000" /> {/* Red glow */}
          
          {/* Environment mapping for reflections */}
          <Environment preset="city" />
          
          {/* Stars for depth */}
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          {/* The floating abstract geometry */}
          <FloatingCubes />
          
          {/* Slow auto-rotation for the camera */}
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
