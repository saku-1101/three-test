import React, { useState } from "react";
import { Sphere } from "@react-three/drei";

export function Ball() {
  const [hovered, setHover] = useState(false);
  return (
    <Sphere
      args={[0.75, 32, 32]}
      rotation={[-Math.PI / 2, 0, 0]}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <meshStandardMaterial color={hovered ? "orange" : "springgreen"} />
    </Sphere>
  );
}
