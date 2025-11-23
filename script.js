const canvas = document.getElementById("mazeCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

const cellSize = 20;
const rows = canvas.height / cellSize;
const cols = canvas.width / cellSize;

/* Generate hard maze (95% difficulty) */
function generateMaze() {
    let maze = [];
    for (let r = 0; r < rows; r++) {
        maze[r] = [];
        for (let c = 0; c < cols; c++) {
            maze[r][c] = Math.random() > 0.95 ? 0 : 1; 
        }
    }
    maze[1][1] = 0;  
    maze[rows - 2][cols - 2] = 0; 
    return maze;
}

let maze = generateMaze();

let player = { r: 1, c: 1 };
let goal = { r: rows - 2, c: cols - 2 };

/* Draw Maze */
function drawMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (maze[r][c] === 1) {
                ctx.fillStyle = "#000";
            } else {
                ctx.fillStyle = "#fff";
            }
            ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
        }
    }

    ctx.fillStyle = "red";
    ctx.fillRect(player.c * cellSize, player.r * cellSize, cellSize, cellSize);

    ctx.fillStyle = "green";
    ctx.fillRect(goal.c * cellSize, goal.r * cellSize, cellSize, cellSize);
}

function movePlayer(dir) {
    let nr = player.r;
    let nc = player.c;

    if (dir === "up") nr--;
    if (dir === "down") nr++;
    if (dir === "left") nc--;
    if (dir === "right") nc++;

    if (maze[nr][nc] === 0) {
        player.r = nr;
        player.c = nc;
    }

    if (player.r === goal.r && player.c === goal.c) {
        clearInterval(timerInterval);
        document.getElementById("popupWin").classList.remove("hidden");
    }

    drawMaze();
}

/* Button Controls */
document.querySelectorAll(".control-btn").forEach(btn => {
    btn.addEventListener("touchstart", (e) => {
        e.preventDefault();
        movePlayer(e.target.dataset.dir);
    });
});

/* Swipe Gesture */
let startX = 0;
let startY = 0;

canvas.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

canvas.addEventListener("touchend", (e) => {
    let dx = e.changedTouches[0].clientX - startX;
    let dy = e.changedTouches[0].clientY - startY;

    if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 20) movePlayer("right");
        if (dx < -20) movePlayer("left");
    } else {
        if (dy > 20) movePlayer("down");
        if (dy < -20) movePlayer("up");
    }
});

/* TIMER */
let timeLeft = 60;
let timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = "Time: " + timeLeft + "s";

    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        document.getElementById("popupGameOver").classList.remove("hidden");
    }
}, 1000);

/* Restart Game */
function restartGame() {
    player = { r: 1, c: 1 };
    maze = generateMaze();
    timeLeft = 60;
    document.getElementById("popupGameOver").classList.add("hidden");
    document.getElementById("popupWin").classList.add("hidden");
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = "Time: " + timeLeft + "s";
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            document.getElementById("popupGameOver").classList.remove("hidden");
        }
    }, 1000);

    drawMaze();
}

document.getElementById("restartYes").onclick = restartGame;
document.getElementById("winRestart").onclick = restartGame;

document.getElementById("restartNo").onclick = () => {
    alert("Terima kasih sudah mencoba!");
};

drawMaze();
