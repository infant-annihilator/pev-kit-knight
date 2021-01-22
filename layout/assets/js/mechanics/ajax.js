/**
 * Класс ajax-запроса, отправляющего результаты
 * @param {object} player Объект игрока
 */
export class Ajax
{
    constructor(player)
    {
        this.player = player;
        this.game = this.player.game;

        this.jsonResponse = '';
    }

    /**
     * Отправляет запрос для сохранения текущего результата 
     * и получения всех результатов из базы данных
     */
    sendScore()
    {
        const self = this

        var username = this.player.nickname,
            score = this.player.kills,
            time = this.game.hud.time

        function getAjaxRequest() 
        {			
                $.ajax({
                    method: "POST",
                    url: "../php/register.php",
                    dataType : 'json',
                    data: {
                        username : username,
                        score: score,
                        time: time
                    },
                    success: function(data)
                    {
                        var response = data.responseText.split('___________________________________________')
                        self.jsonResponse = JSON.parse(response[0])
                    },
                    error: function(data) 
                    {
                        var response = data.responseText.split('___________________________________________')
                        self.jsonResponse = JSON.parse(response[0])
                    },
                    'cache':false
                    });		
                    }
        
        getAjaxRequest();
    }

    
}