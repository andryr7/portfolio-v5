import { PhysicBoundaries } from "./PhysicBoundaries";
import { PointerCollider } from "./PointerCollider";
import { InteractiveCube } from "./InteractiveCube";

export function PhysicsScene() {
  return (
    <>
      <InteractiveCube />
      <PointerCollider />
      <PhysicBoundaries />
    </>
  );
}
