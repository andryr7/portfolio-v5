import { InteractiveCube } from "../../../desktop/cube/InteractiveCube";
import { PhysicBoundaries } from "./PhysicBoundaries";
import { PointerCollider } from "./PointerCollider";

export function PhysicsScene() {
  return (
    <>
      <InteractiveCube />
      <PointerCollider />
      <PhysicBoundaries />
    </>
  );
}
