// DOM Elements
const rulesBtn = document.getElementById('rules-btn');
const rulesDiv = document.getElementById('rules');
const closeBtn = document.getElementById('close-btn');
// Our CANVAS context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let score = 0;

// Brick Row and Columns
const brickRowCount = 9;
const brickColumnCount = 5;

// // Filling the canvas (FROM EXAMPLE)
// ctx.fillStyle = 'green';
// ctx.fillRect(10,10,150,100)

// Ball properties
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size:10,
    speed: 4,
    dx: 2,
    dy:-2
}

// Paddle properties
const paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed:4,
    dx: 0
}

// Brick properties
const brickInfo = {
    w:70,
    h:20,
    padding:10,
    offsetX: 45,
    offsetY: 60,
    visible: true
}

// Create the bricks
const bricks = [];
for(let i = 0; i < brickRowCount; i++){
    bricks[i] = [];
    for(let j = 0; j < brickColumnCount; j++){
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
        bricks[i][j] = {x, y, ...brickInfo}
    }
}

// Draw the ball on the canvas
function drawBall(){
    ctx.beginPath();
    // specifies the circle
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    // Fills the circle
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(){
    ctx.beginPath();
    ctx.fillStyle = '#0095dd';
    ctx.rect(paddle.x,paddle.y,paddle.w,paddle.h)
    ctx.fill();
    ctx.closePath();
}

// Draw bricks on canvas
function drawBricks(){
    bricks.forEach(column =>{
        // On each column, draw a brick
        column.forEach(brick =>{
            ctx.beginPath();
            ctx.rect(brick.x,brick.y,brick.w,brick.h)
            ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
            ctx.fill();
            ctx.closePath();
        })
    })
}


// Draw score on canvas
function drawScore(){
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

// Move paddle on the Canvas
function movePaddle(){
    paddle.x += paddle.dx;

    // Wall detection
    if(paddle.x + paddle.w > canvas.width){
        paddle.x = canvas.width - paddle.w;
    }

    if(paddle.x < 0){
        paddle.x = 0;
    }
}

// Move the ball on canvas
function moveBall(){
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Wall collision detection (X Axis)
    if(ball.x + ball.size > canvas.width || ball.x - ball.size < 0){
        ball.dx *= -1; // Same as ball.dx = ball.dx * -1
    }

    // Wall collision detection (Y Axis)
    if(ball.y + ball.size > canvas.height || ball.y - ball.size < 0){
        ball.dy *= -1;
    }

    // Paddle collision
    if(ball.x - ball.size > paddle.x && ball.x + ball.size < paddle.x + paddle.w && ball.y + ball.size > paddle.y){
        ball.dy = -ball.speed;
    }

    // Brick collision
    bricks.forEach(column =>{
        column.forEach(brick =>{
            if(brick.visible){
                if(
                    ball.x - ball.size > brick.x && // left brick side check
                    ball.x + ball.size < brick.x + brick.w && // right brick side check
                    ball.y + ball.size > brick.y && // top brick side check
                    ball.y - ball.size < brick.y + brick.h
                ){
                    ball.dy *= -1;
                    brick.visible = false;
                    // Increase the score
                    increaseScore()
                }
            }
        })
    })

    // Bottom Wall collision - lose game and start over
    if(ball.y + ball.size > canvas.height){
        showAllBricks();
        score = 0;
    }
}

function increaseScore(){
    score++;
    // Check if any remaining bricks. Result of score % (9 * 5) should be 0
    if(score % (brickRowCount * brickColumnCount) === 0){
        showAllBricks()
        score = 0
    }

}

// Make all bricks appear
function showAllBricks(){
    bricks.forEach(column =>{
        column.forEach(brick =>{
            brick.visible = true;
        })
    })
}

// Draw everything
function draw(){
    // Clear the canvas first
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBall()
    drawPaddle();
    drawScore();
    drawBricks();
}

function update(){
    moveBall()
    movePaddle();
    // Draw everything
    draw();

    // Must callback itself
    requestAnimationFrame(update)
}

// Keyboard events
function keyDown(e){
    if(e.key === "ArrowRight" || e.key === "Right"){
        paddle.dx = paddle.speed;
    } else if(e.key === "ArrowLeft" || e.key === "Left"){
        paddle.dx = -paddle.speed;
    }
}
function keyUp(e){
    if(e.key === "ArrowRight" || e.key === "Right" || e.key === "ArrowLeft" || e.key === "Left"){
        console.log(paddle.dx)
    }
}
// Init
update()

/* 🎧🎧🎧 EVENT LISTENERS 🎧🎧🎧 */
rulesBtn.addEventListener('click',()=>{
    rulesDiv.classList.add('show');
})

closeBtn.addEventListener('click',()=>{
    rulesDiv.classList.remove('show');
})

// Keyboard events
document.addEventListener('keydown', keyDown);
document.addEventListener('keydown', keyUp);


