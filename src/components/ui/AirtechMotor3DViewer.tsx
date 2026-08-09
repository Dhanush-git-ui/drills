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
/*  ISOMETRIC TRAY WITH DIMENSION LINES                               */
/* ------------------------------------------------------------------ */
function IsometricFloorTray({ mode, scrollProgress }: { mode: 'blueprint' | 'photorealistic', scrollProgress: number }) {
  return (
    <group position={[0, -0.65, 0]}>
      {/* Base tray platform outline */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[3.2, 2.2]} />
        <meshBasicMaterial
          color={mode === 'blueprint' ? '#fee2e2' : '#f1f5f9'}
          transparent
          opacity={mode === 'blueprint' ? 0.35 : 0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Rounded border outline */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(3.3, 0.05, 2.3)]} />
        <lineBasicMaterial color={mode === 'blueprint' ? 0xe11d48 : 0x94a3b8} linewidth={2} />
      </lineSegments>

      {/* Grid cross lines */}
      {[-1.2, -0.6, 0, 0.6, 1.2].map((x, i) => (
        <lineSegments key={`grid-x-${i}`} position={[x, 0.03, 0]}>
          <boxGeometry args={[0.01, 0.01, 2.2]} />
          <lineBasicMaterial color={mode === 'blueprint' ? 0xf87171 : 0xcbd5e1} transparent opacity={0.4} />
        </lineSegments>
      ))}

      {/* Dimension Line Markings (18" x 12") */}
      {mode === 'blueprint' && (
        <group position={[0, 0.08, 0]}>
          {/* Front width dimension line (18") */}
          <lineSegments position={[0, 0, 1.25]}>
            <boxGeometry args={[3.2, 0.01, 0.01]} />
            <lineBasicMaterial color={0xe11d48} />
          </lineSegments>
          {/* End caps */}
          <mesh position={[-1.6, 0, 1.25]}>
            <boxGeometry args={[0.02, 0.12, 0.02]} />
            <meshBasicMaterial color={0xe11d48} />
          </mesh>
          <mesh position={[1.6, 0, 1.25]}>
            <boxGeometry args={[0.02, 0.12, 0.02]} />
            <meshBasicMaterial color={0xe11d48} />
          </mesh>

          {/* Right depth dimension line (12") */}
          <lineSegments position={[1.75, 0, 0]}>
            <boxGeometry args={[0.01, 0.01, 2.2]} />
            <lineBasicMaterial color={0xe11d48} />
          </lineSegments>
          {/* End caps */}
          <mesh position={[1.75, 0, -1.1]}>
            <boxGeometry args={[0.12, 0.02, 0.02]} />
            <meshBasicMaterial color={0xe11d48} />
          </mesh>
          <mesh position={[1.75, 0, 1.1]}>
            <boxGeometry args={[0.12, 0.02, 0.02]} />
            <meshBasicMaterial color={0xe11d48} />
          </mesh>
        </group>
      )}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  AIRTECH ROTATING MOTOR MODEL                                      */
/* ------------------------------------------------------------------ */
function AirtechRotatingMotor({
  scrollProgress = 0,
  mode = 'blueprint',
  activeHotspotId,
}: {
  scrollProgress: number;
  mode: 'blueprint' | 'photorealistic';
  activeHotspotId?: string | null;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const rotorRef = useRef<THREE.Group>(null);
  const rotorSpinRef = useRef<THREE.Group>(null);
  const frontPlateRef = useRef<THREE.Group>(null);
  const frontBearingRef = useRef<THREE.Group>(null);
  const statorWindingRef = useRef<THREE.Group>(null);
  const rearCoverRef = useRef<THREE.Group>(null);
  const terminalBoxLidRef = useRef<THREE.Group>(null);
  const rearBearingRef = useRef<THREE.Group>(null);
  const baseMountRef = useRef<THREE.Group>(null);

  // Materials pre-created for primitive attachment
  const mats = useMemo(() => {
    return {
      bpLine: new THREE.LineBasicMaterial({ color: 0xe11d48, linewidth: 1.5 }),
      bpBody: new THREE.MeshBasicMaterial({ color: '#fee2e2', transparent: true, opacity: 0.45 }),
      metalBody: new THREE.MeshStandardMaterial({ color: '#2b2e33', metalness: 0.7, roughness: 0.4 }),
      metalChrome: new THREE.MeshStandardMaterial({ color: '#d6d9dc', metalness: 0.9, roughness: 0.2 }),
      metalCopper: new THREE.MeshStandardMaterial({ color: '#b87333', metalness: 0.8, roughness: 0.3 }),
      highlight: new THREE.MeshBasicMaterial({ color: '#e11d48', wireframe: mode === 'blueprint' }),
    };
  }, [mode]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Rotate motor shaft continuously
    if (rotorSpinRef.current) {
      rotorSpinRef.current.rotation.x -= delta * 3;
    }

    // Scroll-driven animation logic
    let targetRotY = Math.PI * 0.25;
    let targetPosX = 0;
    let targetPosY = 0;
    let targetScale = 1.1; 
    let explodeDistance = 0;

    // Stage 1: Text Only (0 - 0.15)
    if (scrollProgress < 0.15) {
      targetPosY = -5; // Hidden below screen
      targetScale = 1.1;
      targetRotY = 0;
    }
    // Stage 2: Motor Appears (0.15 - 0.3)
    else if (scrollProgress >= 0.15 && scrollProgress < 0.3) {
      const p = (scrollProgress - 0.15) / 0.15;
      targetPosY = (1 - p) * -5; // Slide up from -5 to 0
      targetScale = 1.1;
      targetRotY = p * Math.PI; // Rotate 180 degrees while rising
      explodeDistance = 0;
    }
    // Stage 3: Exploded View (0.3 - 0.75)
    else if (scrollProgress >= 0.3 && scrollProgress < 0.75) {
      const p = (scrollProgress - 0.3) / 0.45;
      targetScale = 1.1;
      targetRotY = Math.PI + p * (Math.PI * 2.0); // Full 360 degree rotation
      targetPosX = p * -0.5; // shift to left to keep centered
      explodeDistance = p * 1.5; // Max explosion distance
    }
    // Stage 4: Hold Exploded (0.75 - 1.0)
    else {
      targetScale = 1.1;
      targetRotY = Math.PI * 3.0;
      targetPosX = -0.5;
      explodeDistance = 1.5;
    }

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.08);
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetPosX, 0.08);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetPosY, 0.08);
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.08));

    // Part-by-part explosion
    if (frontPlateRef.current) frontPlateRef.current.position.x = THREE.MathUtils.lerp(frontPlateRef.current.position.x, -explodeDistance * 1.5, 0.08);
    if (frontBearingRef.current) frontBearingRef.current.position.x = THREE.MathUtils.lerp(frontBearingRef.current.position.x, -explodeDistance * 1.1, 0.08);
    if (rotorRef.current) rotorRef.current.position.x = THREE.MathUtils.lerp(rotorRef.current.position.x, -explodeDistance * 0.7, 0.08);
    if (statorWindingRef.current) statorWindingRef.current.position.x = THREE.MathUtils.lerp(statorWindingRef.current.position.x, 0, 0.08); // Stay in housing
    if (rearCoverRef.current) rearCoverRef.current.position.x = THREE.MathUtils.lerp(rearCoverRef.current.position.x, explodeDistance * 0.6, 0.08);
    if (rearBearingRef.current) rearBearingRef.current.position.x = THREE.MathUtils.lerp(rearBearingRef.current.position.x, explodeDistance * 0.3, 0.08);
    if (terminalBoxLidRef.current) terminalBoxLidRef.current.position.y = THREE.MathUtils.lerp(terminalBoxLidRef.current.position.y, 0.08 + explodeDistance * 0.4, 0.08);
    if (baseMountRef.current) baseMountRef.current.position.y = THREE.MathUtils.lerp(baseMountRef.current.position.y, -0.22 - explodeDistance * 0.4, 0.08);
  });

  const isBp = mode === 'blueprint';

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Floor Tray */}
      <IsometricFloorTray mode={mode} scrollProgress={scrollProgress} />

      {/* Main Assembly Group */}
      <group position={[0, 0.25, 0]}>
        
        {/* ============ BASE MOUNTING FEET ============ */}
        <group ref={baseMountRef} position={[0, -0.22, 0]}>
          <mesh>
             <boxGeometry args={[0.8, 0.08, 0.5]} />
             {isBp ? (
               <>
                 <primitive object={mats.bpBody} attach="material" />
                 <lineSegments>
                   <edgesGeometry args={[new THREE.BoxGeometry(0.8, 0.08, 0.5)]} />
                   <primitive object={mats.bpLine} attach="material" />
                 </lineSegments>
               </>
             ) : (
               <primitive object={mats.metalBody} attach="material" />
             )}
          </mesh>
          {/* Base Pillars */}
          <mesh position={[0, 0.1, 0]}>
             <boxGeometry args={[0.6, 0.12, 0.2]} />
             {isBp ? (
               <>
                 <primitive object={mats.bpBody} attach="material" />
                 <lineSegments>
                   <edgesGeometry args={[new THREE.BoxGeometry(0.6, 0.12, 0.2)]} />
                   <primitive object={mats.bpLine} attach="material" />
                 </lineSegments>
               </>
             ) : (
               <primitive object={mats.metalBody} attach="material" />
             )}
          </mesh>
        </group>

        {/* ============ STATOR HOUSING (Fixed part) ============ */}
        <group>
          {/* Main Stator Body (Cylinder) */}
          <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.3, 0.3, 0.7, 32]} />
            {activeHotspotId === 'stator' ? (
              <primitive object={mats.highlight} attach="material" />
            ) : isBp ? (
              <>
                <primitive object={mats.bpBody} attach="material" />
                <lineSegments>
                  <edgesGeometry args={[new THREE.CylinderGeometry(0.3, 0.3, 0.7, 32)]} />
                  <lineBasicMaterial color={0xe11d48} linewidth={1.5} />
                </lineSegments>
              </>
            ) : (
              <primitive object={mats.metalBody} attach="material" />
            )}
          </mesh>

          {/* Cooling Fins (Ribbed Rings on the rear half of the housing) */}
          {[-0.1, 0, 0.1, 0.2, 0.3].map((x, i) => (
             <mesh key={`fin-${i}`} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
               <cylinderGeometry args={[0.32, 0.32, 0.03, 32]} />
               {activeHotspotId === 'cooling' ? (
                 <primitive object={mats.highlight} attach="material" />
               ) : isBp ? (
                 <lineSegments>
                   <edgesGeometry args={[new THREE.CylinderGeometry(0.32, 0.32, 0.03, 32)]} />
                   <lineBasicMaterial color={0xe11d48} />
                 </lineSegments>
               ) : (
                 <primitive object={mats.metalBody} attach="material" />
               )}
             </mesh>
          ))}

          {/* Terminal Box (Top) */}
          <group position={[0, 0.36, 0]}>
             <mesh>
               <boxGeometry args={[0.35, 0.15, 0.25]} />
               {isBp ? (
                 <>
                   <primitive object={mats.bpBody} attach="material" />
                   <lineSegments>
                     <edgesGeometry args={[new THREE.BoxGeometry(0.35, 0.15, 0.25)]} />
                     <lineBasicMaterial color={0xe11d48} linewidth={2} />
                   </lineSegments>
                 </>
               ) : (
                 <primitive object={mats.metalBody} attach="material" />
               )}
             </mesh>
             {/* Terminal Box Lid */}
             <group ref={terminalBoxLidRef} position={[0, 0.08, 0]}>
               <mesh>
                 <boxGeometry args={[0.36, 0.02, 0.26]} />
                 {isBp ? (
                   <lineSegments>
                     <edgesGeometry args={[new THREE.BoxGeometry(0.36, 0.02, 0.26)]} />
                     <primitive object={mats.bpLine} attach="material" />
                   </lineSegments>
                 ) : (
                   <primitive object={mats.metalBody} attach="material" />
                 )}
               </mesh>
             </group>
             {/* Cable Glands */}
             <mesh position={[0.1, 0, 0.15]} rotation={[Math.PI / 2, 0, 0]}>
               <cylinderGeometry args={[0.04, 0.04, 0.06, 12]} />
               <primitive object={isBp ? mats.bpLine : mats.metalChrome} attach="material" />
             </mesh>
             <mesh position={[-0.1, 0, 0.15]} rotation={[Math.PI / 2, 0, 0]}>
               <cylinderGeometry args={[0.04, 0.04, 0.06, 12]} />
               <primitive object={isBp ? mats.bpLine : mats.metalChrome} attach="material" />
             </mesh>
          </group>
        </group>

        {/* ============ INNER STATOR WINDING ============ */}
        <group ref={statorWindingRef}>
          <mesh position={[-0.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.22, 0.22, 0.2, 32]} />
             {activeHotspotId === 'stator' ? (
                <primitive object={mats.highlight} attach="material" />
             ) : isBp ? (
               <lineSegments>
                 <edgesGeometry args={[new THREE.CylinderGeometry(0.22, 0.22, 0.2, 32)]} />
                 <lineBasicMaterial color={0xe11d48} />
               </lineSegments>
             ) : (
               <primitive object={mats.metalCopper} attach="material" />
             )}
          </mesh>
        </group>

        {/* ============ REAR FAN COVER ============ */}
        <group ref={rearCoverRef}>
          <mesh position={[0.4, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
             <cylinderGeometry args={[0.26, 0.3, 0.15, 32]} />
             {activeHotspotId === 'cooling' ? (
                 <primitive object={mats.highlight} attach="material" />
             ) : isBp ? (
               <>
                 <primitive object={mats.bpBody} attach="material" />
                 <lineSegments>
                   <edgesGeometry args={[new THREE.CylinderGeometry(0.26, 0.3, 0.15, 32)]} />
                   <primitive object={mats.bpLine} attach="material" />
                 </lineSegments>
               </>
             ) : (
               <primitive object={mats.metalBody} attach="material" />
             )}
          </mesh>
        </group>

        {/* ============ REAR BEARING HOUSING ============ */}
        <group ref={rearBearingRef}>
          <mesh position={[0.35, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
             <cylinderGeometry args={[0.1, 0.1, 0.05, 24]} />
             {isBp ? (
               <>
                 <primitive object={mats.bpBody} attach="material" />
                 <lineSegments>
                   <edgesGeometry args={[new THREE.CylinderGeometry(0.1, 0.1, 0.05, 24)]} />
                   <lineBasicMaterial color={0xe11d48} linewidth={2} />
                 </lineSegments>
               </>
             ) : (
               <primitive object={mats.metalChrome} attach="material" />
             )}
          </mesh>
        </group>

        {/* ============ ROTOR ASSEMBLY ============ */}
        <group ref={rotorRef}>
          <group ref={rotorSpinRef}>
            {/* Main Shaft */}
            <mesh position={[-0.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
               <cylinderGeometry args={[0.04, 0.04, 1.2, 16]} />
               {isBp ? (
                 <>
                   <primitive object={mats.bpBody} attach="material" />
                   <lineSegments>
                     <edgesGeometry args={[new THREE.CylinderGeometry(0.04, 0.04, 1.2, 16)]} />
                     <primitive object={mats.bpLine} attach="material" />
                   </lineSegments>
                 </>
               ) : (
                 <primitive object={mats.metalChrome} attach="material" />
               )}
            </mesh>

            {/* Shaft Key */}
            <mesh position={[-0.7, 0.04, 0]}>
               <boxGeometry args={[0.15, 0.02, 0.02]} />
               <primitive object={isBp ? mats.bpLine : mats.metalChrome} attach="material" />
            </mesh>

            {/* Rotor Lamination Core (Inside Stator) */}
            <mesh position={[-0.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
               <cylinderGeometry args={[0.18, 0.18, 0.4, 32]} />
               {activeHotspotId === 'rotor' ? (
                  <primitive object={mats.highlight} attach="material" />
               ) : isBp ? (
                 <>
                   <primitive object={mats.bpBody} attach="material" />
                   <lineSegments>
                     <edgesGeometry args={[new THREE.CylinderGeometry(0.18, 0.18, 0.4, 32)]} />
                     <lineBasicMaterial color={0xe11d48} linewidth={1.5} />
                   </lineSegments>
                 </>
               ) : (
                 <primitive object={mats.metalChrome} attach="material" />
               )}
            </mesh>
            
            {/* Rotor Slots (Visual detail) */}
            {Array.from({ length: 12 }).map((_, i) => (
              <mesh key={`slot-${i}`} position={[-0.1, 0, 0]} rotation={[((Math.PI * 2) / 12) * i, 0, 0]}>
                 <boxGeometry args={[0.4, 0.36, 0.01]} />
                 {isBp && (
                   <lineSegments>
                     <edgesGeometry args={[new THREE.BoxGeometry(0.4, 0.36, 0.01)]} />
                     <lineBasicMaterial color={0xe11d48} opacity={0.3} transparent />
                   </lineSegments>
                 )}
              </mesh>
            ))}
          </group>
        </group>

        {/* ============ FRONT BEARING HOUSING ============ */}
        <group ref={frontBearingRef}>
          <mesh position={[-0.43, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
             <cylinderGeometry args={[0.12, 0.12, 0.06, 24]} />
             {activeHotspotId === 'bearing' ? (
                <primitive object={mats.highlight} attach="material" />
             ) : isBp ? (
               <>
                 <primitive object={mats.bpBody} attach="material" />
                 <lineSegments>
                   <edgesGeometry args={[new THREE.CylinderGeometry(0.12, 0.12, 0.06, 24)]} />
                   <lineBasicMaterial color={0xe11d48} linewidth={2} />
                 </lineSegments>
               </>
             ) : (
               <primitive object={mats.metalChrome} attach="material" />
             )}
          </mesh>
        </group>

        {/* ============ FRONT END PLATE ============ */}
        <group ref={frontPlateRef}>
          <mesh position={[-0.38, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
             <cylinderGeometry args={[0.3, 0.3, 0.06, 32]} />
             {isBp ? (
               <>
                 <primitive object={mats.bpBody} attach="material" />
                 <lineSegments>
                   <edgesGeometry args={[new THREE.CylinderGeometry(0.3, 0.3, 0.06, 32)]} />
                   <primitive object={mats.bpLine} attach="material" />
                 </lineSegments>
               </>
             ) : (
               <primitive object={mats.metalBody} attach="material" />
             )}
          </mesh>
        </group>

      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  CANVAS CONTAINER & OrbitControls                                  */
/* ------------------------------------------------------------------ */
export default function AirtechMotor3DViewer({
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

        <AirtechRotatingMotor
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
