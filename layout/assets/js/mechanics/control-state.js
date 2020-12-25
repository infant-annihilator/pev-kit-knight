/**
 * Класс клавиатуры
 */
export class ControlState
{
    constructor()
    {
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
        this.space = false;
        this.one = false;
        this.two = false;
        this.three = false;
        this.four = false;
        this.keyMap = new Map([
            [37,'left'],[39,'right'],[38,'up'],[40,'down'],[32,'space'],[49,'one'],[50,'two'],[51,'three'],[52,'four'] 
        ]);
        window.addEventListener('keydown', (event) => this.update(event, true));
        window.addEventListener('keyup', (event) => this.update(event, false));

        this.end = 27;
    }

    update(event, pressed)
    {
        if(this.keyMap.has(event.keyCode))
        {
            // event.preventDefault();
            event.stopPropagation();
            this[this.keyMap.get(event.keyCode)] = pressed;
        }
    }


}