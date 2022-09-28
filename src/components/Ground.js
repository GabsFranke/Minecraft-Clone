import { usePlane } from "@react-three/cannon";
import useStore from "../hooks/useStore";
import { groundTexture } from "../images/textures";
import { angleToRadians } from "../utils/angle";

const Ground = () => {
  const [ref] = usePlane(() => ({
    rotation: [-angleToRadians(90), 0, 0],
    position: [0, -0.5, 0],
  }));

  const [addCube] = useStore((state) => [state.addCube]);

  groundTexture.repeat.set(100, 100);

  const addCubesOnClick = (e) => {
    e.stopPropagation();
    const [x, y, z] = Object.values(e.point).map((v) => Math.ceil(v));
    addCube(x, y, z);
  };

  return (
    <mesh ref={ref} onClick={addCubesOnClick}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial attach="material" map={groundTexture} />
    </mesh>
  );
};

export default Ground;
