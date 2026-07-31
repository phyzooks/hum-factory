import Phaser from "phaser";
import GameScene from "./scenes/GameScene.ts";

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,

    width: 480,
    height: 800,

    backgroundColor: "#202020",

    pixelArt: true,

    scene: [GameScene]
};

new Phaser.Game(config);