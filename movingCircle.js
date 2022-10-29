const canvas = document.querySelector("canvas");
const c = canvas.getContext('2d');

const counter = document.querySelector("b");
const num = document.querySelector("#num");
const rad = document.querySelector("#rad");
const radvar = document.querySelector("#radvar");
// const speed = document.querySelector("#speed");
const speedvar = document.querySelector("#speedvar");
// const generate = document.querySelector("#generate");
const col = document.querySelector("#collision");
const grav = document.querySelector("#gravity");
let imageObj = new Image();


grav.addEventListener("click", ()=>{
    if(!grav.checked) create();
});

col.addEventListener("click", ()=>{
    arrCircle.forEach(element =>{
        element.gravity = 1;
    }) 
});

let magnifier  = true;

num.addEventListener("mousemove", ()=>{
    document.querySelector("#txtNum").innerText = num.value;
});
rad.addEventListener("mousemove", ()=>{
    document.querySelector("#txtRad").innerText = rad.value;
});
radvar.addEventListener("mousemove", ()=>{
    document.querySelector("#txtRadVar").innerText = radvar.value;
});
speedvar.addEventListener("mousemove", ()=>{
    document.querySelector("#txtSpdVar").innerText = speedvar.value;
});


num.addEventListener("change", ()=>{
    document.querySelector("#txtNum").innerText = num.value;
});
rad.addEventListener("change", ()=>{
    document.querySelector("#txtRad").innerText = rad.value;
});
radvar.addEventListener("change", ()=>{
    document.querySelector("#txtRadVar").innerText = radvar.value;
});
speedvar.addEventListener("change", ()=>{
    document.querySelector("#txtSpdVar").innerText = speedvar.value;
});


num.addEventListener("mouseup", create);
rad.addEventListener("mouseup", create);
radvar.addEventListener("mouseup", create);
speedvar.addEventListener("mouseup", create);

let inum = parseInt(num.value);
let irad = parseInt(rad.value);
let iradvar = radvar.value;
let ispeedvar = speedvar.value;

window.addEventListener("resize", function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.7;
    create();
});

window.addEventListener("load", function(){
    
    imageObj.src = "maybel.png";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.7;
    document.querySelector("#txtNum").innerText = num.value;
    document.querySelector("#txtRad").innerText = rad.value;
    document.querySelector("#txtRadVar").innerText = radvar.value;
    document.querySelector("#txtSpdVar").innerText = speedvar.value;
    
    create();
    animate();
});

generate.addEventListener("click", function(){
    inum = parseInt(num.value);
    irad = parseInt(rad.value);
    iradvar = radvar.value;
    ispeedvar = speedvar.value;
    create();
});

var mouse = {
    x: undefined,
    y: undefined,
    r: 50
};

var arrColor = [
    'lightpink',
    'grey',
    'lightblue'
];

//---------click to explode circles
canvas.addEventListener("click", function(){
    for (let index = 0; index < arrCircle.length; index++) {
        arrCircle[index].explode(); 

    }
});
canvas.addEventListener('mousemove', 
    function(event){
        mouse.x = event.offsetX;
        mouse.y = event.offsetY;
});
canvas.addEventListener('mouseleave',
    function(event){
        mouse.x = undefined;
        mouse.y = undefined;
});
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
        this.gravity = 1;
        this.dx = this.odx = dx;
        this.dy = this.ody = dy;
        this.str = str;
        this.fll = fll;

        //---draw this circle in canvas
        this.draw = function () {
            c.beginPath();
            c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
            c.strokeStyle = "black";
            c.stroke();
            c.fillStyle = this.fll;
            c.fill();
            c.drawImage(imageObj,this.x-this.r*2, this.y-this.r*2, this.r*4, this.r*4);
        };

        //---change coordinate of this circle and redraw in canvas
        this.update = function () {
            if(grav.checked){
                if(canvas.height - (this.y+this.r) < 1 && Math.abs(this.velocity.y) < 1){
                    this.velocity.y = 0;
                    this.y = canvas.height - this.r;
                    //
                    this.gravity = 0;
                }
                else this.velocity.y += this.gravity;
                this.velocity.x = this.velocity.x * .99;
                // this.velocity.y = this.velocity.y * .99;
            }

            if (this.x > canvas.width - this.r || this.x < 0 + this.r)
                this.velocity.x = -this.velocity.x;
            if (this.y > canvas.height - this.r || this.y < 0 + this.r){
                this.velocity.y = -this.velocity.y;
                if(this.y + this.r >= canvas.height && grav.checked){
                    // if(this.velocity.y < 1 && this.gravity !==0) this.gravity = 0;
                    // else 
                    
                    this.velocity.y = (this.velocity.y * 0.7); 
                    // ((10-this.gravity) * 0.1)
                }
            }
            
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            if(magnifier){
                if (mouse.x - this.x < mouse.r && mouse.x - this.x > -mouse.r && mouse.y - this.y < mouse.r && mouse.y - this.y > -mouse.r) {
                    if (this.r < 50)
                        // this.r = this.or;
                        this.r += 4;
                    // else this.r += 3;
                }
                else if (this.r > this.or)
                    this.r = this.r * .99;
            }
            
            //----collision detection
            if(col.checked){
                for (let i = 0; i < arrCircle.length; i++) {
                    if(this === arrCircle[i]) continue;
                    
                    if(hasCollided(this.x, this.y, this.r, arrCircle[i].x, arrCircle[i].y, arrCircle[i].r)){
                        resolveCollision(this, arrCircle[i]);
                    }
                }
            }
            // for (let i = 0; i < arrCircle.length; i++) {
            //     if(this === arrCircle[i]) continue;
                
            //     if(hasCollided(this.x, this.y, this.r, arrCircle[i].x, arrCircle[i].y, arrCircle[i].r)){
            //         resolveCollision(this, arrCircle[i]);
            //     }
            // }

            //---essential to explode function. this slows down the speed of the circle to its original velocity
            if (Math.abs(this.dx) > Math.abs(this.odx) || Math.abs(this.dy) > Math.abs(this.ody)) {
                this.dx = this.dx * .99;
                this.dy = this.dy * .99;
            }

            //----gravity
            


            this.draw();
        };

        //---check if this circle is within cursor's range for magnification
        this.touched = function int() {
            if (mouse.x - this.x < mouse.r && mouse.x - this.x > -mouse.r && mouse.y - this.y < mouse.r && mouse.y - this.y > -mouse.r) {
                return 1;
            }
            else
                return 0;
        };

        //---speed up this circle if clicked
        this.explode = function () {
            if (this.touched() == 1) {
                this.dx = this.dx * 20;
                this.dy = this.dy * 20;
            }
        };
    }
}


var arrCircle = [];

function create(){
    inum = parseInt(num.value);
    irad = parseInt(rad.value);
    iradvar = radvar.value;
    ispeedvar = speedvar.value;

    arrCircle = [];
    var fastestx = 0;
    var fastesty = 0;
    for (let index = 0; index < inum; index++) {
        // var r = Math.random() * (iradvar - 1) + irad;
        // var r = Math.random() * irad;
        let r = ((Math.random() - 0.5) * (iradvar/100 * irad)) + irad;
        let x = Math.random() * (canvas.width - r * 2) + r;
        let y = Math.random() * (canvas.height - r * 2) + r;
        
        let dx = (Math.random() - 0.5) * ispeedvar;
        let dy = (Math.random() - 0.5) * ispeedvar;
        // var ranSpdX = Math.random() - 0.5;
        // var ranSpdY = Math.random() - 0.5;
        
        // var dx =  (ranSpdX * ispeedvar) + (ispeed * (ranSpdX/Math.abs(ranSpdX))) ;
        // var dy =  (ranSpdY * ispeedvar) + (ispeed * (ranSpdY/Math.abs(ranSpdY))) ;
        if(index !== 0){
            for(let i = 0; i<arrCircle.length; i++){
                if(hasCollided(x, y, r, arrCircle[i].x, arrCircle[i].y, arrCircle[i].r)){
                    
                    // console.log("Collides");
                    x = Math.random() * (canvas.width - r * 2) + r;
                    y = Math.random() * (canvas.height - r * 2) + r;
                    i = -1;
                    // console.log(x);
                    // continue;
                }
                // else{
                //     // index--;
                //     // console.log("Collides");
                //     // continue;
                    
                //     arrCircle.push(circle);
                // }
            }
        }
        arrCircle.push(new Circle(x,y,r,dx,dy,arrColor[index%arrColor.length],arrColor[index%arrColor.length]));
        
    }
    arrCircle.forEach(element => {
        // console.log(element.r);
        // console.log(element.dx);
        // console.log(element.dy);
    });
}

function animate(){
    
    // var sum=0;

    requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width,canvas.height);
    for (let index = 0; index < arrCircle.length; index++) {
        arrCircle[index].update();
        // sum += arrCircle[index].touched();
    }
    
    // counter.innerText = sum;
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


/**
 * Rotates coordinate system for velocities
 *
 * Takes velocities and alters them as if the coordinate system they're on was rotated
 *
 * @param  Object | velocity | The velocity of an individual particle
 * @param  Float  | angle    | The angle of collision between two objects in radians
 * @return Object | The altered x and y velocities after the coordinate system has been rotated
 */

function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}

/**
 * Swaps out two colliding particles' x and y velocities after running through
 * an elastic collision reaction equation
 *
 * @param  Object | particle      | A particle object with x and y coordinates, plus velocity
 * @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
 * @return Null | Does not return a value
 */

function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}