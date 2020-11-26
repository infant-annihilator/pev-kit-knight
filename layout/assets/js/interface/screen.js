import { ImageLoader } from '../mechanics/image-loader'

/**
 * Класс всего экрана и канваса
 * @parentTag Тэг элемента, к которому нужно присоединять канвас. 
 * Если пустой, то родителем автоматически станет body
 */
export class Screen
{
    constructor(width, height, parentTag)
    {
        this.parentTag = parentTag;
        this.width = width;
        this.height = height;
        this.canvas = this.createCanvas(width, height);
        document.body.style.overflow = 'hidden';
        this.context = this.canvas.getContext('2d');
        this.images = {};
        this.isImagesLoaded = false;
        this.center = this.width / 2;
    }

    // создадим канвас, либо если есть канвас, то используем его
    createCanvas(width, height)
    {
        let elements = document.getElementsByTagName('canvas');
        let canvas = elements[0] || document.createElement('canvas');

        switch(this.parentTag)
        {
            case undefined: this.parentTag = document.body; break
            default: this.parentTag = document.querySelector('.' + this.parentTag); break
        }

        canvas.width = width;
        canvas.height = height;

        this.parentTag.appendChild(canvas);
        return canvas;
    }

    loadImages(imageFiles)
    {
        const loader = new ImageLoader(imageFiles);
        loader.load().then((names) => {
            this.images = Object.assign(this.images, loader.images);
            this.isImagesLoaded = true;
            // console.log(names)
        })
    }

    fill(color)
    {
        this.context.fillStyle = color;
        this.context.fillRect(0,0,this.width,this.height)
    }

    print(x, y, text)
    {
        this.context.fillStyle = "#FFFFFF";
        this.context.font = "22px Georgia";
        this.context.fillText(text, x, y);
    }

    drawImage(x, y, imageName, w = 100, h = 100)
    {
        this.context.drawImage(this.images[imageName], x, y, w, h);
    }

    drawSprite(sprite)
    {
        this.context.drawImage(this.images[sprite.imageName],
            sprite.sourceX, sprite.sourceY, sprite.width, sprite.height,
            sprite.x, sprite.y, sprite.width, sprite.height);
    }

    clearRect()
    {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    fillRect(color, x, y, width, height)
    {
        this.context.fillStyle = color;
        this.context.fillRect(x, y, width, height);
    }
}