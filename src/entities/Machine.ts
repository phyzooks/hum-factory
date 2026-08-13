import Phaser from "phaser";
import {TILE_SIZE,} from "../constants";
import  Interactable  from "./Interactable";
import Player from "./Player";
import GameScene from "../scenes/GameScene";

export default class Machine 
    extends Phaser.GameObjects.Rectangle 
    implements Interactable {
    private hum!: Phaser.Sound.BaseSound;
    private condition = 100;
    private lastWearTime = 0;
    private wearInterval = 1000;
    private lastProblemSound = 0;
    private problemSoundDelay = 3000;
    private gameScene: GameScene;
    public getCondition(): number {    
        return this.condition;
        }
    private statusLight: Phaser.GameObjects.Arc;
    private row: number;
    private column: number;
    private isSqueaking = false;
    
    
    private updateSound(): void {

    if (this.condition >= 75) {
        return;
    }

    if (
        Date.now() - this.lastProblemSound <
        this.problemSoundDelay
    ) {
        return;
    }


    if (this.condition < 40) {

        this.scene.sound.play(
            "heavy_grind",
            {
                volume: 0.35
            }
        );

    } else {

        this.scene.sound.play(
            "light_grind",
            {
                volume: 0.25
            }
        );

    }

    this.lastProblemSound = Date.now();
    this.problemSoundDelay =
        Phaser.Math.Between(2000, 5000);
}

    private updateStatusLight(): void {

    let color = 0x00ff00;

    if (this.condition < 40) {

        color = 0xff0000;

    } else if (this.condition < 75) {

        color = 0xffff00;

    }

    this.statusLight.setFillStyle(color);

}
    public update(time: number): void {

        if (time - this.lastWearTime > this.wearInterval) {

            this.condition--;
            this.updateSound();
            this.updateStatusLight();
            this.lastWearTime = time;

            console.log(
                "Machine condition:",
                this.condition
            );

        }

    }
    public interact(player: Player): void {

    let status = "Stable";

    if (this.condition < 75) {
        status = "Needs attention";
    }

    if (this.condition < 40) {
        status = "Warning";
    }

    if (this.condition < 10) {
        status = "Critical";
    }

    console.log(
        "Machine status:",
        status,
        "| Condition:",
        this.condition + "%"
    );

}
    public applyOil(): void {

    this.condition += 10;

    if (this.condition > 100) {
        this.condition = 100;
    }

    console.log(
        "Machine oiled. Condition:",
        this.condition + "%"
    );
    this.gameScene.showFloatingText(
        this.x,
        this.y,
        "OILED"
    );

}

    constructor(
    scene: GameScene,
    x: number,
    y: number,
    column: number,
    row: number
) {
        
        super(
            scene,
            x,
            y,
            32,
            32,
            0x888888
        );
        
        this.column = column;
        this.row = row;
        this.gameScene = scene;
        scene.add.existing(this);
        this.statusLight = scene.add.circle(
            x + TILE_SIZE / 4,
            y - TILE_SIZE / 4,
            3,
            0x00ff00
        );
        this.hum = scene.sound.add(
            "factory_hum",
            {
                loop: true,
                volume: 0.2
            }
        );

        this.hum.play();
    }
    public getRow(): number {
        return this.row;
    }

    public getColumn(): number {
        return this.column;
    }
    
}