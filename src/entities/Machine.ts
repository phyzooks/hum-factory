import Phaser from "phaser";

import { Interactable } from "./Interactable";

export default class Machine 
    extends Phaser.GameObjects.Rectangle 
    implements Interactable {
    private hum!: Phaser.Sound.BaseSound;
    private condition = 100;
    private lastWearTime = 0;
    private wearInterval = 1000;
    public getCondition(): number {
    
    return this.condition;

}
    private isSqueaking = false;
    private updateSound(): void {
        
    if (this.condition < 40) {
        console.log("Machine squeaks...");
        this.isSqueaking = true;
    }
    if (this.condition >= 40) {

        this.isSqueaking = false;

    }

}

    public update(time: number): void {

        if (time - this.lastWearTime > this.wearInterval) {

            this.condition--;
            this.updateSound();
            this.lastWearTime = time;

            console.log(
                "Machine condition:",
                this.condition
            );

        }

    }
    public interact(): void {

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

}

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number
    ) {
        
        super(
            scene,
            x,
            y,
            32,
            32,
            0x888888
        );
        
        scene.add.existing(this);
        this.hum = scene.sound.add(
            "factory_hum",
            {
                loop: true,
                volume: 0.5
            }
        );

        this.hum.play();
    }
    
}