import { Mask } from "@react-three/drei";
import { Vector3Object } from "@react-three/rapier";
export const Masks = (props: { collisionPositions: Array<Vector3Object> }) => {
  console.log(props.collisionPositions);

  return (
    <>
      {props.collisionPositions.map((position, key) => (
        <Mask position={[position.x, position.y, 5]} id={1} key={key}>
          <circleGeometry args={[0.8, 64]} />
        </Mask>
      ))}
    </>
  );
};
