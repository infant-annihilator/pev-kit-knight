import { Enemy } from "../characters/_enemy";

/**
 * Абстрактный класс персонажа
 * @param {Object} game - класс игры 
 * @param {Boolean} isDead - мёртв или жив
 * @param {Integer} x - начальная координата по x 
 * @param {Integer} y - начальная координата по y
 * @param {Integer} width - ширина персонажа 
 * @param {Integer} height - высота персонажа
 * @param {Integer} step - скорость или ширина шага
 * @param {String} direction - направление ходьбы по умолчанию (right или left)
 * @param {Boolean} standing - стоит или движется
 * @param {Integer} health - количество здоровья
 * @param {Integer} damage - сила урона
 * @param {Integer} damageArea - область атаки в пикселях
 * @param {Image} rightWalkImg - изображение для движения вправо
 * @param {Image} leftWalkImg - избражение для движения влево 
 * @param {Image} attackImg - избражение для атаки 
 * @param {Image} deathImg - избражение для смерти 
 */
export class Character
{
    constructor(game, x, y, width, height, step, damageArea, rightWalkImg, leftWalkImg)
    {
        this.game = game;
            this.screen = this.game.screen;


        this.x = x;
        this.y = y;
        this.y0 = y;
        this.width = width;
        this.height = height;
        this.damageArea = damageArea;

        this.rightWalkImg = rightWalkImg;
        this.leftWalkImg = leftWalkImg;

        this.step = step; //скорость передвижения и длинна шага
        
        this.standing = false; // стоит ли
    }

    /**
     * 
     */
    init(time)
    {

        var rightWalkImg = this.rightWalkImg,
            leftWalkImg = this.leftWalkImg,
            direction = this.direction,
            x = this.x, 
            y = this.y
        // let ctx = this.screen.context;
        // ctx.clearRect(this.x, this.y, this.width, this.height);
        if(direction == 'right')
        {
            this.screen.drawImage(x, y, rightWalkImg, this.width, this.height);
        } else {
            // ctx.save();
            // ctx.scale(-1, 1)
            // ctx.translate(this.width, 0)
            // this.screen.context.setTransform(1, .2, 0, 1, 0, 0); 
            this.screen.drawImage(x, y, leftWalkImg, this.width, this.height);
            // ctx.restore();
        }

        this.death(time)
    }

    /**
     * Смерть персонажа
     */
    death()
    {
        if (this.health == 0)
        {
            this.screen.clearRect();
            this.screen.drawImage(this.x, this.y, this.deathImg, this.width, this.height);
            this.afterDeath()
        }

    }

    /**
     * Что происходит после смерти
     */
    afterDeath()
    {

    }

    /**
     * Движение вправо
     */
    moveRight()
    {
        var step = this.step;
        this.x += step;
        this.direction = 'right';
        this.init();
    }

    /**
     * Движение влево
     */
    moveLeft()
    {
        var step = this.step;
        this.direction = 'left';
        this.init()
        if(this.x - (step + 10) < 0)
        {
            this.x = step + 10;
            this.y = this.y0;
        }
        this.x -= step;
    }

    /**
     * Получает удар
     */
    hit()
    {
        // this.health -= enemy.hit;
        if (this.health < 0)
        {
            this.health = 0;
        }
    }
}