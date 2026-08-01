import Phaser from "phaser";

export default class Machine extends Phaser.GameObjects.Rectangle {
    private hum!: Phaser.Sound.BaseSound;
    private condition = 100;
    public getCondition(): number {

    return this.condition;

}
    public interact(): void {

    console.log("Machine status: humming normally");

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