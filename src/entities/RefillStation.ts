import Phaser from "phaser";
import Interactable from "./Interactable";
import Player from "./Player";
import GameScene from "../scenes/GameScene";
import { TILE_SIZE } from "../constants";

export default class RefillStation 
    extends Phaser.GameObjects.Rectangle
    implements Interactable {

    private row: number;
    private column: number;
    private gameScene: GameScene;

    constructor(
    scene: GameScene,
    x: number,
    y: number,
    column: number,
    row: number
)
{
    super(
        scene,
        x,
        y,
        TILE_SIZE,
        TILE_SIZE,
        0x00ffff
    );

    this.gameScene = scene;

    this.column = column;
    this.row = row;

    scene.add.existing(this);
}

    public interact(player: Player): void {

    player.refillOil();
    
    console.log("Oil refilled!");

    this.gameScene.showFloatingText(
        this.x,
        this.y,
        "+OIL"
    );
    this.gameScene.sound.play("refill",{
                volume: 0.35
            });

}

    public getRow(): number {
        return this.row;
    }

    public getColumn(): number {
        return this.column;
    }

}