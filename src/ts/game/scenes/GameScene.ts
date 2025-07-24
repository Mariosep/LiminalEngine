import { Scene } from "../../engine/core/scene/Scene";
import { Cube } from "../prefabs/Cube";

export class GameScene extends Scene {
  constructor() {
    super();

    const cube = new Cube();
    cube.name = "Cube";

    const cube2 = new Cube();
    cube2.name = "Cube2";
    cube2.transform.position.x = 2;
    cube2.transform.position.y = 2;

    const cube3 = new Cube();
    cube3.name = "Cube3";

    this.add(cube);
    this.add(cube2);

    cube3.transform.setParent(cube2.transform);

    cube3.transform.position.x = 4;
    cube3.transform.position.y = 4;
  }
}
