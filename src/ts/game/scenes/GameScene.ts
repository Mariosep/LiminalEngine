import { Scene } from "../../engine/scene/Scene";
import { Cube } from "../prefabs/Cube";

export class GameScene extends Scene {
  constructor() {
    super();

    const cube = new Cube();
    
    const cube2 = new Cube();
    cube2.transform.position.x = 2;
    cube2.transform.position.y = 2;

    this.add(cube);
    this.add(cube2);
  }
}