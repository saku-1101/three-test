import { Floor } from "../atoms/Floor";
import {
  RigidBody,
  RapierRigidBody,
  CuboidCollider,
} from "@react-three/rapier";
import { Ball } from "../atoms/Ball";
import { RefObject, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

export const Objects = (props: { ballRef: RefObject<RapierRigidBody> }) => {
  const { viewport } = useThree();
  const rigidRef = useRef<RapierRigidBody>(null);
  // MEMO: Better to use local variable instead of passing ref as a props.
  // const ballRef = useRef<RapierRigidBody>(null);
  useFrame((state) => {
    if (rigidRef.current) {
      rigidRef.current.rotation().x = THREE.MathUtils.lerp(
        rigidRef.current.rotation().x,
        0,
        0.2
      );
      const currentRotationX = THREE.MathUtils.lerp(
        rigidRef.current.rotation().x,
        0,
        0.2
      );
      const currentRotationY = THREE.MathUtils.lerp(
        rigidRef.current.rotation().y,
        (state.mouse.x * Math.PI) / 5,
        0.2
      );
      rigidRef.current.rotation().y = currentRotationY;
      rigidRef.current.setTranslation(
        { x: state.mouse.x * 10, y: state.mouse.y * 5, z: 0 },
        true
      );
      rigidRef.current.setRotation(
        {
          x: currentRotationY, // x回転軸
          y: currentRotationX, // y回転軸
          z: 0, // z回転軸
          w: 1, // 回転角
        },
        true
      );
    } else {
      return;
    }
  });

  const onCollisionEnter = () => {
    if (props.ballRef.current) {
      return (
        props.ballRef.current.setTranslation({ x: 0, y: 5, z: 0 }, true),
        props.ballRef.current.setLinvel({ x: 0, y: 10, z: 0 }, true)
      );
    }
    return;
  };

  return (
    <>
      <RigidBody ref={props.ballRef} position={[0, 5, 0]} colliders="ball">
        <Ball />
      </RigidBody>
      {/* <RigidBody /> component is used to add a mesh into the physics world. Automatically generate Colliders based on the shape of the wrapped meshes */}
      {/* when we first run, the object inside will fall down because the gravity affects to it. */}
      <RigidBody
        ref={rigidRef}
        type="kinematicVelocity"
        position={[0, -10, 0]}
        restitution={2}
        friction={2}
      >
        <Floor />
      </RigidBody>
      <RigidBody
        type="fixed"
        colliders={false}
        position={[0, -viewport.height, 0]}
        restitution={2.1}
        onCollisionEnter={onCollisionEnter}
      >
        <CuboidCollider args={[viewport.width, 2, viewport.width]} />
      </RigidBody>
    </>
  );
};
