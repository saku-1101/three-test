import * as THREE from "three";
import React, { useState } from "react";
import { Box } from "@react-three/drei";

export function Board() {
  const loader = new THREE.TextureLoader();
  const texture = loader.load("code.svg");
  return (
    <Box position={[0, 0, 0]} args={[20, 10, 0.5]}>
      <meshStandardMaterial map={texture} />
    </Box>
  );
}
