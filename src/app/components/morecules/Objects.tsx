import { Floor } from "../atoms/Floor";
import { Board } from "../atoms/Board";
import { RigidBody, RapierRigidBody } from "@react-three/rapier";
import { Vector3Object } from "@react-three/rapier";
import { Ball } from "../atoms/Ball";
import { RefObject, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export const Objects = (props: { ballRef: RefObject<RapierRigidBody> }) => {
  const [position, setPosition] = useState<Vector3Object>({ x: 0, y: 0, z: 0 });
  const rigidRef = useRef<RapierRigidBody>(null);

  // useFrame((state) => {
  //   if (rigidRef.current) {
  //     // ジャイロセンサーより3軸方向を取得し，移動させる
  //     // 移動距離
  //     const xTranslation = state.mouse.x * Math.sqrt(5 * 5 + 12 * 12);
  //     const yTranslation = state.mouse.y * 5;
  //     const zTranslation = Math.sqrt(
  //       xTranslation * xTranslation + yTranslation * yTranslation
  //     );
  //     rigidRef.current.setTranslation(
  //       {
  //         x: xTranslation, // because the camera is away Math.sqrt(5 * 5 + 12 * 12) from the object
  //         y: yTranslation, // because the camera is away 5 from the object
  //         z: 0,
  //       },
  //       true
  //     );

  //     // ジャイロセンサーより2点の３軸方向の値を取得することでquaternionを計算することで回転させる
  //     // 二次元上でのex
  //     const vFrom = new THREE.Vector3(
  //       rigidRef.current.translation().x,
  //       rigidRef.current.translation().y,
  //       rigidRef.current.translation().z
  //     );
  //     // 二次元上でのex
  //     const vTo = new THREE.Vector3(
  //       rigidRef.current.translation().x + xTranslation,
  //       rigidRef.current.translation().y + yTranslation,
  //       rigidRef.current.translation().z - zTranslation
  //     );

  //     rigidRef.current.setRotation(
  //       new THREE.Quaternion().setFromUnitVectors(vFrom, vTo),
  //       true
  //     );
  //   } else {
  //     return;
  //   }
  // });

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
          // set collided position
          const collisionPosition = manifold.solverContactPoint(0);
          setPosition(collisionPosition);

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
        <Board collisionPosition={position} />
      </RigidBody>

      <RigidBody
        ref={rigidRef}
        type="kinematicVelocity"
        position={[0, 0, 0]}
        restitution={3}
        colliders={"cuboid"}
        name="Floor"
      >
        <Floor />
      </RigidBody>
    </>
  );
};
