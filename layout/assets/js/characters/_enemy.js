import { Character } from '../abstract-main/character';

/**
 * Абстрактный класс врага
 */
export class Enemy extends Character
{
    constructor(game, x, y)
    {
        super(game, x, y)
        this.y0 = y;
        this.direction = 'left';
        
        this.player = this.game.player; // игрок

        // цвет и высота полоски здоровья
        this.healthColor = '#14c94c';
        this.healthHeight = 5;

        // интервал между атаками
        this.intervalTimer = 0;
        this.attackInterval = 1000;
    }

    /**
     * Эффект "прыжка" у врага в движении
     * Прыжок опфределяет синусоида.
     * Первое число регулирует внутренний угол (Math.sin(x/n)), второе - выпуклость (bend)
     */
    jump()
    {
        this.y = this.y0 - f(this.x);
        function f(x)
        {
            let bend = 48
            return Math.sin(x / 30) * bend;
        }
    }

    init()
    {
        var rightWalkImg = this.rightWalkImg,
            leftWalkImg = this.leftWalkImg,
            direction = this.direction,
            x = this.x, 
            y = this.y,
            // полоска здоровья
            healthX = x + 50,
            healthY = y - 10

        if(direction == 'right')
        {
            this.screen.fillRect(this.healthColor, healthX, healthY, this.health, this.healthHeight);
            this.screen.drawImage(x, y, rightWalkImg, this.width, this.height);
        } else {            
            this.screen.fillRect(this.healthColor, healthX, healthY, this.health, this.healthHeight);
            this.screen.drawImage(x, y, leftWalkImg, this.width, this.height);
        }
        
    }
    
    /**
     * Атакуют игрока
     * Интервал определяется через this.attackInterval, у каждого класса может быть своим
     * Проверка, находится ли x игрока в диапазоне удара
     */
    attack(time)
    {
        if(this.intervalTimer == 0)
        {
            this.intervalTimer = time
        }
        if(this.intervalTimer != 0 && (time - this.intervalTimer) > this.attackInterval)
        {
            if((this.player.x >= this.x - this.damageArea) && (this.player.x <= this.x + this.damageArea))
            {
                var attackRightImg = this.attackRightImg,
                    attackLeftImg = this.attackLeftImg,
                    direction = this.direction,
                    x = this.x, 
                    y = this.y,
                    // полоска здоровья
                    healthX = x + 50,
                    healthY = y - 10

                if(direction == 'right')
                {
                    this.screen.fillRect(this.healthColor, healthX, healthY, this.health, this.healthHeight);
                    this.screen.drawImage(x, y, attackRightImg, this.width, this.height);
                } else {            
                    this.screen.fillRect(this.healthColor, healthX, healthY, this.health, this.healthHeight);
                    this.screen.drawImage(x, y, attackLeftImg, this.width, this.height);
                }

                this.player.health -= this.damage;
                if(this.player.health < 0)
                {
                    this.player.health = 0;
                }
            }
            
            this.intervalTimer = 0;
        }
    }
}