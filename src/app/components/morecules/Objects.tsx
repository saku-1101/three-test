import { Floor } from "../atoms/Floor";
import { Board } from "../atoms/Board";
import {
  RigidBody,
  RapierRigidBody,
  // CuboidCollider,
} from "@react-three/rapier";
import { Ball } from "../atoms/Ball";
import { RefObject, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

export const Objects = (props: { ballRef: RefObject<RapierRigidBody> }) => {
  const { viewport } = useThree();
  const [viewport_x, viewport_y] = [
    (2.0 / viewport.width) * 0.5 * viewport.width,
    (2.0 / viewport.height) * 0.5 * viewport.height,
  ];
  const rigidRef = useRef<RapierRigidBody>(null);
  // MEMO: Better to use local variable instead of passing ref as a props.
  // const ballRef = useRef<RapierRigidBody>(null);
  useFrame((state) => {
    if (rigidRef.current) {
      // const newRotationX = THREE.MathUtils.lerp(
      //   rigidRef.current.rotation().x, // current value
      //   state.mouse.x, // target value: the mouse position
      //   0.2 // speed　= 加速度x * x移動距離
      // );
      // const newRotationY = THREE.MathUtils.lerp(
      //   rigidRef.current.rotation().y,
      //   state.mouse.y,
      //   0.2
      // );
      // rigidRef.current.rotation().x = newRotationX;
      // rigidRef.current.rotation().y = newRotationY;
      /* Here is the explanation for the code above:
      1. You are using the lerp function to calculate the new rotation value.
      2. The lerp function takes three arguments.
      3. The first argument is the current value. 
      4. The second argument is the target value, which is the mouse position.
      5. The third argument is the coefficient. The coefficient is a value that determines how fast the rotation value will change.
      6. The lerp function returns a new value, which is assigned to the rotation variable. */

      // ジャイロセンサーより3軸方向を取得し，移動させる
      // 移動距離
      const xTranslation = state.mouse.x * Math.sqrt(5 * 5 + 12 * 12);
      const yTranslation = state.mouse.y * 5;
      const zTranslation = Math.sqrt(
        xTranslation * xTranslation + yTranslation * yTranslation
      );
      rigidRef.current.setTranslation(
        {
          x: xTranslation, // because the camera is away Math.sqrt(5 * 5 + 12 * 12) from the object
          y: yTranslation, // because the camera is away 5 from the object
          z: 0,
        },
        true
      );

      // ジャイロセンサーより2点の３軸方向の値を取得することでquaternionを計算することで回転させる
      // 二次元上でのex
      const vFrom = new THREE.Vector3(
        rigidRef.current.translation().x,
        rigidRef.current.translation().y,
        rigidRef.current.translation().z
      );
      // 二次元上でのex
      const vTo = new THREE.Vector3(
        rigidRef.current.translation().x + xTranslation,
        rigidRef.current.translation().y + yTranslation,
        rigidRef.current.translation().z - zTranslation
      );

      rigidRef.current.setRotation(
        new THREE.Quaternion().setFromUnitVectors(vFrom, vTo),
        true
      );
    } else {
      return;
    }
  });

  return (
    <>
      <RigidBody
        ref={props.ballRef}
        position={[0, 5, 0]}
        colliders="ball"
        name="Ball"
      >
        <Ball />
      </RigidBody>
      {/* <RigidBody /> component is used to add a mesh into the physics world. Automatically generate Colliders based on the shape of the wrapped meshes */}
      {/* when we first run, the object inside will fall down because the gravity affects to it. */}

      <RigidBody
        ref={rigidRef}
        type="kinematicVelocity"
        position={[0, 0, -10]}
        restitution={2}
        colliders={"cuboid"}
        name="Board"
        onCollisionEnter={({ manifold, target, other }) => {
          console.log(
            "Collision at world position ",
            manifold.solverContactPoint(0) // collided point
          );

          if (other.rigidBodyObject && target.rigidBodyObject) {
            console.log(
              // this rigid body's Object3D
              target.rigidBodyObject.name,
              " collided with ",
              // the other rigid body's Object3D
              other.rigidBodyObject.name
            );
          }
        }}
      >
        <Board />
      </RigidBody>

      <RigidBody
        ref={rigidRef}
        type="kinematicVelocity"
        position={[0, -10, 0]}
        restitution={2}
        colliders={"cuboid"}
        name="Floor"
      >
        <Floor />
      </RigidBody>
    </>
  );
};
