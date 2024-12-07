const canvas = document.getElementById("mazeCanvas");
const ctx = canvas.getContext("2d");

const walls = [];
const playerSize = 15;
let player = { x: 37, y: 5, width: 15, height: 15 }; // Initial player position and size

// Draw the maze
function drawRow(row, squares) {
    squares.split('').forEach((square, index) => {
        if (square === '1') {
            const x = index * 30;
            const y = row * 30;
            ctx.fillStyle = "lightgray";
            ctx.fillRect(x, y, 30, 30);
            walls.push({ x, y, width: 30, height: 30 });
        }
    });
}

function drawMaze() {
    drawRow(0, "10111111111111111111");
    drawRow(1, "10000000010000010001");
    drawRow(2, "11010111011011010101");
    drawRow(3, "10010101000010010111");
    drawRow(4, "11010101011110110101");
    drawRow(5, "10000101110000000001");
    drawRow(6, "10110101010010111101");
    drawRow(7, "10100001011110101001");
    drawRow(8, "10111100010010101011");
    drawRow(9, "11101001011010101011");
    drawRow(10, "10001111001010100001");
    drawRow(11, "11101000001000111111");
    drawRow(12, "10000011111010000001");
    drawRow(13, "11110000010010101101");
    drawRow(14, "10011111010010101001");
    drawRow(15, "10111011111011111001");
    drawRow(16, "10100000010010001101");
    drawRow(17, "10111011011110100001");
    drawRow(18, "10000010000000101101");
    drawRow(19, "101111111111111111111");

    // Draw the player
    ctx.fillStyle = "black";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Check if the player is touching a wall
function touchingWall() {
    for (const wall of walls) {
        if (
            player.x + player.width > wall.x && player.x < wall.x + wall.width &&
            player.y + player.height > wall.y && player.y < wall.y + wall.height
        ) {
            return true;
        }
    }
    return false;
}

// Check if the player reached the bottom of the canvas (winning condition)
function checkWin() {
    if (player.y + player.height > canvas.height) {
        youWon();
    }
}

// Handle when the player wins
function youWon() {
    const playAgain = confirm("You Won! Do you want to play again?");
    if (playAgain) {
        newGame();
    } else {
        window.close();
    }
}

// Start a new game
function newGame() {
    player.x = 37;
    player.y = 5;
    walls.length = 0; // Clear the walls
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    drawMaze(); // Redraw the maze
}

// Move the player based on key presses
function moveLeft() {
    player.x -= 5;
    if (!touchingWall()) {
        drawMaze();
    } else {
        player.x += 5; // Revert the movement if it hits a wall
    }
}

function moveRight() {
    player.x += 5;
    if (!touchingWall()) {
        drawMaze();
    } else {
        player.x -= 5; // Revert the movement if it hits a wall
    }
}

function moveUp() {
    player.y -= 5;
    if (!touchingWall()) {
        drawMaze();
    } else {
        player.y += 5; // Revert the movement if it hits a wall
    }
}

function moveDown() {
    player.y += 5;
    if (!touchingWall()) {
        drawMaze();
    } else {
        player.y -= 5; // Revert the movement if it hits a wall
    }
    checkWin();
}

// Set up event listeners for keyboard input
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        moveLeft();
    } else if (event.key === "ArrowRight") {
        moveRight();
    } else if (event.key === "ArrowUp") {
        moveUp();
    } else if (event.key === "ArrowDown") {
        moveDown();
    }
});

// Initialize the game
drawMaze();
