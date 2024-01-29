import BaseClass from '../class/entities/BaseClass'
import config from '../config'

export default class PlatFormClass extends BaseClass {
  x = 0
  y = 0
  gameOb: any
  width = 0
  height = 0
  constructor({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
    super()
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  setGameOb(ob: Phaser.GameObjects.Rectangle) {
    this.gameOb = ob
  }
}
