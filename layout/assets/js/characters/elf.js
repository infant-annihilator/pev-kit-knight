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
        this.deathImg = 'elf_death_right';
        this.attackRightImg = 'elf_attack_right';
        this.attackLeftImg = 'elf_attack_left';

        this.step = 2; //скорость передвижения и длинна шага

        // начальные значение, которые возвращаются после спауна
        this.damage0 = this.damage
        this.health0 = this.health;
        this.rightWalkImg0 = this.rightWalkImg;
        this.leftWalkImg0 = this.leftWalkImg;
        this.attackRightImg0 = this.attackRightImg;
        this.attackLeftImg0 = this.attackLeftImg;
    }
}