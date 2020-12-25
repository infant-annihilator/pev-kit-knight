import { Skill } from "../abstract-main/skill";

/**
 * Абстрактный класс навыка (например, удар мечом, щит и т.д.)
 * @param {Object} game - класс игры 
 */
export class Block extends Skill
{
    constructor(game)
    {
        super(game)
            this.player = this.game.player;
            this.control = this.game.control;

        this.button = this.control.two;
        
        this.rightImg = this.player.attackRightImg;
        this.leftImg = this.player.attackLeftImg;

        this.mana = 5;
        this.manaDecreaseInterval = 1000;
        this.using = false;
    }

    render(time)
    {
        if (this.control.two && this.player.mana > this.mana)
        {
            this.using = true;
            this.decreasePlayerMana(time);

            var attackRightImg = this.player.blockRightImg,
                attackLeftImg = this.player.blockLeftImg,
                direction = this.player.direction,
                x = this.player.x, 
                y = this.player.y

            if(direction == 'right')
            {
                this.screen.clearRect();
                this.screen.drawImage(x, y, attackRightImg, this.player.width, this.player.height);
            } else {            
                this.screen.clearRect();
                this.screen.drawImage(x, y, attackLeftImg, this.player.width, this.player.height);
            }

            
            this.intervalTimer = 0;
        }
        else
        {
            this.using = false;
        }
        // console.log(this.using)
    }

    /**
     * Ответственная кнопка
     */
    button()
    {

    }        
}