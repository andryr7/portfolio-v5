import { PhysicBoundaries } from "./PhysicBoundaries";
import { PointerCollider } from "./PointerCollider";
import { InteractiveCube } from "./InteractiveCube";

export function PhysicsScene({ worksScrollProgress }) {
  return (
    <>
      <InteractiveCube worksScrollProgress={worksScrollProgress} />
      <PointerCollider />
      <PhysicBoundaries />
    </>
  );
}
