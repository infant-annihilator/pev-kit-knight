import { Enemy } from './_enemy';

/**
 * Класс эльфа
 */
export class Greench extends Enemy
{
    constructor(game, x, y)
    {
        super(game, x, y)
        this.width = 120;
        this.height = 135;

        this.health = 60;

        this.damage = 10;
        this.damageArea = 80;

        this.rightWalkImg = 'greench';
        this.leftWalkImg = 'greench_reverse';
        this.deathImg = 'greench_death_right';
        this.attackRightImg = 'greench_attack_right';
        this.attackLeftImg = 'greench_attack_left';

        this.step = 1; //скорость передвижения и длинна шага

        // начальные значение, которые возвращаются после спауна
        this.damage0 = this.damage
        this.health0 = this.health;
        this.rightWalkImg0 = this.rightWalkImg;
        this.leftWalkImg0 = this.leftWalkImg;
        this.attackRightImg0 = this.attackRightImg;
        this.attackLeftImg0 = this.attackLeftImg;
    }
}