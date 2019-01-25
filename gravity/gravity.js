

const d = 30;
let balls = [];

setup = () => {
    
    createCanvas(600, 600);

    let ball = new Ball();
    balls.push(ball);
}


draw = () => {   
    background(230);

    balls.map( ball => {
        ball.move(ball.vx, ball.vy);
        ball.display();
        
    })
}

function Ball(x = width/2, y = height/4, vx = 0, vy = 3, ax = 0, ay = 2) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.ax = ax;
    this.ay = ay;

    this.d = d;
    
    this.move = (x, y) => {

        // TODO: implement some condition so that it stops calculating moves when dx becomes too small

        this.vx = this.vx + this.ax; 
        this.vy = this.vy + this.ay;

        let nextX = this.x + this.vx;
        let nextY = this.y + this.vy;

        this.checkBorders(nextX, nextY);

        this.x = nextX;
        this.y = nextY;
    };

    this.checkBorders = (nextX, nextY) => {

        // horizontal
        if (nextX + this.d > width || nextX - this.d <= 0)  {
            this.vx = (-1)*this.vx;
        }

        // vertical
        if (nextY + this.d > height || nextY - this.d <= 0) {
            this.vy = (-1)*this.vy;
        }
    }

    this.display = () => {
        fill(0, 255, 145);
        ellipse(this.x, this.y, this.d, this.d);
    };
}

/*


v = s * t

a = v / s


*/ 