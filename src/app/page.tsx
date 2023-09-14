"use client";
import { Floor } from "./components/Floor";
import { RigidBody } from "@react-three/rapier";
import { Ball } from "./components/Ball";

export default function Home() {
  return (
    <>
      <RigidBody position={[0, 5, 0]} colliders="ball">
        <Ball />
      </RigidBody>
      <RigidBody type="fixed" position={[0, 0, 0]} restitution={2}>
        {/* <RigidBody /> component is used to add a mesh into the physics world. Automatically generate Colliders based on the shape of the wrapped meshes */}
        {/* when we first run, the object inside will fall down because the gravity affects to it. */}
        <Floor />
      </RigidBody>
    </>
  );
}
