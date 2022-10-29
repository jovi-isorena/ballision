const canvas = document.querySelector("canvas");
const c = canvas.getContext('2d');

window.addEventListener("load", ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    create();
    animate();
});
window.addEventListener("resize", ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

var arrColor = [
    'pink',
    'lightblue',
    'lightgreen',
    'grey'
];

class Circle{
    constructor(x, y, r, dx, dy, str, fll) {
        this.x = x;
        this.y = y;
        this.or = this.r = r;
        this.mass = 1;
        this.velocity = {
            x: dx,
            y: dy
        };
        this.odx = dx;
        this.ody = dy;
        this.str = str;
        this.fll = fll;

        //---draw this circle in canvas
        this.draw = function () {
            c.beginPath();
            c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
            c.fillStyle = this.fll;
            c.fill();
            c.strokeStyle = this.str;
            c.stroke();
        };

        //---change coordinate of this circle and redraw in canvas
        this.update = function () {
            if (this.x > innerWidth - this.r || this.x < 0 + this.r)
                this.velocity.x = -this.velocity.x;
            if (this.y > innerHeight - this.r || this.y < 0 + this.r)
                this.velocity.y = -this.velocity.y;

            this.x += this.velocity.x;
            this.y += this.velocity.y;

            for (let i = 0; i < arrCircle.length; i++) {
                // console.log("for");
                if(this === arrCircle[i]) continue;
                
                if(hasCollided(this.x, this.y, this.r, arrCircle[i].x, arrCircle[i].y, arrCircle[i].r)){
                    console.log("collision");
                    // this.velocity.x = -this.velocity.x;
                    // this.velocity.y = -this.velocity.y;
                    // arrCircle[i].velocity.x = -arrCircle[i].velocity.x;
                    // arrCircle[i].velocity.y = -arrCircle[i].velocity.y;
                    resolveCollision(this, arrCircle[i]);
                    
                }
            
                
            }
            
            
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
                this.velocity.x = this.velocity.x * 20;
                this.velocity.y = this.velocity.y * 20;
            }
        };
    }
}


var arrCircle;

function create() {
    arrCircle = [];
    
    for (let index = 0; index < 200; index++) {
        let r = 20;
        let x = Math.random() * (window.innerWidth - r * 2) + r;
        let y = Math.random() * (window.innerHeight - r * 2) + r;
        
        let dx = (Math.random() - 0.5) * 3;
        let dy = (Math.random() - 0.5) * 3;

        // circle = new Circle(x,y,r,dx,dy,arrColor[index%3],arrColor[index%3]);
        
        if(index !== 0){
            for(let i = 0; i<arrCircle.length; i++){
                if(hasCollided(x, y, r, arrCircle[i].x, arrCircle[i].y, arrCircle[i].r)){
                    
                    // console.log("Collides");
                    x = Math.random() * (window.innerWidth - r * 2) + r;
                    y = Math.random() * (window.innerHeight - r * 2) + r;
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
        console.log(arrCircle.r);
    });
    
}

function animate(){

    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    arrCircle.forEach(element => {
        element.update();
    });
    
    
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