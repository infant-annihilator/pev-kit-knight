/**
 * Абстрактный класс навыка (например, удар мечом, щит и т.д.)
 * @param {Object} game Класс игры 
 * @property {HTMLElement} hudElement Элемент из интерфейса с навыком
 * @property {Integer} mana Сколько маны потребляет за использование 
 * 
 */
export class Skill
{
    constructor(game)
    {
        this.game = game;
            this.control = this.game.control;
            this.screen = this.game.screen;
            this.player = this.game.player;
            this.hud = this.game.hud;

        this.hudElement = '';

        // сколько энергии потребляет
        this.mana = 0; 

        // таймеры
        this.manaDecreaseInterval = 0;
        this.intervalManaTimer = 0;

        // используется ли в данный момент
        this.using = false;
    }

    /**
     * рендеринг способности
     */
    render(time)
    {
        
    }

    /**
     * Ответственная кнопка
     */
    button()
    {

    }

    decreasePlayerMana(time)
    {
        if(this.intervalManaTimer == 0)
        {
            this.intervalManaTimer = time
        }
        // console.log(time)
        if(this.intervalManaTimer != 0 && (time - this.intervalManaTimer) > this.manaDecreaseInterval)
        {
            if(this.player.mana - this.mana < 0)
            {
                this.player.mana = 0;
            }
            else
            {
                this.player.mana -= this.mana;
            }
            this.intervalManaTimer = 0;
        }
    }

    /**
     * Использование способности
     */
    use(time)
    {
        // this.decreasePlayerMana()

        if(this.intervalTimer == 0)
        {
            this.intervalTimer = time
        }
       // if(this.game.control.one && this.intervalTimer != 0 && (time - this.intervalTimer) > this.attackInterval)
        this.render(time)
        // }
        this.intervalTimer = 0;
    }        
}