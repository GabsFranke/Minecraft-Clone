import { NearestFilter, RepeatWrapping, TextureLoader } from "three";
import {
  dirtImg,
  glassImg,
  grassImg,
  logImg,
  woodImg,
  stoneImg,
} from "./images";

const groundTexture = new TextureLoader().load(grassImg);
const dirtTexture = new TextureLoader().load(dirtImg);
const glassTexture = new TextureLoader().load(glassImg);
const grassTexture = new TextureLoader().load(grassImg);
const logTexture = new TextureLoader().load(logImg);
const woodTexture = new TextureLoader().load(woodImg);
const stoneTexture = new TextureLoader().load(stoneImg);

groundTexture.wrapS = RepeatWrapping;
groundTexture.wrapT = RepeatWrapping;
groundTexture.magFilter = NearestFilter;

dirtTexture.magFilter = NearestFilter;
glassTexture.magFilter = NearestFilter;

grassTexture.magFilter = NearestFilter;
grassTexture.wrapS = RepeatWrapping;
grassTexture.wrapT = RepeatWrapping;

logTexture.magFilter = NearestFilter;
woodTexture.magFilter = NearestFilter;
stoneTexture.magFilter = NearestFilter;

export {
  groundTexture,
  dirtTexture,
  glassTexture,
  grassTexture,
  logTexture,
  woodTexture,
  stoneTexture,
};
