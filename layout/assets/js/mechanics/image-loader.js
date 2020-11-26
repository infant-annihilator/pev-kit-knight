/**
 * Класс, который грузит все картинки до начала игры
 */
export class ImageLoader
{
    constructor(imageFiles)
    {
        this.imageFiles = imageFiles;
        this.images = {};
    }

    load()
    {
        const promises = [];
        for (let name in this.imageFiles)
        {
            promises.push(this.loadImage(name, this.imageFiles[name]))
        }
        return Promise.all(promises);
    }

    loadImage(name, src)
    {
        return new Promise((resolve) => {
            const image = new Image();
            this.images[name] = image;
            image.onload = () => resolve(name);
            image.onerror = function() {
                console.log(image);
            };
            image.src = src;
        })
    }

    loadImagesFromFolder(folder)
    {
        // const fs = require('fs');
        // const dir = './scenes';

        // fs.readFile("file.txt", "utf8", function(error, text) {
        //     if (error)
        //       throw error;
        //     console.log("А в файле том было:", text);
        //   });
    }
}