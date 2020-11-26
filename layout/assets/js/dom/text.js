/**
 * Предназначен для работы с текстом внутри страницы
 */
export class Text
{
    constructor()
    {
    }

    // Вырезает все теги из innerHTML, преназначено для использования с forEach
    // После каждого вырезанного тега вставляет текст с новой строки
    // Полезно, например, для перебора текста внутри тега <ul>
    tagsOut(element, index, array) {{
        let badIndexes = [];
        if (element == '<')
        {
            let i = index;
            let counter = 1
            while(array[i] != '>')
            {
                badIndexes.push(i);
                counter++;
                i++;
            }
            array = array.splice(index, counter, '<li>')
        }
        }
        return element;
    }
}