import Phaser from "phaser";
import Player from "../entities/Player";

export default class GameScene extends Phaser.Scene {

    private player!: Player;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor() {
        super("GameScene");
    }

    create() {

        this.player = new Player(
            this,
            240,
            400
        );

        this.cursors = this.input.keyboard!.createCursorKeys();
    }

    update() {

        this.player.move(this.cursors);

    }
}