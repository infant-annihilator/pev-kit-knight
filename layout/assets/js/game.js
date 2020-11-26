import { Screen } from './interface/screen';
import { HUD } from './interface/hud';
import { TextAnimation } from './animation/text-animation';
import { ControlState } from './mechanics/control-state';
import { Scene } from './abstract-main/scene';
    import { Menu } from "./scenes/menu";
    import { GameProcess } from "./scenes/game-process";
import { Character } from './abstract-main/character';
    import { Player } from './characters/player';
    import { Elf } from './characters/elf';
import { DOMElement } from './dom/element';
import { Text } from './dom/text';
import { Pause } from "./mechanics/pause";

/**
 * Главный класс игры
 * Объединяет между собой все модули
 */
export class Game 
{
    // ожидаем объект с настройками, но он не обязательный и может быть пустым
    // window.innerWidth и innerHeight передают размер экрана
    constructor({width = 1240, height = window.innerHeight} = {})
    {
        this.isPaused = false;

        this.screen = new Screen(width, height, 'screen-game');
        // грузим картинки
        this.screen.loadImages({
            
            player: '../character animation/knight/sprites/idle/idle0001.png',
            player_reverse: '../character animation/knight/sprites/idle/idle_reverse.png',
            player_death: '../character animation/knight/sprites/death/death0049.png',
            attack1_right: '../character animation/knight/sprites/attack1/attack10014.png',
            attack1_left: '../character animation/knight/sprites/attack1/attack1_reverse.png',
            block_right: '../character animation/knight/sprites/block/block0012.png',
            block_left: '../character animation/knight/sprites/block/block_reverse.png',

            elf: '../character animation/enemies/elf/sprites/Run/Run_001.png',
            elf_reverse: '../character animation/enemies/elf/sprites/Run/Run_reverse.png',
            elf_attack_right: '../character animation/enemies/elf/sprites/Attack/Attack2_013.png',
            elf_attack_left: '../character animation/enemies/elf/sprites/Attack/Attack_reverse.png',
            elf_death_right: '../character animation/enemies/elf/sprites/Death/Die_019.png',
            elf_death_left: '../character animation/enemies/elf/sprites/Death/Die_reverse.png',

            greench: '../character animation/enemies/greench/sprites/Run/Run_003.png',
            greench_reverse: '../character animation/enemies/greench/sprites/Run/Run_reverse.png',
            greench_attack_right: '../character animation/enemies/greench/sprites/Attack/Attack2_010.png',
            greench_attack_left: '../character animation/enemies/greench/sprites/Attack/Attack_reverse.png',
            greench_death_right: '../character animation/enemies/greench/sprites/Death/Die_019.png',
            greench_death_left: '../character animation/enemies/greench/sprites/Death/Die_reverse.png',

            dog: '../character animation/enemies/dog/sprites/run/1.png',
            dog_reverse: '../character animation/enemies/dog/sprites/run/Run_reverse.png'
        });
        this.control = new ControlState();
            this.player = new Player(this);
            this.elf = new Elf(this);

        this.text = new Text;
        this.dom = new DOMElement;

        this.hud = new HUD(this);
        this.textAnimation = new TextAnimation(this);
        this.scenes = {
            menu: new Menu(this),
            gameProcess: new GameProcess(this)
        };
        this.currentScene = this.scenes.menu; // устанавливаем текущую сцену
        this.currentScene.init();

        this.pause = new Pause(this);
    }

    /**
     * @param {string} status
     * Механизм переключения сцен
     * В аргументы передаётся статус текущей сцены
     */
    changeScene(status)
    {
        switch (status) 
        {
            case Scene.MENU:
                return this.scenes.menu;

            case Scene.START_GAME:
                return this.scenes.gameProcess;

            default:
                return this.scenes.menu;
        }
    }

    /**
     * Функция для requestAnimationFrame
     * Здесь же логика паузы 
     */
    frame(time)
    {
        // проверка на паузу
        if(!this.isPaused)
        {
            this.pause.cancel()

            // механизм переключения сцен: если сцена неактивна, то берём следующую
            if(this.currentScene.status != Scene.WORKING)
            {
                this.currentScene = this.changeScene(this.currentScene.status);
                this.currentScene.init();
            }
            this.currentScene.render(time);
        } 
        else
        {
            this.pause.init()
        }

        requestAnimationFrame(time => this.frame(time))
    }

    run()
    {
        requestAnimationFrame(time => this.frame(time))
    }
}