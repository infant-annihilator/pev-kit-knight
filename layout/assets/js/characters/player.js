import { Character } from '../abstract-main/character';

/**
 * Класс игрока
 * @param {int} kills Количество убийств
 */
export class Player extends Character
{
    constructor(game, nickname, x, y)
    {
        super(game, x, y)
        this.direction = 'right';
        this.nickname = nickname;

        // this.skill = this.game.skill; // класс навыков игрока
        // this.skills = this.game.skills;

        this.y0 = y;
        this.width = 100;
        this.height = 115;
        this.standing = true;

        this.health = 100;
        this.mana = 100;

        this.damage = 15;
        this.damageArea = 50;

        // применён ли щит
        this.shield = false;

        this.kills = 0;
        this.damageArea = 100;

        // регенерация
        this.healthRegenInterval = 2000; // интервал регенерации, в милисекундах
        this.healthRegen = 2; // количество регенерируемого здоровья

        // регенерация
        this.manaRegenInterval = 2000; // интервал регенерации, в милисекундах
        this.manaRegen = 5; // количество регенерируемой маны

        this.rightWalkImg = 'player';
        this.leftWalkImg = 'player_reverse';
        this.deathImg = 'player_death';

        // враги
        this.enemies = this.game.enemies;

        this.hitsNum = 0;
        this.hitsMax = 1;
        this.attackRightImg = 'attack1_right';
        this.attackLeftImg = 'attack1_left';
        this.attackInterval = 1000;

        this.blockRightImg = 'block_right';
        this.blockLeftImg = 'block_left';

        this.step = 5; //скорость передвижения и длинна шага
        
        this.direction = 'right';
        this.intervalTimer = 0;
        this.intervalManaTimer = 0;
        this.intervalHealthTimer = 0;
        this.intervalAttackTimer = 0;
    }

    /**
     * Использование навыка игроком
     * @param {Integer} time 
     */
    useSkill(time)
    {
        this.skill = this.game.skill
        for(let skill in this.game.skills)
        {
            skill = this.game.skills[skill];
            skill.use(time);
        }

        this.attack();
    }

    /**
     * Регенерация здоровья
     * @param {int} time 
     */
    healthRegeneration(time)
    {
        if(this.intervalHealthTimer == 0)
        {
            this.intervalHealthTimer = time
        }
        if(this.intervalHealthTimer != 0 && (time - this.intervalHealthTimer) > this.healthRegenInterval)
        {
            if(this.health < 100)
            {
                if(this.health + this.healthRegen > 100)
                {
                    this.health = 100;
                }
                else
                {
                    this.health += this.healthRegen;   
                }
            }
            this.intervalHealthTimer = 0;
        }
    }

    /**
     * Регенерация маны
     * @param {int} time 
     */
    manaRegeneration(time)
    {
        if(this.intervalManaTimer == 0)
        {
            this.intervalManaTimer = time
        }
        if(this.intervalManaTimer != 0 && (time - this.intervalManaTimer) > this.manaRegenInterval)
        {
            if(this.mana < 100)
            {
                if(this.mana + this.manaRegen > 100)
                {
                    this.mana = 100;
                }
                else
                {
                    this.mana += this.manaRegen;   
                }
            }
            this.intervalManaTimer = 0;
        }
    }

    regen(time)
    {
        this.healthRegeneration(time)
        for(let skill in this.game.skills)
        {
            skill = this.game.skills[skill];
            if (!this.game.control.two)
            {
                this.manaRegeneration(time)
            }
        }
        
    }

    animation(filesNumber, fileFormat)
    {
        var num = 1;
        var imgs = {}
        const self = this;


        for(let i = 0; i < filesNumber; i++)
        {
            let image = new Image(100,200);
            image.src = '../character animation/knight/sprites/idle/idle000' + num + '.' + fileFormat;
            image.onerror = function() {
                this.onerror = null;
            };
            // console.log(image)
            
            imgs[num] = image;

            num++
        
        }
        return imgs
    }

    standing(time)
    {
        const self = this;
        setInterval(function() {
            self.animation();
        }, 1000)
    }

    /**
     * Игрока ударили
     * Если щит аквтиен, то урон не поступает
     * @param {int} damage Получаемый урон
     */
    hit(damage)
    {
        console.log(this.mana < 5)

        if(!this.game.control.two || this.mana <= 5)
        {
            this.health -= damage;
            if(this.health < 0)
            {
                this.health = 0;
            }
        }
        
    }

    /**
     * Атакует мобов
     * Интервал атаки определяется через this.attackInterval
     * Проверка, какие x врагов в диапазоне удара перед игроком
     * Количество нанесений удара умножается на количество живых врагов, \
     * чтобы все враги в области получали урон
     */
    attack(time)
    {
        let enemiesNum = 0;
        // количесвто врагов
        for(let enemy in this.game.enemies)
        {
            enemy = this.game.enemies[enemy];
            if(enemy.health > 0)
            {
                enemiesNum++;
                // var enemiesNumber = Object.keys(this.game.enemies).length,
            }
        }

        let hitsMax = this.hitsMax * enemiesNum;

        for(let enemy in this.game.enemies)
        {
            enemy = this.game.enemies[enemy];
            enemy.init();
            const self = this;

            if((enemy.x >= this.x - this.damageArea) && (enemy.x <= this.x + this.damageArea))
            {
                if(this.game.control.one)
                {
                    if(this.hitsNum < hitsMax)
                    {
                        this.hitsNum++;
                        enemy.hit(self.damage);
                    }
                }
                else
                {
                    this.hitsNum = 0;
                }
                // для продолжительного урона
                // this.hitsNum = 0;
            }

        }
    }

    afterDeath()
    {
        this.game.isPaused = true;
        $('#pause').text('Вы погибли.')
    }
}