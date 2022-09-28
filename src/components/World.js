import React from 'react'

const World = ({position}) => {
  return (
    <mesh
      scale={1}
      ref={ref}
      onClick={handleClick}
      onPointerMove={(e) => {
        e.stopPropagation();
        setIsHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setIsHovered(false);
      }}
    >
      <sphereBufferGeometry attach="geometry" />
      <meshStandardMaterial
        color={isHovered ? "grey" : "white"}
        map={activeTexture}
        transparent={true}
        opacity={texture === "glass" ? 0.7 : 1}
        attach="material"
      />
    </mesh>
  );
}

export default World