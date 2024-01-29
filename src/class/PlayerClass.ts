import BaseClass from '../class/entities/BaseClass'
import config from '../config'
import { useScene } from 'phavuer'

export default class PlayerClass extends BaseClass {
  x = 0
  y = 0
  velocityX = 0
  velocityY = 0
  gameOb: Phaser.Physics.Arcade.Sprite | undefined
  cursors: undefined | Phaser.Types.Input.Keyboard.CursorKeys
  constructor({ x, y }: { x: number; y: number }) {
    super()
    this.x = x
    this.y = y
  }

  addCollider(scene: Phaser.Scene, ob: Phaser.Physics.Arcade.Group, func?: () => {}) {
    if (this.gameOb) {
      scene.physics.add.collider(this.gameOb, ob, func)
    }
  }

  addOverlap(
    scene: Phaser.Scene,
    ob: Phaser.Physics.Arcade.Sprite,
    collideCallback?: Phaser.Types.Physics.Arcade.ArcadePhysicsCallback
  ) {
    if (this.gameOb) {
      scene.physics.add.overlap(this.gameOb, ob, collideCallback)
    }
  }

  create(scene: Phaser.Scene) {
    this.#createAnims(scene)
    this.#setController(scene)
    return this
  }

  update() {
    if (!this.gameOb) return

    // カーソル左
    if (this.cursors?.left.isDown) {
      this.gameOb.setVelocityX(-160)
      this.gameOb.anims.play('left', true)

      // カーソル右
    } else if (this.cursors?.right.isDown) {
      this.gameOb.setVelocityX(160)
      this.gameOb.anims.play('right', true)

      // カーソルなし
    } else {
      this.gameOb.setVelocityX(0)
      this.gameOb.anims.play('turn')
    }

    // UPキーでplayerが地面に接しているとき
    if (this.cursors?.up.isDown && this.gameOb.body?.touching.down) {
      this.gameOb.setVelocityY(-330)
    }
  }

  #setController(scene: Phaser.Scene) {
    this.cursors = scene.input.keyboard?.createCursorKeys()
  }

  //playerのアニメーション設定
  #createAnims(scene: Phaser.Scene) {
    scene.anims.create({
      key: 'left',
      frames: scene.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    })

    scene.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20,
    })

    scene.anims.create({
      key: 'right',
      frames: scene.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    })
  }
}
