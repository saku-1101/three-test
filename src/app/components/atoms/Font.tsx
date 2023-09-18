import { Center, Text3D } from "@react-three/drei";

export const Font = () => {
  return (
    <Center rotation={[-0.5, -0.25, 0]}>
      <Text3D
        curveSegments={32}
        bevelEnabled
        bevelSize={0.04}
        bevelThickness={0.1}
        height={0.5}
        lineHeight={0.5}
        letterSpacing={-0.06}
        size={1.5}
        font="/font.json"
      >
        {`Lang-\nPong`}
        <meshNormalMaterial />
      </Text3D>
    </Center>
  );
};
