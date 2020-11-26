
/**
 * Класс для анимации текста
 * Функции:
 * anmimateText - анимирует текст, будто его печатают
 * flasahingText - мигающий текст
 */
export class TextAnimation
{
    // аргумент конструктора - это текст ('text'), либо персонаж ('charachter')
    constructor(game)
    {
        this.game = game;
    }

    /**
     * анимирует текст, будто его печатают
     * @param {String} textTag - тэг текста, который надо анимировать
     * @param {Int} time - время печати в милисекундах
     */
    animateText(textTag, time)
    {        
        let tags = document.getElementsByTagName(textTag);

        for (let item of tags) {
            let str = item.innerHTML.split("");
            item.innerHTML = '';
            str.forEach(this.game.text.tagsOut);
            (function animate() 
            {
                let running = setTimeout(animate, time);
                str.length > 0 ? item.innerHTML += str.shift() : clearTimeout(running); 
            })();
        }
    }

    /**
     * Анимация мерцающего текста
     * @tag Тэг элемента
     * @color1 Первый цвет
     * @color2 Второй цвет
     */
    flashingText(tag, color1, color2)
    {
        let self = this.game;
        let elm = self.dom.getElementByTag(tag);

        //сколько какой цвет по времени
        let i = 0, 
            s = [color2, color1],
            t = [800, 800]; 
            
        function animate()
        {   
            i ^= 1
            elm.style.color = s[i];
            setTimeout(animate,t[i]);
        }
        animate()
    }
}