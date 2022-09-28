import { useEffect, useState } from "react";
import useKeyboard from "../hooks/useKeyboard";
import useStore from "../hooks/useStore";
import {
  dirtImg,
  grassImg,
  glassImg,
  logImg,
  woodImg,
  stoneImg,
} from "../images/images";

const images = {
  dirt: dirtImg,
  grass: grassImg,
  glass: glassImg,
  log: logImg,
  wood: woodImg,
  stone: stoneImg,
};

const TextureSelector = () => {
  const [visible, setVisible] = useState(false);
  const [activeTexture, setTexture] = useStore((state) => [
    state.texture,
    state.setTexture,
  ]);
  const { dirt, grass, glass, wood, log, stone } = useKeyboard();

  useEffect(() => {
    const textures = {
      dirt,
      grass,
      glass,
      wood,
      log,
      stone,
    };
    const pressedTexture = Object.entries(textures).find(([k, v]) => v);
    if (pressedTexture) {
      setTexture(pressedTexture[0]);
    }
  }, [setTexture, dirt, grass, glass, wood, log, stone]);

  useEffect(() => {
    const visibilityTimeout = setTimeout(() => {
      setVisible(false);
    }, 2000);

    setVisible(true);

    return () => {
      clearTimeout(visibilityTimeout);
    };
  }, [activeTexture]);

  return (
    visible && (
      <div className="absolute centered bottom texture-selector">
        {Object.entries(images).map(([k, src]) => {
          return (
            <img
              key={k}
              src={src}
              alt={k}
              className={`${k === activeTexture ? "active" : ""}`}
            />
          );
        })}
      </div>
    )
  );
};

export default TextureSelector;
