'use client'
import { Box, Torus } from "@react-three/drei";
import { Box as CustomBox } from "./components/Box";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import { Suspense } from "react";

export default function Home() {
  return (
    <Canvas>
      <Suspense>
        <Physics debug>
          <RigidBody colliders={"hull"} restitution={2}>
            <CustomBox />
          </RigidBody>
          <CuboidCollider position={[0, -2, 0]} args={[20, 0.5, 20]} />
        </Physics>
      </Suspense>
    </Canvas>
  );
};
