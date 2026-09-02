import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Center, Bounds, ContactShadows, Environment } from "@react-three/drei";
import * as THREE from "three";

interface ExplodedViewerProps {
  explodeDistance?: number;
  activeComponent?: string | null;
  carBrand?: string;
}

function ProceduralChassisCar({ explode = 0 }: { explode: number }) {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef} dispose={null}>
      {/* 1. Body Shell */}
      <mesh position={[0, 0.4 + explode * 0.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.9, 0.45, 4.2]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* 2. Glass Cabin / Windshield */}
      <mesh position={[0, 0.9 + explode * 0.7, -0.2]} castShadow>
        <boxGeometry args={[1.5, 0.5, 2.2]} />
        <meshPhysicalMaterial color="#050505" transmission={0.9} opacity={1} transparent roughness={0.05} ior={1.5} />
      </mesh>

      {/* 3. Hood / Front Aero */}
      <mesh position={[0, 0.6 + explode * 0.9, 1.3]} castShadow>
        <boxGeometry args={[1.7, 0.1, 1.4]} />
        <meshStandardMaterial color="#262626" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* 4. Powertrain / Engine Block */}
      <mesh position={[0, 0.3 + explode * 0.45, 1.2]} castShadow>
        <boxGeometry args={[0.9, 0.6, 0.9]} />
        <meshStandardMaterial color="#ccff00" emissive="#446600" emissiveIntensity={0.5} metalness={0.7} roughness={0.3} />
      </mesh>

      {/* 5. Headlights */}
      <mesh position={[0.7, 0.45 + explode * 0.35, 2.12]}>
        <boxGeometry args={[0.35, 0.1, 0.05]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={3} />
      </mesh>
      <mesh position={[-0.7, 0.45 + explode * 0.35, 2.12]}>
        <boxGeometry args={[0.35, 0.1, 0.05]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={3} />
      </mesh>

      {/* 6. Wheels (Expand Laterally) */}
      <mesh position={[1.05 + explode * 0.75, 0, 1.3]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
        <meshStandardMaterial color="#111" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[-1.05 - explode * 0.75, 0, 1.3]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
        <meshStandardMaterial color="#111" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[1.05 + explode * 0.75, 0, -1.3]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
        <meshStandardMaterial color="#111" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[-1.05 - explode * 0.75, 0, -1.3]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
        <meshStandardMaterial color="#111" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* 7. Structural Chassis */}
      <mesh position={[0, -0.05 - explode * 0.45, 0]} receiveShadow>
        <boxGeometry args={[1.6, 0.15, 3.8]} />
        <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.5} />
      </mesh>
    </group>
  );
}

export default function ExplodedViewer({ explodeDistance = 0 }: ExplodedViewerProps) {
  return (
    <div className="w-full h-[420px] md:h-[560px] bg-neutral-950 relative rounded-2xl overflow-hidden border border-neutral-800">
      <Canvas
        camera={{ position: [5, 3, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        shadows
      >
        <color attach="background" args={["#080808"]} />
        <ambientLight intensity={0.9} />
        <directionalLight position={[10, 20, 10]} intensity={2.2} castShadow shadow-mapSize={1024} />
        <pointLight position={[-10, 10, -10]} intensity={1.2} color="#a3e635" />

        <Suspense fallback={null}>
          <Bounds fit clip observe margin={1.3}>
            <Center>
              <ProceduralChassisCar explode={explodeDistance} />
            </Center>
          </Bounds>
          <ContactShadows position={[0, -0.5, 0]} opacity={0.75} scale={14} blur={1.8} far={5} />
          <Environment preset="night" />
        </Suspense>

        <OrbitControls
          makeDefault
          enablePan={false}
          minDistance={3.5}
          maxDistance={14}
          maxPolarAngle={Math.PI / 2 - 0.05}
        />
      </Canvas>

      <div className="absolute top-4 left-4 pointer-events-none">
        <span className="text-[10px] font-mono uppercase tracking-widest text-lime-400 bg-lime-950/60 border border-lime-800/60 px-2.5 py-1 rounded-full">
          ● Interactive 3D Exploded Engine
        </span>
      </div>
    </div>
  );
}
