import BaseClass from "../class/BaseClass"
import config from "../config";


export class Player extends BaseClass {
  tgtX: number
  tgtY: number
  r = 0
  velocityX = 0
  velocityY = 0
  hp = config.GAME.PLAYER_HP
  damageDelay = 0
  constructor ({ x, y }: { x: number, y: number }) {
    super()
    this.x = x
    this.y = y
    this.tgtX = x
    this.tgtY = y
  }
  update () {

  }
  setTargetPosition (x: number, y: number) {
    this.tgtX = x
    this.tgtY = y
  }
  hit (enemy: BaseClass) {

  }
}
