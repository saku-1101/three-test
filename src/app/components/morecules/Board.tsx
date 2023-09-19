import * as THREE from "three";
import { Plane, useMask } from "@react-three/drei";
import { useState } from "react";
import { RigidBody, Vector3Object } from "@react-three/rapier";
import { Masks } from "./Masks";

export function Board() {
  const [positions, setPositions] = useState<Array<Vector3Object>>([
    { x: 0, y: 0, z: 0 },
  ]);
  const stencil = useMask(1, true);
  // 画像ローディング
  const loader = new THREE.TextureLoader();
  const codeTexture = loader.load("code.svg");
  const coverTexture = loader.load("cover.svg");

  return (
    <>
      <RigidBody
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
          const collisionPosition: Vector3Object =
            manifold.solverContactPoint(0);
          setPositions((prev: Vector3Object[]) => [...prev, collisionPosition]);

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
        <Masks collisionPositions={positions} />
        <Plane position={[0, 0, -5.5]} args={[20, 10]}>
          <meshStandardMaterial map={codeTexture} />
        </Plane>
        <Plane position={[0, 0, -5]} args={[20, 10]}>
          <meshStandardMaterial map={coverTexture} {...stencil} />
        </Plane>
      </RigidBody>
    </>
  );
}
