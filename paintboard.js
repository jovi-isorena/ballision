const canvas = document.querySelector("canvas");
const c = canvas.getContext('2d');
const color = document.querySelector("#color");
const reset = document.querySelector("#reset");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var mousedown = false;

reset.addEventListener("click", function(){
    c.fillStyle = "white";
    c.fillRect(0,0,canvas.width, canvas.height);
});

canvas.addEventListener("mousedown", function(event){
    mousedown = true;
    c.beginPath();
    // c.moveTo(event.offsetX, event.offsetY);
    // draw(event.offsetX, event.offsetY,10,color.value);
    console.log("down");
});


canvas.addEventListener("mousemove", function(event){
    if(mousedown){
        console.log("X:" + event.offsetX + "Y: " + event.offsetY);
        draw(event.offsetX, event.offsetY,10,color.value);
    }
});

canvas.addEventListener("mouseup", function(event){
    mousedown = false;
    c.closePath();
    console.log("up");
});


function draw(x,y,r,color){
    //---------------circle
    // this.x = x;
    // this.y = y;
    // this.r = r;
    // this.color = color;
    // c.beginPath();
    // c.arc(this.x,this.y,this.r,0, Math.PI*2,false);
    // c.fillStyle = this.color;
    // c.fill();



    //-----------------line
    c.lineTo(x,y);
    c.strokeStyle = color;
    c.stroke();
    
    console.log("draw");
    
}




// c.fillStyle = "blue";
// c.fillRect(100,100,100,100);

// c.beginPath();
// c.moveTo(200,200);
// c.lineTo(300,300);


// c.beginPath();
//     c.arc(100,100,10,0, Math.PI*2,false);
//     c.fillStyle = this.color;
//     c.fill();
//     c.stroke();


//     c.beginPath();
//         c.arc(this.x,this.y,this.r,0,Math.PI*2, false);
//         c.strokeStyle = this.str;
//         c.stroke();
//         c.fillStyle = this.fll;
//         c.fill();