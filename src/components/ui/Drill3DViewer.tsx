import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { useRef, useMemo, useState, Suspense } from 'react';
import * as THREE from 'three';

/* ------------------------------------------------------------------ */
/*  TEXTURE FACTORIES                                                   */
/* ------------------------------------------------------------------ */

// Dark gunmetal cast-iron body: casting grain + oil streaks + light wear scratches
function useGunmetalCastTexture() {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 320;
    canvas.height = 320;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = '#9a9ca0'; // neutral mid-tone base — tints the material color, doesn't replace it
    ctx.fillRect(0, 0, 320, 320);

    // casting pores
    for (let i = 0; i < 4200; i++) {
      const x = Math.random() * 320;
      const y = Math.random() * 320;
      const r = Math.random() * 1.4 + 0.3;
      const shade = 140 + Math.random() * 40 - 20;
      ctx.fillStyle = `rgba(${shade},${shade},${shade + 2},0.75)`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // brushed-machining streaks, horizontal
    ctx.globalAlpha = 0.06;
    for (let i = 0; i < 60; i++) {
      ctx.strokeStyle = '#e8e8ea';
      ctx.lineWidth = Math.random() * 0.8 + 0.2;
      const y = Math.random() * 320;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(320, y + (Math.random() - 0.5) * 6);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // oil stains — dripping streaks
    for (let i = 0; i < 10; i++) {
      const x = Math.random() * 320;
      const y = Math.random() * 180;
      const len = 60 + Math.random() * 110;
      const grad = ctx.createLinearGradient(x, y, x + (Math.random() - 0.5) * 14, y + len);
      grad.addColorStop(0, 'rgba(20,16,10,0.32)');
      grad.addColorStop(1, 'rgba(20,16,10,0)');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 3 + Math.random() * 5;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + (Math.random() - 0.5) * 14, y + len);
      ctx.stroke();
    }

    // a few darker grime blotches
    for (let i = 0; i < 16; i++) {
      const x = Math.random() * 320;
      const y = Math.random() * 320;
      const r = Math.random() * 14 + 6;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, 'rgba(15,12,8,0.28)');
      grad.addColorStop(1, 'rgba(15,12,8,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(3, 3);
    return tex;
  }, []);
}

function usePlateTexture(kind: 'nameplate' | 'warning') {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 220;
    const ctx = canvas.getContext('2d')!;

    if (kind === 'nameplate') {
      const grad = ctx.createLinearGradient(0, 0, 0, 220);
      grad.addColorStop(0, '#d7dadd');
      grad.addColorStop(1, '#aeb3b8');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 220);
      ctx.strokeStyle = '#5a5f63';
      ctx.lineWidth = 5;
      ctx.strokeRect(8, 8, 496, 204);

      ctx.textAlign = 'center';
      ctx.fillStyle = '#22262b';
      ctx.font = '700 68px "Arial Narrow", sans-serif';
      ctx.fillText('AIRTECH', 256, 100);
      ctx.font = '500 26px "Arial Narrow", sans-serif';
      ctx.fillText('PNEUMATIC ROCK DRILL', 256, 140);
      ctx.font = '400 20px "Arial Narrow", sans-serif';
      ctx.fillText('MODEL AT-42R  •  MADE IN INDIA', 256, 175);
    } else {
      // hazard border
      const stripe = 26;
      for (let x = -220; x < 512 + 220; x += stripe * 2) {
        ctx.fillStyle = '#f2b705';
        ctx.fillRect(0, 0, 512, 220);
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, 512, 220);
        ctx.clip();
        ctx.fillStyle = '#191919';
        ctx.save();
        ctx.translate(x, 0);
        ctx.rotate((35 * Math.PI) / 180);
        ctx.fillRect(-40, -300, stripe, 900);
        ctx.restore();
        ctx.restore();
      }
      // inset panel
      ctx.fillStyle = '#141414';
      ctx.fillRect(30, 30, 452, 160);
      ctx.textAlign = 'center';
      ctx.fillStyle = '#f2b705';
      ctx.font = '700 40px Arial, sans-serif';
      ctx.fillText('⚠ CAUTION', 256, 82);
      ctx.fillStyle = '#e8e8e8';
      ctx.font = '500 22px Arial, sans-serif';
      ctx.fillText('HIGH PRESSURE COMPRESSED AIR', 256, 118);
      ctx.font = '400 18px Arial, sans-serif';
      ctx.fillText('Disconnect air supply before servicing', 256, 148);
    }

    return new THREE.CanvasTexture(canvas);
  }, [kind]);
}

/* ------------------------------------------------------------------ */
/*  EXHAUST AIR PARTICLES — a light puff from the front vents           */
/* ------------------------------------------------------------------ */

function ExhaustPuff({ origin = [-0.62, 0.1, 0] as [number, number, number], count = 40 }) {
  const ref = useRef<THREE.Points | null>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = origin[0] + (Math.random() - 0.5) * 0.1;
      arr[i * 3 + 1] = origin[1] + Math.random() * 0.3;
      arr[i * 3 + 2] = origin[2] + (Math.random() - 0.5) * 0.3;
    }
    return arr;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    const t = state.clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      pos[idx] -= 0.012;
      pos[idx + 1] += 0.006 * Math.sin(t + i);
      if (pos[idx] < origin[0] - 0.9) {
        pos[idx] = origin[0] + (Math.random() - 0.5) * 0.1;
        pos[idx + 1] = origin[1] + Math.random() * 0.3;
        pos[idx + 2] = origin[2] + (Math.random() - 0.5) * 0.3;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#eef4ff" size={0.045} transparent opacity={0.18} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN ROCK DRILL MODEL                                               */
/* ------------------------------------------------------------------ */

function RockDrillModel() {
  const chuckRef = useRef<THREE.Group | null>(null);

  const gunmetalTex = useGunmetalCastTexture();
  const nameplateTex = usePlateTexture('nameplate');
  const warningTex = usePlateTexture('warning');

  useFrame((state) => {
    if (chuckRef.current) chuckRef.current.rotation.x = state.clock.getElapsedTime() * 2.2;
  });

  /* ---- PBR material set ---- */
  const castIronMat = (
    <meshStandardMaterial color="#33363b" metalness={0.55} roughness={0.6} map={gunmetalTex} bumpMap={gunmetalTex} bumpScale={0.006} />
  );
  const gunmetalMat = (
    <meshStandardMaterial color="#2b2e33" metalness={0.65} roughness={0.5} map={gunmetalTex} bumpMap={gunmetalTex} bumpScale={0.005} />
  );
  const brushedSteelMat = <meshStandardMaterial color="#c3c7cc" metalness={0.88} roughness={0.28} />;
  const machinedShaftMat = <meshStandardMaterial color="#d6d9dc" metalness={0.92} roughness={0.18} />;
  const zincBoltMat = <meshStandardMaterial color="#e6e3d8" metalness={0.88} roughness={0.22} />;
  const blackRubberMat = <meshStandardMaterial color="#161616" roughness={0.92} metalness={0} />;
  const nameplateMat = <meshStandardMaterial map={nameplateTex} metalness={0.35} roughness={0.45} />;
  const warningMat = <meshStandardMaterial map={warningTex} metalness={0.1} roughness={0.6} />;

  const renderHexBoltsCircle = (x: number, radius: number, count: number, size = 0.028) => {
    const bolts = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const y = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      bolts.push(
        <group key={i} position={[x, y, z]} rotation={[0, 0, angle]}>
          <mesh position={[0, 0, -0.01]}>
            <cylinderGeometry args={[size * 1.3, size * 1.3, 0.01, 16]} />
            {brushedSteelMat}
          </mesh>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[size, size, 0.032, 6]} />
            {zincBoltMat}
          </mesh>
        </group>
      );
    }
    return bolts;
  };

  return (
    <group position={[0, 0.1, 0]}>
      {/* ============ 1. DRILL STEEL + CHUCK — rotates ============ */}
      <group ref={chuckRef}>
        {/* hex drill steel shank, protruding front */}
        <mesh position={[-1.02, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.045, 0.045, 0.5, 6]} />
          {machinedShaftMat}
        </mesh>
        {/* chuck sleeve with knurled grip rings */}
        <mesh position={[-0.78, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
          <cylinderGeometry args={[0.13, 0.15, 0.22, 24]} />
          {brushedSteelMat}
        </mesh>
        {[-0.86, -0.82, -0.78, -0.74, -0.7].map((x, i) => (
          <mesh key={i} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.135, 0.006, 8, 28]} />
            <meshStandardMaterial color="#9aa0a6" metalness={0.85} roughness={0.35} />
          </mesh>
        ))}
        {/* threaded retainer collar */}
        <mesh position={[-0.63, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
          <cylinderGeometry args={[0.16, 0.16, 0.08, 24]} />
          {brushedSteelMat}
        </mesh>
      </group>

      {/* ============ 2. FRONT NOSE FLANGE — static, bolts to main body ============ */}
      <mesh position={[-0.56, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.07, 28]} />
        {gunmetalMat}
      </mesh>
      {renderHexBoltsCircle(-0.56, 0.17, 6)}

      {/* exhaust vent ring just behind the nose flange */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const y = Math.cos(angle) * 0.24;
        const z = Math.sin(angle) * 0.24;
        return (
          <mesh key={i} position={[-0.46, y, z]} rotation={[0, 0, angle]}>
            <cylinderGeometry args={[0.014, 0.014, 0.05, 10]} />
            <meshStandardMaterial color="#0c0d0e" roughness={0.9} />
          </mesh>
        );
      })}

      {/* ============ 3. MAIN CAST-IRON CYLINDER BODY ============ */}
      <mesh position={[0.05, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.26, 0.26, 1.1, 40]} />
        {castIronMat}
      </mesh>

      {/* subtle machined ridge bands along the body */}
      {[-0.35, 0.05, 0.42].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.265, 0.265, 0.02, 40]} />
          {gunmetalMat}
        </mesh>
      ))}

      {/* AIRTECH nameplate, recessed */}
      <mesh position={[-0.12, 0, 0.262]}>
        <boxGeometry args={[0.4, 0.17, 0.01]} />
        <meshStandardMaterial color="#101112" roughness={0.6} metalness={0.4} />
      </mesh>
      <mesh position={[-0.12, 0, 0.268]}>
        <planeGeometry args={[0.36, 0.14]} />
        {nameplateMat}
      </mesh>

      {/* industrial warning plate, opposite side */}
      <mesh position={[0.22, 0, -0.262]} rotation={[0, Math.PI, 0]}>
        <boxGeometry args={[0.34, 0.15, 0.008]} />
        <meshStandardMaterial color="#0c0c0c" roughness={0.7} />
      </mesh>
      <mesh position={[0.22, 0, -0.268]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[0.3, 0.12]} />
        {warningMat}
      </mesh>

      {/* small circular inspection cover, bolted, top-front of body */}
      <group position={[-0.28, 0.24, 0]} rotation={[Math.PI / 2 + 0.5, 0, 0]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.09, 0.09, 0.02, 24]} />
          {brushedSteelMat}
        </mesh>
        {renderHexBoltsCircle(0, 0.065, 4, 0.014)}
      </group>

      {/* ============ 4. VALVE HOUSING — mounted on top-center ============ */}
      <group position={[0.05, 0.32, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.34, 0.16, 0.24]} />
          {gunmetalMat}
        </mesh>
        {/* rounded dome cap */}
        <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.1, 0.14, 0.06, 24]} />
          {gunmetalMat}
        </mesh>
        {/* control lever */}
        <group position={[0.1, 0.14, 0]} rotation={[0, 0, -0.3]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.012, 0.012, 0.14, 12]} />
            {brushedSteelMat}
          </mesh>
          <mesh position={[0, 0.075, 0]}>
            <sphereGeometry args={[0.02, 12, 12]} />
            {blackRubberMat}
          </mesh>
        </group>
        {/* mounting bolts along the base of the valve housing */}
        {[-0.13, 0.13].map((x) =>
          [-0.09, 0.09].map((z) => (
            <group key={`${x}-${z}`} position={[x, -0.09, z]}>
              <mesh>
                <cylinderGeometry args={[0.016, 0.016, 0.02, 6]} />
                {zincBoltMat}
              </mesh>
            </group>
          ))
        )}
      </group>

      {/* ============ 5. SIDE HANDLE — bent steel tube, clamp-mounted ============ */}
      <group position={[0.02, -0.05, 0]}>
        {/* clamp brackets */}
        <mesh position={[-0.18, -0.26, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.08, 0.05, 0.14]} />
          {brushedSteelMat}
        </mesh>
        <mesh position={[0.28, -0.26, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.08, 0.05, 0.14]} />
          {brushedSteelMat}
        </mesh>
        {/* D-shaped handle bar */}
        <mesh position={[0.05, -0.42, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <torusGeometry args={[0.19, 0.018, 12, 24, Math.PI]} />
          {machinedShaftMat}
        </mesh>
        <mesh position={[-0.18, -0.34, 0]} rotation={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.018, 0.018, 0.16, 16]} />
          {machinedShaftMat}
        </mesh>
        <mesh position={[0.28, -0.34, 0]} rotation={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.018, 0.018, 0.16, 16]} />
          {machinedShaftMat}
        </mesh>
      </group>

      {/* ============ 6. REAR FLANGE + PNEUMATIC AIR INLET ============ */}
      <mesh position={[0.63, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.24, 0.24, 0.06, 32]} />
        {gunmetalMat}
      </mesh>
      {renderHexBoltsCircle(0.63, 0.18, 6)}

      <mesh position={[0.72, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.14, 0.16, 0.12, 24]} />
        {brushedSteelMat}
      </mesh>

      {/* male threaded hose barb */}
      <mesh position={[0.83, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.1, 20]} />
        {brushedSteelMat}
      </mesh>
      {[0, 0.02, 0.04].map((o, i) => (
        <mesh key={i} position={[0.79 + o, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.1, 0.006, 8, 24]} />
          {brushedSteelMat}
        </mesh>
      ))}

      {/* black rubber air hose connector stub */}
      <mesh position={[0.98, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.09, 0.11, 0.24, 24]} />
        {blackRubberMat}
      </mesh>
      {/* hose clamp rings */}
      {[0.9, 1.06].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.1, 0.012, 8, 24]} />
          {zincBoltMat}
        </mesh>
      ))}

      {/* weld bead detail where the rear flange meets the body */}
      <mesh position={[0.58, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.255, 0.012, 8, 40]} />
        <meshStandardMaterial color="#25272b" metalness={0.5} roughness={0.75} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  VIEWER SHELL                                                        */
/* ------------------------------------------------------------------ */

export default function RockDrill3DViewer() {
  const [autoRotate, setAutoRotate] = useState(true);

  return (
    <div className="w-full h-full relative aspect-square md:aspect-auto bg-[#0b0c0d]">
      <div className="absolute inset-0 bg-radial from-brand-red/8 to-transparent pointer-events-none rounded-full blur-3xl" />

      <Canvas shadows gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[1.8, 1.15, 1.9]} fov={32} />
        <fog attach="fog" args={['#0b0c0d', 4, 9]} />

        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 7, 3]} intensity={2.4} castShadow shadow-mapSize={[2048, 2048]} shadow-bias={-0.0001} />
        <directionalLight position={[-5, -2, -5]} intensity={0.45} color="#dbe6ff" />
        <directionalLight position={[-6, 5, -4]} intensity={1.6} color="#ffffff" />
        <spotLight position={[0, 2.4, 1.6]} angle={0.5} penumbra={0.6} intensity={0.9} color="#fff3e2" />
        <pointLight position={[0, -1.2, 0.3]} intensity={1.1} color="#c8102e" />

        <Suspense fallback={null}>
          <group position={[0, 0.15, 0]} rotation={[0.05, 0.6, 0]} scale={1.25}>
            <RockDrillModel />
            <ExhaustPuff />
          </group>

          <ContactShadows position={[0, -0.32, 0]} opacity={0.6} scale={6} blur={2} far={1.5} />
          <Environment preset="studio" />
        </Suspense>

        <OrbitControls
          enableZoom
          autoRotate={autoRotate}
          autoRotateSpeed={1.2}
          minDistance={0.9}
          maxDistance={4.5}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 1.6}
        />
      </Canvas>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-bordergray/60 bg-white/80 backdrop-blur-md shadow-sm pointer-events-none select-none">
          <span className="w-2 h-2 rounded-full bg-brand-red animate-ping" />
          <span className="font-heading text-[10px] tracking-wider uppercase text-brand-graphite font-semibold">Drag to Rotate 360°</span>
        </div>
        <button
          onClick={() => setAutoRotate((a) => !a)}
          className="px-3 py-1.5 rounded-full border border-brand-bordergray/60 bg-white/90 backdrop-blur-md shadow-sm text-[10px] font-heading tracking-wider uppercase text-brand-graphite font-semibold hover:bg-white transition-colors"
        >
          {autoRotate ? 'Stop Spin' : 'Auto Spin'}
        </button>
      </div>
    </div>
  );
}
