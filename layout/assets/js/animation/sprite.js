export class Sprite 
{
    constructor(options) 
    {
        this.game = options.game;
        this.screen = this.game.screen;
        this.ctx = this.game.screen.context;

        this.image = options.image;

        this.frameIndex = 0;
        this.tickCount = 0;
        this.ticksPerFrame = options.ticksPerFrame || 0;
        this.numberOfFrames = options.numberOfFrames || 1;

        this.width = this.screen.width;
        this.height = this.screen.height;

        this.start();
    }

    update() 
    {
        this.tickCount++;

        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;
            if (this.frameIndex < this.numberOfFrames - 1) {
                this.frameIndex++;
            } else {
                this.frameIndex = 0;
            }
        }
    }

    render() 
    {
        this.ctx.clearRect(0, 0, this.width / this.numberOfFrames, this.height);
        this.ctx.drawImage(
            this.image,
            this.frameIndex * 1000 / this.numberOfFrames + 20,
            0,
            this.width / this.numberOfFrames,
            this.height,
            0,
            0,
            this.width / this.numberOfFrames,
            this.height
        )
    }
  
    start() 
    {
        let loop = () => {
            this.update();
            this.render();
  
            window.requestAnimationFrame(loop);
        }
  
        window.requestAnimationFrame(loop);
    }
}

let coinImage = new Image();
coinImage.src = 'https://www.cat-in-web.ru/wp-content/uploads/coin-sprite-animation.png';

let sprite = new Sprite({
    game: this,
    image: coinImage,
    width: 1000,
    height: 100,
    numberOfFrames: 10,
    ticksPerFrame: 4
})


  