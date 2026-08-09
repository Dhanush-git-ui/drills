import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface Hero3DViewerProps {
  scrollProgress?: number; // 0 to 1
  renderMode?: 'blueprint' | 'photorealistic';
  activeHotspotId?: string | null;
}

/* ------------------------------------------------------------------ */
/*  ISOMETRIC TRAY WITH DIMENSION LINES (Like video 00:09-00:15)      */
/* ------------------------------------------------------------------ */
function IsometricFloorTray({ mode }: { mode: 'blueprint' | 'photorealistic' }) {
  return (
    <group position={[0, -0.65, 0]}>
      {/* Base tray platform outline */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[3.2, 2.2]} />
        <meshBasicMaterial
          color={mode === 'blueprint' ? '#e0f2fe' : '#f1f5f9'}
          transparent
          opacity={mode === 'blueprint' ? 0.35 : 0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Rounded border outline */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(3.3, 0.05, 2.3)]} />
        <lineBasicMaterial color={mode === 'blueprint' ? 0x0284c7 : 0x94a3b8} linewidth={2} />
      </lineSegments>

      {/* Grid cross lines */}
      {[-1.2, -0.6, 0, 0.6, 1.2].map((x, i) => (
        <lineSegments key={`grid-x-${i}`} position={[x, 0.03, 0]}>
          <boxGeometry args={[0.01, 0.01, 2.2]} />
          <lineBasicMaterial color={mode === 'blueprint' ? 0x38bdf8 : 0xcbd5e1} transparent opacity={0.4} />
        </lineSegments>
      ))}

      {/* Dimension Line Markings (18" x 12") */}
      {mode === 'blueprint' && (
        <group position={[0, 0.08, 0]}>
          {/* Front width dimension line (18") */}
          <lineSegments position={[0, 0, 1.25]}>
            <boxGeometry args={[3.2, 0.01, 0.01]} />
            <lineBasicMaterial color={0x0284c7} />
          </lineSegments>
          {/* End caps */}
          <mesh position={[-1.6, 0, 1.25]}>
            <boxGeometry args={[0.02, 0.12, 0.02]} />
            <meshBasicMaterial color={0x0284c7} />
          </mesh>
          <mesh position={[1.6, 0, 1.25]}>
            <boxGeometry args={[0.02, 0.12, 0.02]} />
            <meshBasicMaterial color={0x0284c7} />
          </mesh>

          {/* Right depth dimension line (12") */}
          <lineSegments position={[1.75, 0, 0]}>
            <boxGeometry args={[0.01, 0.01, 2.2]} />
            <lineBasicMaterial color={0x0284c7} />
          </lineSegments>
          {/* End caps */}
          <mesh position={[1.75, 0, -1.1]}>
            <boxGeometry args={[0.12, 0.02, 0.02]} />
            <meshBasicMaterial color={0x0284c7} />
          </mesh>
          <mesh position={[1.75, 0, 1.1]}>
            <boxGeometry args={[0.12, 0.02, 0.02]} />
            <meshBasicMaterial color={0x0284c7} />
          </mesh>
        </group>
      )}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  PNEUMATIC DRILL RIG MODEL WITH BLUEPRINT / METALLIC SHADERS       */
/* ------------------------------------------------------------------ */
function PneumaticDrillRig({
  scrollProgress = 0,
  mode = 'blueprint',
  activeHotspotId,
}: {
  scrollProgress: number;
  mode: 'blueprint' | 'photorealistic';
  activeHotspotId?: string | null;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const chuckRef = useRef<THREE.Group>(null);

  // Materials pre-created for primitive attachment
  const mats = useMemo(() => {
    return {
      bpLine: new THREE.LineBasicMaterial({ color: 0x0284c7, linewidth: 1.5 }),
      bpBody: new THREE.MeshBasicMaterial({ color: 0xe0f2fe, transparent: true, opacity: 0.45 }),
      metalBody: new THREE.MeshStandardMaterial({ color: '#2b2e33', metalness: 0.7, roughness: 0.4 }),
      metalChrome: new THREE.MeshStandardMaterial({ color: '#d6d9dc', metalness: 0.9, roughness: 0.2 }),
      highlight: new THREE.MeshBasicMaterial({ color: '#0284c7', wireframe: mode === 'blueprint' }),
    };
  }, [mode]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Rotate drill chuck continuously
    if (chuckRef.current) {
      chuckRef.current.rotation.x += delta * 3;
    }

    // Scroll-driven animation logic
    let targetRotY = Math.PI * 0.25;
    let targetPosX = 0;
    let targetPosY = 0;
    let targetScale = 1.1;

    if (scrollProgress < 0.2) {
      targetRotY = Math.PI * 0.15;
      targetPosX = 0;
    } else if (scrollProgress >= 0.2 && scrollProgress < 0.65) {
      const p = (scrollProgress - 0.2) / 0.45;
      targetRotY = Math.PI * 0.15 + p * Math.PI * 0.45;
      targetPosX = 0;
      targetScale = 1.1 + p * 0.15;
    } else {
      const p = (scrollProgress - 0.65) / 0.35;
      targetRotY = Math.PI * 0.6 + p * Math.PI * 0.15;
      targetPosX = -1.45 * Math.min(1, p * 1.2);
      targetScale = 1.15;
    }

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.08);
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetPosX, 0.08);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetPosY, 0.08);
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.08));
  });

  const isBp = mode === 'blueprint';

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Floor Tray */}
      <IsometricFloorTray mode={mode} />

      {/* Main Assembly Group */}
      <group position={[0, 0.1, 0]}>
        {/* ============ 1. ROTATING CHUCK + DRILL BIT SHANK ============ */}
        <group ref={chuckRef}>
          {/* Hex Drill Steel Bit */}
          <mesh position={[-1.15, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.04, 0.04, 0.6, 6]} />
            {isBp ? (
              <>
                <primitive object={mats.bpBody} attach="material" />
                <lineSegments>
                  <edgesGeometry args={[new THREE.CylinderGeometry(0.04, 0.04, 0.6, 6)]} />
                  <primitive object={mats.bpLine} attach="material" />
                </lineSegments>
              </>
            ) : (
              <primitive object={mats.metalChrome} attach="material" />
            )}
          </mesh>

          {/* Tungsten Carbide Bit Head */}
          <mesh position={[-1.48, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <coneGeometry args={[0.075, 0.12, 12]} />
            {activeHotspotId === 'bit' ? (
              <primitive object={mats.highlight} attach="material" />
            ) : isBp ? (
              <>
                <primitive object={mats.bpBody} attach="material" />
                <lineSegments>
                  <edgesGeometry args={[new THREE.ConeGeometry(0.075, 0.12, 12)]} />
                  <lineBasicMaterial color={0x0284c7} linewidth={2} />
                </lineSegments>
              </>
            ) : (
              <primitive object={mats.metalChrome} attach="material" />
            )}
          </mesh>

          {/* Knurled Chuck Collar */}
          <mesh position={[-0.8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.13, 0.15, 0.22, 24]} />
            {isBp ? (
              <>
                <primitive object={mats.bpBody} attach="material" />
                <lineSegments>
                  <edgesGeometry args={[new THREE.CylinderGeometry(0.13, 0.15, 0.22, 24)]} />
                  <primitive object={mats.bpLine} attach="material" />
                </lineSegments>
              </>
            ) : (
              <primitive object={mats.metalChrome} attach="material" />
            )}
          </mesh>
        </group>

        {/* ============ 2. FRONT FLANGE & NOSE ============ */}
        <mesh position={[-0.56, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.22, 0.22, 0.08, 28]} />
          {isBp ? (
            <>
              <primitive object={mats.bpBody} attach="material" />
              <lineSegments>
                <edgesGeometry args={[new THREE.CylinderGeometry(0.22, 0.22, 0.08, 28)]} />
                <primitive object={mats.bpLine} attach="material" />
              </lineSegments>
            </>
          ) : (
            <primitive object={mats.metalBody} attach="material" />
          )}
        </mesh>

        {/* ============ 3. MAIN PNEUMATIC CYLINDER BODY ============ */}
        <mesh position={[0.08, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.26, 0.26, 1.15, 36]} />
          {activeHotspotId === 'piston' ? (
            <primitive object={mats.highlight} attach="material" />
          ) : isBp ? (
            <>
              <primitive object={mats.bpBody} attach="material" />
              <lineSegments>
                <edgesGeometry args={[new THREE.CylinderGeometry(0.26, 0.26, 1.15, 36)]} />
                <lineBasicMaterial color={0x0284c7} linewidth={1.5} />
              </lineSegments>
            </>
          ) : (
            <primitive object={mats.metalBody} attach="material" />
          )}
        </mesh>

        {/* Outer Reinforcement Rings */}
        {[-0.35, 0.08, 0.45].map((x, i) => (
          <mesh key={i} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.27, 0.27, 0.025, 36]} />
            {isBp ? (
              <lineSegments>
                <edgesGeometry args={[new THREE.CylinderGeometry(0.27, 0.27, 0.025, 36)]} />
                <lineBasicMaterial color={0x38bdf8} />
              </lineSegments>
            ) : (
              <primitive object={mats.metalChrome} attach="material" />
            )}
          </mesh>
        ))}

        {/* ============ 4. AUTOMATIC VALVE CHEST (TOP) ============ */}
        <group position={[0.08, 0.34, 0]}>
          <mesh>
            <boxGeometry args={[0.36, 0.18, 0.26]} />
            {activeHotspotId === 'valve' ? (
              <primitive object={mats.highlight} attach="material" />
            ) : isBp ? (
              <>
                <primitive object={mats.bpBody} attach="material" />
                <lineSegments>
                  <edgesGeometry args={[new THREE.BoxGeometry(0.36, 0.18, 0.26)]} />
                  <lineBasicMaterial color={0x0284c7} linewidth={2} />
                </lineSegments>
              </>
            ) : (
              <primitive object={mats.metalBody} attach="material" />
            )}
          </mesh>

          {/* Dome Cap */}
          <mesh position={[0, 0.12, 0]}>
            <cylinderGeometry args={[0.1, 0.14, 0.07, 24]} />
            {isBp ? (
              <lineSegments>
                <edgesGeometry args={[new THREE.CylinderGeometry(0.1, 0.14, 0.07, 24)]} />
                <primitive object={mats.bpLine} attach="material" />
              </lineSegments>
            ) : (
              <primitive object={mats.metalChrome} attach="material" />
            )}
          </mesh>
        </group>

        {/* ============ 5. AIR INLET & REGULATOR PORT (BACK) ============ */}
        <group position={[0.68, 0.05, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <mesh>
            <cylinderGeometry args={[0.12, 0.16, 0.28, 24]} />
            {activeHotspotId === 'inlet' ? (
              <primitive object={mats.highlight} attach="material" />
            ) : isBp ? (
              <>
                <primitive object={mats.bpBody} attach="material" />
                <lineSegments>
                  <edgesGeometry args={[new THREE.CylinderGeometry(0.12, 0.16, 0.28, 24)]} />
                  <lineBasicMaterial color={0x0284c7} linewidth={2} />
                </lineSegments>
              </>
            ) : (
              <primitive object={mats.metalBody} attach="material" />
            )}
          </mesh>
        </group>

        {/* ============ 6. VIBRATION DAMPING SIDE HANDLES ============ */}
        {[-1, 1].map((side, i) => (
          <group key={i} position={[0.08, 0, side * 0.38]} rotation={[side * 0.2, 0, 0]}>
            <mesh>
              <cylinderGeometry args={[0.025, 0.025, 0.38, 16]} />
              {isBp ? (
                <lineSegments>
                  <edgesGeometry args={[new THREE.CylinderGeometry(0.025, 0.025, 0.38, 16)]} />
                  <primitive object={mats.bpLine} attach="material" />
                </lineSegments>
              ) : (
                <primitive object={mats.metalChrome} attach="material" />
              )}
            </mesh>
            <mesh position={[0, 0, side * 0.14]}>
              <cylinderGeometry args={[0.04, 0.04, 0.2, 16]} />
              <meshStandardMaterial color="#111" />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  CANVAS CONTAINER & OrbitControls                                  */
/* ------------------------------------------------------------------ */
export default function Hero3DViewer({
  scrollProgress = 0,
  renderMode = 'blueprint',
  activeHotspotId = null,
}: Hero3DViewerProps) {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas shadows gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 1.2, 4.2]} fov={45} />
        <ambientLight intensity={renderMode === 'blueprint' ? 1.2 : 0.7} />
        <directionalLight position={[5, 8, 5]} intensity={1.4} castShadow />
        <pointLight position={[-5, -2, -5]} intensity={0.5} />

        <PneumaticDrillRig
          scrollProgress={scrollProgress}
          mode={renderMode}
          activeHotspotId={activeHotspotId}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 + 0.1}
          minPolarAngle={Math.PI / 4}
          rotateSpeed={0.6}
        />
      </Canvas>
    </div>
  );
}
