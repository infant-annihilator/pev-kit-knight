import { Enemy } from './_enemy';

/**
 * Класс эльфа
 */
export class Elf extends Enemy
{
    constructor(game, x, y)
    {
        super(game, x, y)
        this.width = 100;
        this.height = 115;

        this.health = 30;
        this.damage = 5;
        this.damageArea = 80;

        this.rightWalkImg = 'elf';
        this.leftWalkImg = 'elf_reverse';
        this.attackRightImg = 'elf_attack_right';
        this.attackLeftImg = 'elf_attack_left';

        this.step = 2; //скорость передвижения и длинна шага
    }
}