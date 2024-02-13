import BaseClass from '../class/entities/BaseClass'
import Sprite = Phaser.GameObjects.Sprite;

interface IKeys {
  up: Phaser.Input.Keyboard.Key
  space: Phaser.Input.Keyboard.Key
  down: Phaser.Input.Keyboard.Key
  left: Phaser.Input.Keyboard.Key
  right: Phaser.Input.Keyboard.Key
}

export default class PlayerClass extends BaseClass {
  x = 0
  y = 0
  lastDirection = 'left' // 最後に押した方向を記憶
  gameOb: Phaser.Physics.Arcade.Sprite | undefined
  cursors: IKeys | undefined

  attackObject: Phaser.Physics.Arcade.Sprite | undefined
  attackG: Phaser.GameObjects.Group | undefined
  velocityX = 0
  velocityY = 0

  constructor({ x, y }: { x?: number; y?: number }) {
    super()
    this.x = x ? x : 0
    this.y = y ? y : 0
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

    // プレイヤーと攻撃オブジェクトの初期化
    // this.attackG = scene.add.group()
    //
    // const attackObject = scene.physics.add.sprite(this.x, this.y, 'slash5');
    // attackObject.setScale(0.5, 0.5); // 適切なサイズに設定
    // attackObject.setSize(60, 80); // 適切なサイズに設定
    // attackObject.setDepth(1); // プレイヤーより前に表示
    // attackObject.setGravityY(-300); // 重力を無効にする
    // attackObject.setName('attackInfluence')
    // // attackObject.disableBody(true, true)
    // this.attackObject = attackObject
    // this.attackG.add(this.attackObject)
    //
    // // 上の攻撃判定
    // const attackObject2 = scene.physics.add.sprite(this.x, this.y, 'slash5');
    // attackObject2.setScale(0.5, 0.5); // 適切なサイズに設定
    // attackObject2.setSize(50, 30); // 適切なサイズに設定
    // attackObject2.setDepth(1); // プレイヤーより前に表示
    // attackObject2.setGravityY(-300); // 重力を無効にする
    // attackObject2.setName('attackTop')
    // this.attackG.add(attackObject2)
    //
    // this.attackObject.on(Phaser.Animations.Events.ANIMATION_COMPLETE, function () {
    //   this.attackObject?.disableBody(true, true)
    // }, this);

    return this
  }

  attackReset() {
    this.attackObject?.disableBody(true, true)
  }

  update() {
    if (!this.gameOb) return
    let moving = false

    // カーソル左
    if (this.cursors?.left.isDown) {
      this.lastDirection = 'left'
      this.gameOb.setVelocityX(-160)
      this.gameOb.anims.play('left', true)
      // this.attackObject?.setPosition(this.gameOb.x - 25, this.gameOb.y)
      // カーソル右
    } else if (this.cursors?.right.isDown) {
      this.lastDirection = 'right'
      this.gameOb.setVelocityX(160)
      this.gameOb.anims.play('right', true)
      // this.attackObject?.setPosition(this.gameOb.x + 25, this.gameOb.y)

      // カーソルなし
    } else {
      this.gameOb.setVelocityX(0)
      this.gameOb?.anims.stop()
    }

    // UPキーでplayerが地面に接しているとき
    if (this.cursors?.up.isDown && this.gameOb.body?.touching.down) {
      this.gameOb.setVelocityY(-330)
    }

    // 攻撃処理
    // if (this.cursors?.space.isDown) {
    //   this.attack()
    // }
    //
    // if (this.lastDirection === 'right') {
    //   this.attackObject?.setPosition(this.gameOb.x + 25, this.gameOb.y)
    // } else {
    //   this.attackObject?.setPosition(this.gameOb.x - 25, this.gameOb.y)
    // }

    // this.attackG?.children.iterate((attack: Sprite) => {
    //
    //   if(attack.name === 'attackInfluence') {
    //     attack.setPosition(this.gameOb?.x ? this.gameOb?.x - 25 : this.gameOb?.x, this.gameOb?.y)
    //   }
    //   if(attack.name === 'attackTop') {
    //     attack.setPosition(this.gameOb?.x, this.gameOb?.y ? this.gameOb?.y - 20 : this.gameOb?.y)
    //   }
    // });
  }

  #setController(scene: Phaser.Scene) {
    // this.cursors = scene.input.keyboard?.createCursorKeys()
    const codes = Phaser.Input.Keyboard.KeyCodes
    // キー入力
    this.cursors = scene.input.keyboard?.addKeys({
      up: codes.W,
      down: codes.S,
      left: codes.A,
      right: codes.D,
      space: codes.SPACE,
    }) as IKeys
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

    scene.anims.create({
      key: 'attack5',
      frames: scene.anims.generateFrameNumbers('slash5', { start: 2, end: 10 }),
      frameRate: 20,
    })
  }

  attack() {
    console.log('attack!!!')
    if (this.lastDirection === 'left') {
      this.attackObject?.enableBody(true, this.x, this.y, true, true)
      this.attackObject?.setFlipX(true)
    } else if (this.lastDirection === 'right') {
      this.attackObject?.enableBody(true, this.x, this.y, true, true)
      this.attackObject?.setFlipX(false)
    }
    this.attackObject?.play('attack5', true)
  }
}
