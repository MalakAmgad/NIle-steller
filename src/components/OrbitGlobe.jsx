import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

function Earth(){
  const ref = useRef();
  useFrame((_,d)=> { if(ref.current) ref.current.rotation.y += d*0.05; });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.2, 64, 64]} />
      <meshStandardMaterial color="#3b82f6" roughness={0.7} metalness={0.1} />
    </mesh>
  );
}

function Marker({ alt=400, inc=51.6, idx=0 }){
  // place a small satellite ring using the inclination
  const r = 1.2 + (alt/6371)*0.8; // scale alt modestly
  const group = useRef();
  useFrame((_,d)=>{ if(group.current) group.current.rotation.y += d * (0.2 + idx*0.02); });
  return (
    <group ref={group} rotation={[inc*Math.PI/180, 0, 0]}>
      <mesh position={[r,0,0]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial color="#93c5fd" />
      </mesh>
      <mesh rotation={[0,0,0]}>
        <torusGeometry args={[r, 0.002, 8, 128]} />
        <meshBasicMaterial color="#60a5fa" />
      </mesh>
    </group>
  );
}

export default function OrbitGlobe({ items=[] }){
  return (
    <div className="h-80 rounded-xl border border-slate-800 overflow-hidden bg-slate-900/40">
      <Canvas camera={{ position:[0,1.5,4], fov:50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3,3,2]} intensity={1.1} />
        <Earth />
        {items.slice(0,12).map((it, i)=> (
          <Marker key={it.id} alt={it.orbitAltKm} inc={it.inclination || 51.6} idx={i} />
        ))}
        <Stars radius={40} depth={20} count={3000} factor={2} fade />
        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  );
}
