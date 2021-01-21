/**
 * Абстрактный класс сцены
 */
export class Scene
{
    constructor(game, sceneTag)
    {
        this.game = game;
            this.player = game.player;

        // клавиатура
        this.control = this.game.control

        // объект экрана
        this.screen = this.game.screen;
        this.images = this.screen.images;

        this.dom = this.game.dom;
        this.scene = this.dom.getDivByClass(sceneTag);
        this.sceneTag = sceneTag;

        this.animation = this.game.textAnimation;
        this.status = this.constructor.WORKING;

        this.timer = 0; // счётчик для интервалов
        
    }

    // статус сцены (различные условия сцен)
    static get MENU() { return 'MENU'; }
    static get START_GAME() { return 'START_GAME'; }
    static get END() { return 'END'; }

    // запуск или перезапуск сцены
    init()
    {
        this.status = this.constructor.WORKING; // определяет, что сцена активна, либо переключить на следующую
    }

    /**
     * Завершает текущую сцену, переключая на status
     * @param {object} status Сцена, на которую переключаем 
     */
    finish(status)
    {
        this.status = status;
    }

    /**
     * Выполнение функции с интервалом
     */
    update(time)
    {
        if(this.timer == 0)
        {
            this.interval = time
        }
        if(this.timer != 0 && (time - this.timer) > 3000)
        {
            console.log('aga')
            this.timer = 0;
            // for(let enemy in this.enemies)
            // {
                // enemy = this.enemies[enemy];
                // setInterval(enemy.attack(), enemy.attackTime)
            // }
        }
    }

    render(time)
    {
    }

     /**
     * Гибкая функция, определяющая местоположение точки x объекта
     * так как карта в игре повторяющаяся, эта функция будет возвращать x объекта на отрезке повтора.
     * Например, фактически x = 3100, карта повторяется каждые x%1500, тогда эта функция вернёт x = 100
     * Необходимо для статичного изменения координаты (например, подъём на повторяющийся холм)
     * @return int
     */
    getX(object)
    {
            let xArr = String(object.x).split('');
            let point = xArr.splice(-4, 4);
            point = Number((String(point).replace(/[\s,]/g, '')));

            return point % (2 * (this.screen.width));
    }
}