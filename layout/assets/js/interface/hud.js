/**
 * Интерфейс игрока
 */
export class HUD 
{
    constructor(game)
    {
        this.game = game;
            this.player = game.player;
            this.dom = this.game.dom;

        this.time = ''; // время в формате "мм:сс"

        this.divClasses = {
            username: 'user-info',
            health: 'panel-xp',
            mana: 'panel-mp',
            timer: 'timer',
            kills: 'kills'
        }

        for (let div in this.divClasses) {
            this.divClasses[div] = this.dom.getDivByClass(this.divClasses[div])
        }

        // ширина полоски здоровья
        this.health.style.width = '200px';
        this.healthFirstWidth = parseInt(this.health.style.width);

        // ширина полоски маны
        this.mana.style.width = '176px';
        this.manaFirstWidth = parseInt(this.mana.style.width);

        // таймер
        this.startTime;
        this.difference;
        this.tInterval;
        this.savedTime;
        this.paused = 0;
        this.running = 0;

        this.intervalTimer;
    }

    /**
    * геттеры для каждого блока интерфейса как html элемента
    */
    get username() { return this.divClasses.username };
    get health() { return this.divClasses.health };
    get mana() { return this.divClasses.mana };
    get timer() { return this.divClasses.timer };
    get kills() { return this.divClasses.kills };

    init()
    {
        this.setUsername();
        this.setTimer();
        // console.log(this.divClasses)
    }

    render()
    {
        this.setHealth();
        this.setMana();
        this.setKills();
    }

    setUsername()
    {
        this.username.innerHTML = this.player.nickname;
    }

    /**
     * Уменьшение ширины полоски здоровья в зависимости от количества здоровья
     */
    setHealth()
    {
        let healthN = document.querySelector('.' + this.health.className + ' span')
        healthN.innerText = this.player.health;

        let percent = (this.healthFirstWidth / 100)
        this.health.style.width = this.player.health * percent + 'px';
    }

    /**
     * Уменьшение ширины полоски маны в зависимости от количества маны
     */
    setMana()
    {
        let manaN = document.querySelector('.' + this.mana.className + ' span')
        manaN.innerText = this.player.mana;

        let percent = (this.manaFirstWidth / 100)
        this.mana.style.width = this.player.mana * percent + 'px';
    }

    /**
     * Изменение счётчика убийств в зависимости от this.player.kills
     */
    setKills()
    {
        let kills = document.querySelector('.' + this.kills.className)
        let killsInnerText = kills.innerText.split(': ');
        kills.innerText = killsInnerText[0] + ': ' + this.player.kills
    }

    /**
     * Эффект для используемого навыка на панели
     */
    setSkill()
    {
        let skill = document.querySelector('.' + this.skill.className)

    }

    setTimer()
    {

        const self = this;
        var timerArray = this.timer.innerHTML.split(':');    

        function startTimer()
        {
            if(!self.running){
                self.startTime = new Date().getTime();
                self.tInterval = setInterval(getShowTime, 1);
                self.paused = 0;
                self.running = 1;
            }
        }

        function getShowTime()
        {
            let updatedTime = new Date().getTime();
            if (self.savedTime){
                self.difference = (updatedTime - self.startTime) + self.savedTime;
            } else {
                self.difference =  updatedTime - self.startTime;
            }
            var minutes = Math.floor((self.difference % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((self.difference % (1000 * 60)) / 1000);

            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;
            
            self.time = minutes + ':' + seconds;
            self.timer.innerHTML = timerArray[0] + ': ' + minutes + ':' + seconds;

        }

        startTimer()
    }

    pauseTimer()
    {
        if (!this.difference)
        {
            // если таймер не стартовал
        } 
        else if (!this.paused)
        {
            clearInterval(this.tInterval);
            this.savedTime = this.difference;
            this.paused = 1;
            this.running = 0;
        } else {
            this.setTimer();
        }
    }

    resetTimer()
    {
        clearInterval(this.tInterval);
        this.time = '';
        this.savedTime = 0;
        this.difference = 0;
        this.paused = 0;
        this.running = 0;
        this.timer.innerHTML = 'Timer: 00:00'
    }
}