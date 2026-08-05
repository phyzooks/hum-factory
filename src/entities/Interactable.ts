import Player from "./Player";

export default interface Interactable {

    interact(player: Player): void;

}