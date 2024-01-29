import BaseClass from '../class/entities/BaseClass'
import config from '../config'

export default class StarClass extends BaseClass {
  x = 0
  y = 0
  velocityX: number
  velocityY: number
  bounceY = 0 // バウンド率
  target: Phaser.Physics.Arcade.Sprite
  constructor({ x, y, target }: { x: number; y: number; target: Phaser.Physics.Arcade.Sprite }) {
    super()
    this.x = x
    this.y = y
    this.bounceY = config.GAME.DEBUG ? 0 : Phaser.Math.FloatBetween(0.6, 0.9)
    this.velocityX = 0
    this.velocityY = 0
    this.target = target
  }

  update() {
    // 画面外に出たら削除
    if (this.overScreen(this, 20)) {
      this.emit('destroy')
    }
  }

  hit() {
    this.emit('destroy')
  }

  // 画面外判定
  overScreen({ x, y }: { x: number; y: number }, padding = 0) {
    return x < -padding || x > config.WIDTH + padding || y < -padding || y > config.HEIGHT + padding
  }
}
