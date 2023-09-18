import React, { useState } from "react";
import { Box } from "@react-three/drei";

export function Board() {
  return (
    <Box position={[0, 0, 0]} args={[10, 20, 0.5]}>
      <meshStandardMaterial color={"green"} />
    </Box>
  );
}
