import * as THREE from "three";
import React, { useRef, useState } from "react";
import { Box } from "@react-three/drei";

export function Floor() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  return (
    <Box
      ref={meshRef}
      position={[0, 0, 0]}
      args={[10, 0.5, 7]}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <meshStandardMaterial color={hovered ? "hotpink" : "red"} />
    </Box>
  );
}
