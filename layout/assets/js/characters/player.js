import { Character } from '../abstract-main/character';

/**
 * Класс игрока
 */
export class Player extends Character
{
    constructor(game, nickname, x, y)
    {
        super(game, x, y)
        this.direction = 'right';
        this.nickname = nickname;

        this.y0 = y;
        this.width = 100;
        this.height = 115;
        this.standing = true;

        this.health = 100;
        this.damageArea = 100;

        // регенерация
        this.healthRegenInterval = 2000; // интервал регенерации, в милисекундах
        this.healthRegen = 2; // количество регенерируемого здоровья

        this.rightWalkImg = 'player';
        this.leftWalkImg = 'player_reverse';

        this.step = 5; //скорость передвижения и длинна шага
        
        this.direction = 'right';
        this.intervalTimer = 0;
    }

    healthRegeneration(time)
    {
        if(this.intervalTimer == 0)
        {
            this.intervalTimer = time
        }
        if(this.intervalTimer != 0 && (time - this.intervalTimer) > this.healthRegenInterval)
        {
            if(this.health < 100)
            {
                if(this.health + this.healthRegen > 100)
                {
                    this.health = 100;
                }
                else
                {
                    this.health += this.healthRegen;   
                }
            }
            this.intervalTimer = 0;
        }
    }

    regen(time)
    {
        this.healthRegeneration(time)
    }

    animation(filesNumber, fileFormat)
    {
        var num = 1;
        var imgs = {}
        const self = this;


        for(let i = 0; i < filesNumber; i++)
        {
            let image = new Image(100,200);
            image.src = '../character animation/knight/sprites/idle/idle000' + num + '.' + fileFormat;
            image.onerror = function() {
                this.onerror = null;
            };
            // console.log(image)
            
            imgs[num] = image;

            num++
        
        }
        return imgs
    }

    standing(time)
    {
        const self = this;
        setInterval(function() {
            self.animation();
        }, 1000)
    }
}