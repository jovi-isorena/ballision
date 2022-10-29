const canvas = document.querySelector("canvas");
const c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// canvas.setAttribute('margin-top', window.innerHeight/4);
// canvas.setAttribute("width",window.innerWidth);
// canvas.setAttribute("height",window.innerHeight);
// console.log(c);

// c.fillStyle = 'lightblue'
// c.fillRect(200,200,100,400);

// c.strokeStyle = "red";
// c.beginPath();
// c.moveTo(200,300);
// c.lineTo(255,400);
// c.stroke();

// c.beginPath();
// c.arc(450,340,40,0,Math.PI*2, false);
// c.stroke();
// c.fillStyle = "magenta"
// c.fill();

// function Circle(x,y,r,dx,dy){
//     this.x = x;
//     this.y = y;
//     this.r = r;
//     this.dx = dx;
//     this.dy = dy;
//     this.draw = function(){
//         c.beginPath();
//         c.arc(this.x,this.y,this.r,0,Math.PI*2, false);
//         c.stroke();
        
//     }

//     this.update = function(){
//         if(this.x > innerWidth - this.r || this.x < 0 + this.r)
//         this.dx = -this.dx;
//         if(this.y > innerHeight - this.r || this.y < 0 + this.r)
//         this.dy = -this.dy;
        
//         this.x += this.dx;    
//         this.y += this.dy;
//         this.draw();
//     }
// }
// for (let index = 0; index < 1; index++) {
//     var r = 40;
//     var x = Math.random() * (window.innerWidth - r * 2) + r;
//     var y = Math.random() * (window.innerHeight - r * 2) + r;
//     c.beginPath();
//     c.arc(x,y,r,0,Math.PI*2, false);
//     c.stroke();
    
// }
// var x = Math.random() * (window.innerWidth - r * 2) + r;
// var y = Math.random() * (window.innerHeight - r * 2) + r;
// var dx = 6;
// var dy = 6;
// var arrCircle = []
// for (let index = 0; index < 10; index++) {
//     var r = 40;
//     var x = Math.random() * (window.innerWidth - r * 2) + r;
//     var y = Math.random() * (window.innerHeight - r * 2) + r;
//     var dx = ((Math.random() - 0.5) * 10) + 4;
//     var dy = ((Math.random() - 0.5) * 10) + 4;
//     arrCircle.push(new Circle(x,y,r,dx,dy));
    
// }
// function animate(){
//     requestAnimationFrame(animate);
//     c.clearRect(0,0,innerWidth,innerHeight);
//     for (let index = 0; index < arrCircle.length; index++) {
//        arrCircle[index].update();
        
//     }
//     console.log('hey');
    // var r = 40;
    // // var x = Math.random() * (window.innerWidth - r * 2) + r;

    // // var y = Math.random() * (window.innerHeight - r * 2) + r;
    // c.beginPath();
    // c.arc(x,y,r,0,Math.PI*2, false);
    // c.stroke();
    // x += dx;
    // if(x > innerWidth - r || x < 0 + r)
    //     dx = -dx;
    // y += dy;
    // if(y > innerHeight - r || y < 0 + r)
    //     dy = -dy;
// }

// animate();