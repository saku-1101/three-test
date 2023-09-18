"use client";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense, useState, useEffect } from "react";
import { OrbitControls } from "@react-three/drei";
import { Objects } from "../morecules/Objects";
import { RapierRigidBody } from "@react-three/rapier";
import { RefObject } from "react";

export const PlayGround = (props: { ballRef: RefObject<RapierRigidBody> }) => {
  const [cameraParams, setCameraParams] = useState({
    windowHeight: 0,
    windowWidth: 0,
  });
  useEffect(() => {
    setCameraParams({
      windowHeight: innerHeight,
      windowWidth: innerWidth,
    });
  }, []);
  const distance = 800;
  const FOV =
    (2 * Math.atan(cameraParams.windowHeight / (2 * distance)) * 180) / Math.PI;

  return (
    <Canvas
      shadows
      gl={{ localClippingEnabled: true }}
      camera={{
        position: [0, 5, 12],
        fov: FOV,
        aspect: cameraParams.windowWidth / cameraParams.windowHeight,
      }}
      style={{ width: "100vw", height: "100vh" }}
    >
      <ambientLight />
      <pointLight position={[0, 0, 0]} />
      {/* Control the movement of the camera with mouse interaction */}
      <OrbitControls attach="orbitControls" />
      {/* <color attach="background" args={["white"]} /> */}
      {/* To make sure all the required engines are loaded before te calculation */}
      <Suspense>
        {/* the root component of your physics world. Needs to be wrapped in <Suspense /> */}
        <Physics
          debug
          interpolate={true}
          maxVelocityIterations={1}
          maxVelocityFrictionIterations={2}
          gravity={[0, -40, 0]}
        >
          <Objects ballRef={props.ballRef} />
        </Physics>
      </Suspense>
    </Canvas>
  );
};
