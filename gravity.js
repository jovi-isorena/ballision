const canvas = document.querySelector("canvas");
const c = canvas.getContext('2d');


window.addEventListener("resize", function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    create();
});

window.addEventListener("load", function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    create();
    animate();
    
});

window.addEventListener("click", ()=>{
    arrCircle=[];
});

var arrColor = [
    'lightpink',
    'grey',
    'lightblue'
];
let inum = 100;
let irad = 10;
let iradvar = 1;
let ispeedvar = 4;

class Circle {
    constructor(x, y, r, dx, dy, str, fll) {
        this.x = x;
        this.y = y;
        this.or = this.r = r;
        this.mass = 1;
        this.velocity = {
            x: dx,
            y: dy
        };
        this.dx = this.odx = dx;
        this.dy = this.ody = dy;
        this.str = str;
        this.fll = fll;
        this.gravity = 1;

        //---draw this circle in canvas
        this.draw = function () {
            c.beginPath();
            c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
            c.strokeStyle = 'black';
            c.stroke();
            c.fillStyle = this.fll;
            c.fill();
        };

        //---change coordinate of this circle and redraw in canvas
        this.update = function () {
            if(canvas.height - (this.y+this.r) < 1 && Math.abs(this.velocity.y) < 1){
                this.velocity.y = 0;
                this.y = canvas.height - this.r;
                this.gravity = 0;
            }
            else this.velocity.y += this.gravity;

            if (this.x > canvas.width - this.r || this.x < 0 + this.r)
                this.velocity.x = -this.velocity.x;
            if (this.y > canvas.height - this.r || this.y < 0 + this.r){
                this.velocity.y = -this.velocity.y;
                if(this.y + this.r >= canvas.height){
                    // if(this.velocity.y < 1 && this.gravity !==0) this.gravity = 0;
                    // else 
                    
                    this.velocity.y = (this.velocity.y * 0.7); 
                    // ((10-this.gravity) * 0.1)
                }
            }
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            
            //----gravity
            // this.gravity++;
            // if(this.gravity === 0){
            //     this.y =  canvas.height - this.r;
            // }
                
                

            // console.log(this.velocity.y);
            this.draw();
        };

        // this.addEventListener("mouseover", ()=>{
        //     c.strokeText("Hi", 20, 50, 150);
        // });

        
    }
}


var arrCircle = [];

function create(){
    arrCircle = [];
    var fastestx = 0;
    var fastesty = 0;
    for (let index = 0; index < inum; index++) {
        let r = ((Math.random() - 0.5) * (iradvar/100 * irad)) + irad;
        let x = Math.random() * (window.innerWidth - r * 2) + r;
        let y = Math.random() * (window.innerHeight - r * 2) + r;
        let dx = (Math.random() - 0.5) * ispeedvar;
        let dy = (Math.random() - 0.5) * ispeedvar;
        
        if(index !== 0){
            for(let i = 0; i<arrCircle.length; i++){
                if(hasCollided(x, y, r, arrCircle[i].x, arrCircle[i].y, arrCircle[i].r)){
                    x = Math.random() * (window.innerWidth - r * 2) + r;
                    y = Math.random() * (window.innerHeight - r * 2) + r;
                    i = -1;
                }
                
            }
        }
        arrCircle.push(new Circle(x,y,r,dx,dy,arrColor[index%arrColor.length],arrColor[index%arrColor.length]));
        
    }

}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    for (let index = 0; index < arrCircle.length; index++) {
        arrCircle[index].update();
    }
    // c.fillText("Hi", 20, 50, 100);
    
    
    
}

function hasCollided(x1, y1, r1, x2, y2, r2){
    // c2 = a2 + b2
    let a = x2 - x1;
    let b = y2 - y1;
    let c = r2 + r1;
    
    if(Math.pow(c,2) >= (Math.pow(a,2) + Math.pow(b,2))){
        // console.log(true);
        return true;
    }
    else{
        // console.log(false);
        return false;
    }
}