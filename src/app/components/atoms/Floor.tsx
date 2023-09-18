import React, { useState } from "react";
import { Box } from "@react-three/drei";

export function Floor() {
  return (
    <Box
      position={[0, 0, 0]}
      args={[10, 0.5, 7]}
    >
      <meshStandardMaterial color={"hotpink"} />
    </Box>
  );
}
