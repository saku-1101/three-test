"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Canvas shadows style={{ width: "100vw", height: "100vh" }}>
          <ambientLight />
          <pointLight position={[0, 0, 0]} />
          {/* Control the movement of the camera with mouse interaction */}
          {/* <OrbitControls attach="orbitControls" /> */}
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
