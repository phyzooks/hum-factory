import Phaser from "phaser";
import Player, { Direction } from "../entities/Player";
import Machine from "../entities/Machine";
import Room from "../world/Room";
import { TestRoom } from "../world/rooms/TestRoom";
import Tile from "../entities/Tile";
import TileType from "../world/TileType";
import RefillStation from "../entities/RefillStation";

import {TILE_SIZE,} from "../constants";



export default class GameScene extends Phaser.Scene {

    private player!: Player;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private interactKey!: Phaser.Input.Keyboard.Key;
    private oilKey!: Phaser.Input.Keyboard.Key;
    private machines: Machine[] = [];
    private refillStations: RefillStation[] = [];
    private room!: Room;
    private oilText!: Phaser.GameObjects.Text;
    
    private upHeld = false;
    private downHeld = false;
    private leftHeld = false;
    private rightHeld = false;

    constructor() {
        super("GameScene");
    }
    
    private createMobileControls(): void {

    const buttonSize = 60;
    const centerX = 75;
    const centerY = 690;

    const up = this.add.rectangle(
        centerX,
        centerY - buttonSize,
        buttonSize,
        buttonSize,
        0x444444
    );

    const down = this.add.rectangle(
        centerX,
        centerY + buttonSize,
        buttonSize,
        buttonSize,
        0x444444
    );

    const left = this.add.rectangle(
        centerX - buttonSize,
        centerY,
        buttonSize,
        buttonSize,
        0x444444
    );

    const right = this.add.rectangle(
        centerX + buttonSize,
        centerY,
        buttonSize,
        buttonSize,
        0x444444
    );

    const center = this.add.rectangle(
    centerX,
    centerY,
    buttonSize,
    buttonSize,
    0x444444
);

    // Make the buttons interactive
    up.setInteractive();
    down.setInteractive();
    left.setInteractive();
    right.setInteractive();

    // Up commands
    up.on("pointerdown", () => {
        this.upHeld = true;
    });

    up.on("pointerup", () => {
        this.upHeld = false;
    });

    up.on("pointerout", () => {
        this.upHeld = false;
    });
    up.on("pointerupoutside", () => {
        this.upHeld = false;
    });
    //Down Commands
    down.on("pointerdown", () => {
        this.downHeld = true;
    });

    down.on("pointerup", () => {
        this.downHeld = false;
    });

    down.on("pointerout", () => {
        this.downHeld = false;
    });
    down.on("pointerupoutside", () => {
        this.downHeld = false;
    });
    //Left commands
    left.on("pointerdown", () => {
        this.leftHeld = true;
    });

    left.on("pointerup", () => {
        this.leftHeld = false;
    });

    left.on("pointerout", () => {
        this.leftHeld = false;
    });
    left.on("pointerupoutside", () => {
        this.leftHeld = false;
    });
    //Right Commands
    right.on("pointerdown", () => {
        this.rightHeld = true;
    });

    right.on("pointerup", () => {
        this.rightHeld = false;
    });

    right.on("pointerout", () => {
        this.rightHeld = false;
    });
    right.on("pointerupoutside", () => {
        this.rightHeld = false;
    });

    const oilButton = this.add.rectangle(
        405,
        680,
        90,
        60,
        0x444444
    );
    this.add.text(
        405,
        680,
        "OIL",
        {
            fontSize: "20px",
            color: "#ffffff"
        }
    ).setOrigin(0.5);

    oilButton.setInteractive();
        oilButton.on("pointerdown", () => {
        this.useOilOnMachine();
    });

    const refillButton = this.add.rectangle(
        405,
        755,
        90,
        60,
        0x444444
    );

    refillButton.setInteractive();

    refillButton.on("pointerdown", () => {
        this.refillOil();
    });

    this.add.text(
        405,
        755,
        "REFILL",
        {
            fontSize: "14px",
            color: "#ffffff"
        }
    ).setOrigin(0.5);
}

    public showFloatingText(
        x: number,
        y: number,
        message: string
    ): void {

        const text = this.add.text(
            x,
            y,
            message,
            {
                color: "#ffffff",
                fontSize: "12px"
            }
        );

        this.tweens.add({

            targets: text,

            y: y - 20,

            alpha: 0,

            duration: 1000,

            onComplete: () => {
                text.destroy();
            }

        });
    }

    private drawGrid(): void {

        const graphics = this.add.graphics();

        graphics.lineStyle(1, 0x444444);

        for (let x = 0; x <= this.room.width; x++) {

            graphics.moveTo(
                x * TILE_SIZE,
                0
            );

            graphics.lineTo(
                x * TILE_SIZE,
                this.room.height * TILE_SIZE
            );
        }

        for (let y = 0; y <= this.room.height; y++) {

            graphics.moveTo(
                0,
                y * TILE_SIZE
            );

            graphics.lineTo(
                this.room.width * TILE_SIZE,
                y * TILE_SIZE
            );
        }

        graphics.strokePath();
    }

    private refillOil(): void {

    for (const refillStation of this.refillStations) {

        if (
            this.player.isAdjacentTo(
                refillStation.getRow(),
                refillStation.getColumn()
            ) &&
            this.player.isFacing(
                refillStation.getRow(),
                refillStation.getColumn()
            )
        ) {

            refillStation.interact(this.player);
            break;
        }
    }
}

    private useOilOnMachine(): void {

    for (const machine of this.machines) {

        if (
            this.player.isAdjacentTo(
                machine.getRow(),
                machine.getColumn()
            ) &&
            this.player.isFacing(
                machine.getRow(),
                machine.getColumn()
            )
        ) {

            if (this.player.useOil()) {

                machine.applyOil();

                this.sound.play("machine_oiled", {
                    volume: 0.35
                });

            } else {

                this.showFloatingText(
                    this.player.x,
                    this.player.y,
                    "EMPTY"
                );

                this.sound.play("empty", {
                    volume: 0.5
                });
            }

            break;
        }
    }
}

    private drawRoom(): void {

        for (let row = 0; row < this.room.tiles.length; row++) {

            for (let col = 0; col < this.room.tiles[row].length; col++) {

                const tile = this.room.tiles[row][col];

                if (tile === TileType.WALL) {

                    new Tile(
                    this,
                    col * TILE_SIZE + TILE_SIZE / 2,
                    row * TILE_SIZE + TILE_SIZE / 2,
                    0x555555
                );

                }

                if (tile === TileType.MACHINE) {

                    const machine = new Machine(
                this,
                col * TILE_SIZE + TILE_SIZE / 2,
                row * TILE_SIZE + TILE_SIZE / 2,
                col,
                row
            );

                this.machines.push(machine);

                }
                if (tile === TileType.REFILL_STATION) {

                    const refillStation = new RefillStation(
                        this,
                        col * TILE_SIZE + TILE_SIZE / 2,
                        row * TILE_SIZE + TILE_SIZE / 2,
                        col,
                        row
                    );

                    this.refillStations.push(refillStation);

                }
            }
        }
    }
    preload() {

        this.load.audio(
            "factory_hum",
            "assets/audio/factory_hum.wav"
        );
        this.load.audio(
            "light_grind",
            "assets/audio/light_grind.wav"
        );

        this.load.audio(
            "heavy_grind",
            "assets/audio/heavy_grind.wav"
        );

        this.load.audio(
            "machine_oiled",
            "assets/audio/machine_oiled.wav"
        );

        this.load.audio(
            "refill",
            "assets/audio/refill.wav"
        );
        this.load.audio(
            "empty",
            "assets/audio/empty.wav"
        );

    }
    create() {
        
        const playerColumn = 2;
        const playerRow = 3;
        const playerX = playerColumn * TILE_SIZE + TILE_SIZE / 2;
        const playerY = playerRow * TILE_SIZE + TILE_SIZE / 2;
        
        this.room = new Room(TestRoom);
        this.drawRoom();
        this.player = new Player(
            this,
            playerColumn,
            playerRow,
            this.room
        );
       this.drawGrid();
        
       

        this.cursors = this.input.keyboard!.createCursorKeys();
        this.input.keyboard!.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
            );
        this.interactKey =
            this.input.keyboard!.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
            );
        this.oilKey =
            this.input.keyboard!.addKey(
                Phaser.Input.Keyboard.KeyCodes.O
            );
        this.oilText = this.add.text(
            100,
            200,
            "Oil: 5/5",
            {
                color: "#ffffff"
            }
        );
        this.createMobileControls();      
    }

    update(time: number) {

    this.player.requestMove(this.cursors);
        if (this.upHeld) {
        this.player.requestDirection(Direction.UP);
    }

    if (this.downHeld) {
        this.player.requestDirection(Direction.DOWN);
    }

    if (this.leftHeld) {
        this.player.requestDirection(Direction.LEFT);
    }

    if (this.rightHeld) {
        this.player.requestDirection(Direction.RIGHT);
    }
    this.player.updateMovement();
    this.oilText.setText(
        `Oil: ${this.player.getOilAmount()}/${this.player.getMaxOilAmount()}`
    );

    for (const machine of this.machines) {
        machine.update(time);
    }

    if (Phaser.Input.Keyboard.JustDown(this.interactKey)) {

    for (const machine of this.machines) {

        if (
            this.player.isAdjacentTo(
                machine.getRow(),
                machine.getColumn()
            ) &&
            this.player.isFacing(
                machine.getRow(),
                machine.getColumn()
            )
        ) {
            machine.interact(this.player);
            break;
        }
    }

    this.refillOil();
}
    if (Phaser.Input.Keyboard.JustDown(this.oilKey)) {

    this.useOilOnMachine();
}
    
}
}