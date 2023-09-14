"use client";
import { Floor } from "./components/Floor";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { Ball } from "./components/Ball";
import { Draggable } from "./utils/Draggable";

export default function Home() {
  return (
    <>
      <RigidBody position={[0, 5, 0]} colliders="ball">
        <Ball />
      </RigidBody>
      {/* <RigidBody
        ref={rigidRef}
        type="kinematicVelocity"
        position={[0, 0, 0]}
        restitution={2}
        friction={0}
      > */}
      {/* <RigidBody /> component is used to add a mesh into the physics world. Automatically generate Colliders based on the shape of the wrapped meshes */}
      {/* when we first run, the object inside will fall down because the gravity affects to it. */}
      {/* <Floor />
      </RigidBody> */}
      <Draggable>
        <CuboidCollider
          position={[0, 0, 0]}
          args={[20, 0.5, 20]}
          restitution={2}
        />
      </Draggable>
    </>
  );
}
