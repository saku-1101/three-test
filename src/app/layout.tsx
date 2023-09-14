"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense, useRef } from "react";
import { OrbitControls } from "@react-three/drei";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  const distance = 800;
  const FOV = (2 * Math.atan(windowHeight / (2 * distance)) * 180) / Math.PI;

  return (
    <html lang="en">
      <body className={inter.className}>
        <Canvas
          shadows
          camera={{
            position: [10, 1, 10],
            fov: FOV,
            aspect: windowWidth / innerHeight,
          }}
          style={{ width: "100vw", height: "100vh" }}
        >
          <ambientLight />
          <pointLight position={[0, 0, 0]} />
          {/* Control the movement of the camera with mouse interaction */}
          <OrbitControls attach="orbitControls" />
          <color attach="background" args={["white"]} />
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
              {children}
            </Physics>
          </Suspense>
        </Canvas>
      </body>
    </html>
  );
}
