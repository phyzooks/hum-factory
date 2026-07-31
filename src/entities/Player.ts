import Phaser from "phaser";

export default class Player extends Phaser.GameObjects.Rectangle {

    private speed = 3;

    constructor(scene: Phaser.Scene, x: number, y: number) {

        super(
            scene,
            x,
            y,
            24,
            24,
            0xffff00
        );

        scene.add.existing(this);
    }

    move(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {

        if (cursors.left.isDown) {
            this.x -= this.speed;
        }

        if (cursors.right.isDown) {
            this.x += this.speed;
        }

        if (cursors.up.isDown) {
            this.y -= this.speed;
        }

        if (cursors.down.isDown) {
            this.y += this.speed;
        }
    }
}