import { useThree } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useEffect, useRef } from "react";
import { DragControls } from "three-stdlib";

type DraggableProps = {
  children: React.ReactNode;
};

export const Draggable = ({ children }: DraggableProps) => {
  const ref = useRef<THREE.Group>(null);
  const { camera, gl, scene } = useThree();

  useEffect(() => {
    const controls = new DragControls(
      ref.current!.children,
      camera,
      gl.domElement
    );
    controls.transformGroup = true;

    const orbitControls = (scene as any).orbitControls;

    controls.addEventListener("dragstart", () => {
      orbitControls.enabled = false;
    });
    controls.addEventListener("dragend", () => {
      orbitControls.enabled = true;
    });
  }, [camera, gl.domElement, scene]);

  return <group ref={ref}>{children}</group>;
};
