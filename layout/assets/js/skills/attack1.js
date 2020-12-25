import { Skill } from "../abstract-main/skill";

/**
 * Абстрактный класс навыка (например, удар мечом, щит и т.д.)
 * @param {Object} game - класс игры 
 */
export class Attack1 extends Skill
{
    constructor(game)
    {
        super(game)
            this.player = this.game.player;
            this.control = this.game.control;


        this.rightImg = this.player.attackRightImg;
        this.leftImg = this.player.attackLeftImg;
    }

    /**
     * рендеринг способности
     */
    render()
    {
       // if(this.game.control.one && this.intervalTimer != 0 && (time - this.intervalTimer) > this.attackInterval)
       if(this.control.one)
       {
           
           // if((this.enemy.x >= this.x - this.damageArea) && (this.enemy.x <= this.x + this.damageArea))
           // {
               var attackRightImg = this.player.attackRightImg,
                   attackLeftImg = this.player.attackLeftImg,
                   direction = this.player.direction,
                   x = this.player.x, 
                   y = this.player.y

               if(direction == 'right')
               {
                   // this.screen.fillRect(this.healthColor, healthX, healthY, this.health, this.healthHeight);
                   // if(this.intervalTimer != 0 && (time - this.intervalTimer) > this.attackInterval)
                   // {
                       this.screen.clearRect();
                       this.screen.drawImage(x, y, attackRightImg, this.player.width + 100, this.player.height);
                   // }
               } else {            
                   // this.screen.fillRect(this.healthColor, healthX, healthY, this.health, this.healthHeight);
                   this.screen.clearRect();
                   this.screen.drawImage(x, y, attackLeftImg, this.player.width + 100, this.player.height);
               }

               // this.game.control.one = false;
           // }
           
           this.intervalTimer = 0;
       }
    }

}