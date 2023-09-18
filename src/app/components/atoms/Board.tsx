import * as THREE from "three";
import { Plane, Mask, useMask } from "@react-three/drei";
import { Vector3Object } from "@react-three/rapier";

export function Board(props: { collisionPosition: Vector3Object }) {
  const stencil = useMask(1, true);
  // 画像ローディング
  const loader = new THREE.TextureLoader();
  const codeTexture = loader.load("code.svg");
  const coverTexture = loader.load("cover.svg");

  return (
    <>
      <Mask position={[-5, 0, -10]} id={1}>
        <circleGeometry args={[0.8, 64]} />
      </Mask>
      <Mask position={[-3, 0, -10]} id={1}>
        <circleGeometry args={[0.8, 64]} />
      </Mask>
      <Mask position={[-3, 3, -10]} id={1}>
        <circleGeometry args={[0.8, 64]} />
      </Mask>
      <Plane position={[0, 0, -10.5]} args={[20, 10]}>
        <meshStandardMaterial map={codeTexture} />
      </Plane>
      <Plane position={[0, 0, -10]} args={[20, 10]}>
        <meshStandardMaterial map={coverTexture} {...stencil} />
      </Plane>
    </>
  );
}
