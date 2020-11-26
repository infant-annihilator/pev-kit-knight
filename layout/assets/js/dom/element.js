/**
 * Работает с элементами внутри DOM дерева
 */
export class DOMElement
{
    constructor()
    {
    }

    /**
     * возвращает родительский блок, относящийся к конкретной сцене
     * в аргументы передаётся класс див блока сцены, например меню - "screen screen-start show"
     */
    getDivByClass(divClass)
    {
        return document.querySelector('.' + divClass);
    }

    /**
     * возвращает DOM элемент по тэгу
     * в аргументы передаётся тэг
     */
    getElementByTag(tag)
    {
        return document.querySelector(tag);
    }

    /**
    * Возвращает дочерний элемент
    * В аргументы передаётся класс родителя
    */

}