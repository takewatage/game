import BaseClass from "../class/BaseClass"
import config from "../config";


export default class Player extends BaseClass {
  tgtX: number
  tgtY: number
  r = 0
  velocityX = 0
  velocityY = 0
  hp = config.GAME.PLAYER_HP
  damageDelay = 0
  isJump = false
  constructor ({ x, y }: { x: number, y: number }) {
    super()
    this.x = x
    this.y = y
    this.tgtX = x
    this.tgtY = y
  }
  update () {
    // const vector = new Phaser.Math.Vector2(this.tgtX - this.x, this.tgtY - this.y)
    // console.log(vector)
    // this.velocityX = vector.x
    // this.velocityY = vector.y

  }
  setVelocity (x: number, y: number) {
    this.velocityX = x
    this.velocityY = y
  }

  setVelocityX (x: number) {
    this.velocityX = x
  }
  setVelocityY (y: number) {
    this.velocityY = y
  }
  hit (enemy: BaseClass) {

  }
}
