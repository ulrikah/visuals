/* TO DO 

- add acceleration / gravitation
- use offset to vary acceleration of the nodes

- user can change different parameters and choose if gravitation should be allowed (gforce = true | false)
*/

const n = 50; // number of nodes
const thr = 60; // threshold
const speed = 1;
const d = 20;
const jitter = 1;
let nodes = [];
let c;

setup = () => {
    colorMode(HSB, 255);
    c = color(0, 126, 255);
    
    createCanvas(600, 600);

    for (let i = 0; i < n; i++) {
        node = new Node(parseInt(random(width)),parseInt(random(height)), parseInt(random(3)), parseInt(random(3)));
        nodes.push(node);
  } 
};


draw = () => {   
    background(230);

    nodes.map( node => {
        node.move(node.xspeed, node.yspeed);
        node.glitch();
        drawEucDistance(node);
        node.display();
        
    });
};

function Node(x, y, xspeed = speed, yspeed = speed) {
    this.x = x;
    this.y = y;
    this.d = random(d/2, d);
    this.jitter = jitter; // too much jitter _may_ cause out of bounds
    this.xspeed = xspeed;
    this.yspeed = yspeed; // make individual for each nodes

    // makes movement seem more natural
    this.glitch = () => {
        this.x += random(-this.jitter, this.jitter);
        this.y += random(-this.jitter, this.jitter);
    };
    
    this.move = (x, y) => {
        let nextX = this.x + x; 
        let nextY = this.y + y;

        this.checkBorders(nextX, nextY);

        this.x = nextX;
        this.y = nextY;
    };

    this.checkBorders = (nextX, nextY) => {
        // horizontal
        if (nextX + this.jitter >= width || nextX - this.jitter <= 0)  {
            this.xspeed = (-1)*this.xspeed;
        }

        // vertical
        if (nextY + this.jitter >= height || nextY - this.jitter  <= 0) {
            this.yspeed = (-1)*this.yspeed;
        }            
    };

    this.display = () => {
        fill(c);
        ellipse(this.x, this.y, this.d, this.d);
    };
}


calcEucDist = (node1, node2) => {
    let xdiff = node2.x - node1.x;
    let ydiff = node2.y - node1.y;
    return Math.sqrt( xdiff*xdiff + ydiff*ydiff );
};


drawEucDistance = (node) => {
    for (let i = 0; i < nodes.length; i++) {
        if ( nodes[i] != node ) {
            let dist = calcEucDist(node, nodes[i]);
            if (dist < thr) {
                let offset = map(dist, 0, thr, 0, 0.7);
                push();
                strokeWeight(offset);
                line(node.x, node.y, nodes[i].x, nodes[i].y);
                pop();
            }
        }
    }
}
