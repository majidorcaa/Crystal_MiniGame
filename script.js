const canvas = document.getElementById("mazeCanvas");
const ctx = canvas.getContext("2d");

const tile = 30;

const maze = [
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,1,0,0,0,0,1],
    [1,0,1,0,1,0,1,1,0,1],
    [1,0,1,0,0,0,0,1,0,1],
    [1,0,1,1,1,1,0,1,0,1],
    [1,0,0,0,0,1,0,1,0,1],
    [1,1,1,1,0,1,0,1,0,1],
    [1,0,0,1,0,0,0,0,0,1],
    [1,0,1,0,0,1,1,1,0,1],
    [1,1,1,1,1,1,1,1,1,1],
];

let player = { x: 1, y: 1 };

const goal = { x: 8, y: 8 };

function drawMaze() {
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            ctx.fillStyle = maze[y][x] === 1 ? "#222" : "#ddd";
            ctx.fillRect(x * tile, y * tile, tile, tile);
        }
    }

    ctx.fillStyle = "gold";
    ctx.fillRect(goal.x * tile, goal.y * tile, tile, tile);

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(player.x * tile + tile/2, player.y * tile + tile/2, 12, 0, Math.PI*2);
    ctx.fill();
}

function checkWin() {
    if (player.x === goal.x && player.y === goal.y) {
        document.getElementById("message").classList.remove("hidden");
    }
}

function move(dx, dy) {
    const newX = player.x + dx;
    const newY = player.y + dy;

    if (maze[newY][newX] === 0) {
        player.x = newX;
        player.y = newY;
    }

    redraw();
    checkWin();
}

function redraw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawMaze();
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") move(0, -1);
    if (e.key === "ArrowDown") move(0, 1);
    if (e.key === "ArrowLeft") move(-1, 0);
    if (e.key === "ArrowRight") move(1, 0);
});

document.getElementById("up").onclick = () => move(0, -1);
document.getElementById("down").onclick = () => move(0, 1);
document.getElementById("left").onclick = () => move(-1, 0);
document.getElementById("right").onclick = () => move(1, 0);

redraw();