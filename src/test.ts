
let player
  ,attackObject

function create() {
  // プレイヤーの初期化
  player = this.physics.add.sprite(100,100, 'dude'); // 'player'はプレイヤーのテクスチャのキー
  player.setCollideWorldBounds(true);

  // アニメーションや他の初期化処理...

  // 攻撃範囲の当たり判定を作成
  attackColliderLeft = this.physics.add.collider(player, null, attackHandler, null, this);
  attackColliderLeft.setSize(/* サイズや位置を適切に設定 */);

  attackColliderRight = this.physics.add.collider(player, null, attackHandler, null, this);
  attackColliderRight.setSize(/* サイズや位置を適切に設定 */);

  // プレイヤーの攻撃キーなどの入力を監視し、攻撃時に当たり判定を有効化する
  this.input.keyboard.on('keydown_SPACE', () => {
    // 攻撃時に両方のコライダーを有効化
    attackColliderLeft.active = true;
    attackColliderRight.active = true;

    // 他の処理...
  });
}

function update() {
  // プレイヤーの入力などの更新処理...
}
