import { useFrame, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import useKeyboard from "../hooks/useKeyboard";

const JUMP_FORCE = 4;
const SPEED = 4;

const Player = () => {
  const { camera } = useThree();
  const { moveForward, moveBackward, moveLeft, moveRight, jump } =
    useKeyboard();

  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    position: [0, 2, 0],
  }));

  const playerPosition = useRef([0, 0, 0]);
  const playerVelocity = useRef([0, 0, 0]);

  useFrame(() => {
    // copy the playerPosition to the camera position on every frame
    camera.position.copy(
      new Vector3(
        playerPosition.current[0],
        playerPosition.current[1],
        playerPosition.current[2]
      )
    );

    // trigger movement
    // one vector to represent the direction we are facing
    // another one for forward and reverse speed and another one for side speeds
    const direction = new Vector3();
    const frontVector = new Vector3(
      0,
      0,
      (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
    );
    const sideVector = new Vector3(
      (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
      0,
      0
    );

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation); // correct facing direction for the camera

    // apply direction vector to the sphere
    // the y direction is not controled by the player so it stays the same
    api.velocity.set(direction.x, playerVelocity.current[1], direction.z);

    if (jump && Math.abs(playerVelocity.current[1]) < 0.005) {
      api.velocity.set(
        playerVelocity.current[0],
        JUMP_FORCE,
        playerVelocity.current[2]
      );
    }
  });

  // make the playerPosition follow the ref (sphere) position on every frame
  useEffect(() => {
    api.position.subscribe((pos) => (playerPosition.current = pos));
  }, [api.position]);
  // track the velocity too by subscribing the ref to the sphere
  useEffect(() => {
    api.velocity.subscribe((vel) => (playerVelocity.current = vel));
  }, [api.velocity]);

  return <mesh ref={ref}></mesh>;
};

export default Player;
