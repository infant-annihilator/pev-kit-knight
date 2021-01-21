import { Scene } from '../abstract-main/scene';

/**
 * Класс для сцены меню.
 * Обрабатывает блок с классом "screen-start".
 */
export class Menu extends Scene
{
    constructor(game)
    {
        super(game, 'screen-start');
        
        // добавляем анимацию
        this.animation.flashingText('h1', 'black', 'darkgrey');
        this.animation.animateText('li', 50);
    }

    // onload
    init()
    {
        super.init();
    }

    /**
     * Функция, работающая постоянно
     */
    render(time)
    {
        // this.game.screen.drawSprite(this.lightBringer);
        // super.render(time)
        this.validateForm()
    }

    /**
     * Проверяет, что форма не пустая
     * Еслти форма не пустая, то активирует кнопку и передаёт nickname
     */
    validateForm()
    {
        let self = this;

        let submit = document.querySelectorAll('.' + this.sceneTag + ' > .panel > form > input:last-child');
        let form = document.getElementsByName('nickname');

        switch(form[0].value.length)
        {
            case 0: 
                submit[0].style.background = '';
                submit[0].disabled = 'true';
            break

            default:
                submit[0].disabled = '';
                submit[0].style.background = 'green';
                submit[0].onclick = function(e)
                {
                    e.preventDefault()
                    self.scene.hidden = 'true';
                    self.finish(Scene.START_GAME);
                    self.player.nickname = form[0].value;
                }
            break
        }
        
        submit[0].onmouseout = function() {
            this.style.background = '';
        }
    }
}