const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    const box = 20;
    const canvasSize = 700;
    const totalBoxes = canvasSize / box;

    let snake = [
      { x: 9 * box, y: 10 * box },
      { x: 8 * box, y: 10 * box },
      { x: 7 * box, y: 10 * box }
    ];

    let direction = "RIGHT";
    let food = spawnFood();
    let score = 0;

    document.addEventListener("keydown", changeDirection);

    function changeDirection(event) {
      if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
      if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
      if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
      if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    }

    function spawnFood() {
      return {
        x: Math.floor(Math.random() * (totalBoxes - 1)) * box,
        y: Math.floor(Math.random() * (totalBoxes - 1)) * box
      };
    }

    function drawGame() {
      
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvasSize, canvasSize);

      //Snake
      for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "white" : "purple";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
      }

      //Food
      ctx.fillStyle = "yellow";
      ctx.beginPath();
      ctx.arc(food.x + box / 2, food.y + box / 2, box / 2, 0, Math.PI * 2);
      ctx.fill();

      // Old head position
      let headX = snake[0].x;
      let headY = snake[0].y;

      // Move head
      if (direction === "LEFT") headX -= box;
      if (direction === "RIGHT") headX += box;
      if (direction === "UP") headY -= box;
      if (direction === "DOWN") headY += box;

      // Game over conditions
      if (
        headX < 0 || headX >= canvasSize ||
        headY < 0 || headY >= canvasSize ||
        snake.some(segment => segment.x === headX && segment.y === headY)
      ) {
        clearInterval(gameLoop);
        ctx.fillStyle = "red";
        ctx.font = "30px Courier";
        ctx.fillText("YOU DIED", canvasSize / 2 - 80, canvasSize / 2);
        return;
      }

      // New head
      const newHead = { x: headX, y: headY };

      // Food collision
      if (headX === food.x && headY === food.y) {
        score++;
        food = spawnFood();
      } else {
        snake.pop(); // Remove tail
      }

      snake.unshift(newHead);

      //score
      ctx.fillStyle = "white";
      ctx.font = "16px Courier";
      ctx.fillText("Score: " + score, 10, 20);
    }

    const gameLoop = setInterval(drawGame, 100);
