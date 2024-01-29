import BaseClass from '../class/entities/BaseClass'
import config from '../config'

export default class BombClass extends BaseClass {
  x = 0
  y = 0
  velocityX: number
  velocityY: number
  bounceX = 0 // バウンド率
  bounceY = 0 // バウンド率
  target: Phaser.Physics.Arcade.Sprite | null
  constructor({ x, y, target }: { x: number; y: number; target: Phaser.Physics.Arcade.Sprite }) {
    super()
    this.x = x
    this.y = y
    this.bounceX = 1
    this.bounceY = 1
    this.velocityX = Phaser.Math.Between(-200, 200)
    this.velocityY = 20
    this.target = target
  }

  update() {
    // if(Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y) < 35) {
    //   this.emit('hit')
    // }
  }

  hit() {
    this.emit('hit')
  }

  // 画面外判定
  overScreen({ x, y }: { x: number; y: number }, padding = 0) {
    return x < -padding || x > config.WIDTH + padding || y < -padding || y > config.HEIGHT + padding
  }
}
