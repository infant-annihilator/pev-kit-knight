/**
 * Класс паузы
 */
export class Pause
{
    constructor(game)
    {
        this.game = game;
        this.screen = this.game.scenes.gameProcess.scene;
        this.div = document.querySelector('#pause');

        const self = this;

        // отмена паузы по нажатию на esc
        window.onkeydown = function(e) {
            const key = e.keyCode
          
            switch(key) {
              case 27: self.game.isPaused = !self.game.isPaused; break
            }
        }

    }

    init()
    {
        // стоп таймера
        this.game.hud.paused = 0; 
        this.game.hud.pauseTimer();

        // стоп регенерации
        this.game.player.intervalTimer = 0;

        // эффект блюра при паузе
        this.screen.style.filter = 'blur(5px)';
        this.div.hidden = false;
    }

    cancel()
    {
        this.div.hidden = true;
        this.screen.style.filter = '';
        this.game.hud.paused = 1; 
        this.game.hud.pauseTimer();
    }
}