import { Scene } from '../abstract-main/scene';

/**
 * Класс для сцены меню.
 * Обрабатывает блок с классом "screen-start".
 */
export class End extends Scene
{
    constructor(game)
    {
        super(game, 'screen-ranking');
        
        // добавляем анимацию
        this.animation.flashingText('h1', 'black', 'darkgrey');
        this.animation.animateText('li', 50);
    }

    init()
    {
        super.init();
        this.showScores();
    }

    /**
     * Функция, работающая постоянно
     */
    render(time)
    {
        this.game.hud.paused = 0; 
        this.game.hud.pauseTimer();
    }

    /**
     * Показывает табличку с результатами сразу при запуске сцены
     */
    showScores()
    {
        this.scene.hidden = false;
    }
}