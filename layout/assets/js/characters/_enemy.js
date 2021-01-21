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

        // интервал между атаками
        this.intervalDeathTimer = 0;
        this.deathInterval = 1000;

        this.check = false;

        // this.hitCheck = 0;
    }

    /**
     * Спаун врага заново
     */
    spawn()
    {
        this.check = false;
        this.health = this.health0;
        this.isDead = false;
        this.damage = this.damage0;

        // добавить таймер, иначе анимация смерти длится милисекунду!
        this.rightWalkImg = this.rightWalkImg0;
        this.leftWalkImg = this.leftWalkImg0; 
        this.attackRightImg = this.attackRightImg0; 
        this.attackLeftImg = this.attackLeftImg0;

        // спауним врагов в рандомном месте справа
        this.x = this.game.randomInteger(this.screen.width - 10, this.screen.width * 2);
        this.y = this.screen.height - 200;

        if(this.height > 100)
        {
            this.y0 = this.screen.height - 200;
        }
        else
        {
            this.y0 = this.screen.height - 120;
        }
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

    init(time)
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

        this.death(time);        
    }

    /**
     * Получает удар
     * @param {int} damage Урон, который получает персонаж
     */
    hit(damage)
    {
        // if(this.hitCheck == 0)
        // {
            this.health -= damage;
            if (this.health < 0)
            {
                this.health = 0;
            }

            // this.player.hitCheck = true;
        // }
    }

    /**
     * "Смерть" врага
     * Вся его анимация меняется на смерть, позиция фиксируется
     */
    destruct(time)
    {
        this.rightWalkImg = this.deathImg;
        this.leftWalkImg = this.deathImg; 
        this.attackRightImg = this.deathImg; 
        this.attackLeftImg = this.deathImg;
        this.damage = 0;

        if(this.intervalDeathTimer == 0)
        {
            this.intervalDeathTimer = time
        }
        if(this.intervalDeathTimer != 0 && (time - this.intervalDeathTimer) > this.deathInterval)
        {
            this.x = undefined; // враг пропадает с карты
        }
    }

    /**
     * Смерть персонажа
     */
    death(time)
    {
        if (this.health == 0)
        {
            this.isDead = true;
            this.screen.drawImage(this.x, this.y, this.deathImg, this.width, this.height);
            this.destruct(time);

            if(!this.check)
            {
                this.player.kills += 1;
                this.check = true;
            }
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

                this.player.hit(this.damage);
                
            }
            
            this.intervalTimer = 0;
        }
    }
}