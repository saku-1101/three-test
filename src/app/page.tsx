"use client";
import { useRef } from "react";
import { PlayGround } from "./components/templates/PlayGround";
import { RapierRigidBody } from "@react-three/rapier";

export default function Home() {
  const ballRef = useRef<RapierRigidBody>(null);

  return (
    <>
      <button
        onClick={() => {
          if (ballRef.current) {
            ballRef.current.setTranslation({ x: 0, y: 5, z: 0 }, true);
            ballRef.current.setLinvel({ x: 0, y: 10, z: 0 }, true);
          }
        }}
        style={{ padding: "0.5rem", margin: "0.5rem" }}
      >
        Reset
      </button>
      <PlayGround ballRef={ballRef} />
    </>
  );
}
