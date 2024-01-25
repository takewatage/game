import BaseClass from "@/class/BaseClass";
import config from "@/config";

export default class StarClass extends BaseClass {
  x = 0
  y= 0
  velocityX: number
  velocityY: number
  bounceY = 0 // バウンド率
  active = true // 表示
  gameOb: Phaser.GameObjects
  constructor ({ x, y, target }: { x: number, y: number, target }) {
    super()
    this.x = x
    this.y = y
    this.bounceY = Phaser.Math.FloatBetween(0.6, 0.9)
    this.velocityX = 0
    this.velocityY = 0
    this.target = target
  }

  update() {
    if(this.overScreen(this, 20)) {
      this.emit('destroy')
    }

    if(Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y) < 35) {
      this.emit('destroy')
    }


  }

  hit () {
    this.active = false
    this.emit('hit')
  }

  // 画面外判定
  overScreen ({ x, y }: { x: number, y: number }, padding = 0) {
    return x < -padding || x > config.WIDTH + padding || y < -padding || y > config.HEIGHT + padding
  }
}
