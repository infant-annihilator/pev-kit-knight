import { Scene } from '../abstract-main/scene';
import { Ajax } from '../mechanics/ajax';

/**
 * Класс для сцены меню.
 * Обрабатывает блок с классом "screen-start".
 */
export class End extends Scene
{
    constructor(game)
    {
        super(game, 'screen-ranking');
        
        this.player = this.game.player;
        // добавляем анимацию
        this.loadingGif = '../layout/assets/img/loading.gif';

        this.ajax = new Ajax(this.player);
        this.check = 0; // проверка, чтобы результаты не рендерились бесконечно

        // ID элемента кнопки "начать заново"
        this.buttonStartAgainId = 'start-again'
    }

    /**
     * Гифка загрузки
     */
    loading()
    {
        var loading = $('<div class="loading" style="display: block; text-align: center"><img width="150px" src=' + this.loadingGif + '> <br> Загрузка...</div>');
        $('.panel').append(loading);
        $('#scores').hide();
    }

    init()
    {
        super.init();

        this.loading();

        this.showScores();

        // ajax-запрос для отправки результатов и дальнейшего сохранения их в базу данных
        this.ajax.sendScore();
   
    }

    /**
     * Функция, работающая постоянно
     */
    render(time)
    {
        if(this.player.respawnEndCheck == 1)
        {
            this.playerRespawn()
        }

        this.game.hud.paused = 0; 
        this.game.hud.pauseTimer();

        if ((this.ajax.jsonResponse != '') && (this.check == 0))
        {
            $('#scores').show();
            $('.loading').hide();
            this.check = 1;
            this.renderScores()
        }

        this.startAgain()
    }

    /**
     * Показывает табличку с результатами сразу при запуске сцены
     */
    showScores()
    {
        this.scene.hidden = false;
    }

    /**
     * Сортирует сначала по убийствам, а затем по времени
     * @param {array} arr Массив объектов 
     */
    sortScores(arr) 
    {
        arr.sort((a, b) => parseInt(a.score) == parseInt(b.score) ? (a.time > b.time ? 1 : -1) : b.score - a.score);
    }

    /**
     * Рендерит результаты
     */
    renderScores()
    {
        var players = this.ajax.jsonResponse,
            currentPlayerCheck = 0, // текущий ли игрок
            place = 0, // место игрока в рейтинге
            number = 0; // номер игрока вообще

        this.sortScores(players);

        for(let i in players)
        {
            var player = players[i];

            // если время предыдущего игрока равно текущему, то занимаемое место не меняется
            place += ((i > 0) && (players[i - 1].time) == player.time ? 0 : 1);
            number++;

            // если текущий игрок, то он выделяется в таблице рейтинга жирным шрифтом
            if (this.player.nickname == player.username && this.player.kills == player.score && this.game.hud.time == player.time && currentPlayerCheck == 0)
            {
                if(number > 10)
                {
                    $('#scores tr:last').remove();
                    number = 10;
                }

                var currentPlayer = true;
                currentPlayerCheck = 1;

            }
            else
            {
                var currentPlayer = false
            }

            var score = (currentPlayer ? '<tr style="font-weight: bolder; background: #DCDCDC">' : '<tr>') +
                        '<td>'
                        + place +
                        '</td> <td>' 
                        + player.username + 
                        '</td> <td>'
                        + player.score +
                        '</td> <td>'
                        + player.time +
                        '</td> </tr>'
                        + (currentPlayer ? '</b>' : '');

            if(number <= 10)
            {
                $('#scores').append(score);
            }
        }
    }

    /**
     * Кнопка "начать сначала"
     */
    startAgain()
    {
        let self = this;

        let submit = $('#' + this.buttonStartAgainId);

        switch(this.ajax.jsonResponse)
        {
            case '': 
                submit[0].style.background = '';
                submit[0].disabled = 'true';
            break

            default:
                submit[0].disabled = '';
                submit[0].style.background = 'green';
                submit[0].onclick = function(e)
                {
                    e.preventDefault();
                    self.scene.hidden = 'true';
                    self.finish(Scene.START_GAME);
                    self.player.respawn();
                }
            break
        }
        
        submit[0].onmouseout = function() {
            this.style.background = '';
        }
    }

    /**
     * Рекорды после респауна игрока
     */
    playerRespawn()
    {
        $('#scores').html('');
        this.ajax.jsonResponse = '';
        this.check = 0;

        // так как респаун уже совершён
        this.player.respawnEndCheck = 0;
    }
}