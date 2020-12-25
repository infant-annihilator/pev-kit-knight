# pev-kit-knight
Игра на JavaScript. 
Использовался сборщик модулей webpack, чтобы разложить логику игры по разным модулям и папкам.

Скорее всего, для запуска должен быть установлен node.js (https://nodejs.org/en/) и вебпак 
Для установки просто напишите в консоли "git clone https://github.com/infant-annihilator/pev-kit-knight.git" (у вас должен быть установлен git)
 
Используемые клавишы: 1 - основной удар, 2 - щит, стрелки - передвижение игрока, esc - пауза
Последние изменения:
- Основные навыки персонажа (щит и обычная атака)
- Мана
- Смерть героя и врагов
- Классы врагов теперь создаются не в сцене GameProcess, а в главном классе Game
- и т.д.
Что нужно будет исправить:
- Определять кнопки навыков не в классе игрока, а в классах соотвтетсующих навыков 
- Движение по холмам (синусоидная функция, которая за это отвечает) слишком зависит от разрешения экрана
- Добавить анимацию через спрайты

Вся логика находится в /layout/assets/js


Там находятся следующие директории:


_relations - здесь лежит файл сборщика модулей, связывающий между собой все модули

abstract-main - здесь лежат главные абстрактные классы. Это класс сцены (scene, описывает основные правила для сцены, а также логику переключения между сценами), персонажа (character, добавляет основные свойства классу персонажа) и навка (skill, основные свойства классу навыков, которые может использовать игрок)

animation - здесь пока лежит только анимация текста (text-animation, в к), в перспективе будут классы для спрайтов

characters - здесь лежат классы разных персонажей: игрок (player), а также абстрактный класс врага (_enemy) и самих врагов (elf, greench, dog)

dom - здесь лежат классы, относящиеся к dom-элементам: это dom и text

interface - классы, относящиеся к интерфейсу игры: hud (интерфейс игрока) и screen (интерфейс экрана игры)

mechanics - здесь лежат классы, реализовывающие механику: класс клавиатуры (control-state), класс загрузки изображений (image-loader) и класс паузы (pause)

scenes - здесь лежат сцены игры: меню (menu) и процесс игры (game-process)

skills - здесь лежат навыки игрока: обычный удар и щит

game.js - главный класс игры, связывающий между собой все остальные

main.js - входной файл вебпака
