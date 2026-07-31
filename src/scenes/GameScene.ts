import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {

    private player!: Phaser.GameObjects.Rectangle;

    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor() {
        super("GameScene");
    }

    create(): void {

        this.player = this.add.rectangle(
            240,
            400,
            24,
            24,
            0xffff00
        );

        this.cursors = this.input.keyboard!.createCursorKeys();
    }

    update(): void {

        const speed = 3;

        if (this.cursors.left.isDown) {
            this.player.x -= speed;
        }

        if (this.cursors.right.isDown) {
            this.player.x += speed;
        }

        if (this.cursors.up.isDown) {
            this.player.y -= speed;
        }

        if (this.cursors.down.isDown) {
            this.player.y += speed;
        }
    }
}