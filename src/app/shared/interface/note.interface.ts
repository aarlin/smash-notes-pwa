export interface Note {
    id?: string | number,
    groupName: string,
    player: string,
    enemy: string,
    title: string,
    body: string,
    enemyImage?: string
    playerImage?: string
    uid?: string;
    visible?: boolean;
    timestamp?: Date;
}