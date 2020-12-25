import { Enemy } from './_enemy';

/**
 * Класс эльфа
 */
export class Dog extends Enemy
{
    constructor(game, x, y)
    {
        super(game, x, y)
        this.width = 100;
        this.height = 55;

        this.health = 15;
        this.damage = 2;
        this.damageArea = 50;

        this.attackInterval = 500; // уменьшенный интервал атаки

        this.rightWalkImg = 'dog';
        this.leftWalkImg = 'dog_reverse';
        this.deathImg = 'dog';
        this.attackRightImg = 'dog';
        this.attackLeftImg = 'dog_reverse';

        this.step = 3; //скорость передвижения и длинна шага
    }

     /**
     * Особый эффект "прыжка" для собаки
     * Прыжок опфределяет синусоида.
     * Первое число регулирует внутренний угол (Math.sin(x/n)), второе - выпуклость (bend)
     */
    jump()
    {
        this.y = this.y0 - f(this.x);
        function f(x)
        {
            let bend = 18
            return Math.sin(x / 30) * bend;
        }
    }
}