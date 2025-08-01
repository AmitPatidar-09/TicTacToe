let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset_button");
let newGameBtn = document.querySelector("#newGame");
let msgCon = document.querySelector(".msg_con");
let msg = document.querySelector("#msg");
let startPlayerSelect = document.querySelector("#startPlayer");
let turnDisplay = document.querySelector("#turnDisplay");

let turnO = true;
let cnt = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turnO = startPlayerSelect.value === "O";
    cnt = 0;
    enableBoxes();
    msgCon.classList.add("hide");
    startPlayerSelect.disabled = false;
    updateTurnDisplay();
};

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
};

const updateTurnDisplay = () => {
    turnDisplay.innerText = `Turn: ${turnO ? "O" : "X"}`;
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // Disable dropdown on first move
        startPlayerSelect.disabled = true;

        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }

        box.disabled = true;
        cnt++;
        updateTurnDisplay();
        checkWinner();
    });
});

const showWinner = (winner) => {
    msg.innerText = `🎉 Congratulations! Winner is ${winner}`;
    msgCon.classList.remove("hide");
};

const showDraw = () => {
    msg.innerText = `😐 It's a Draw!`;
    msgCon.classList.remove("hide");
};

const checkWinner = () => {
    for (let p of winPatterns) {
        let pos1 = boxes[p[0]].innerText;
        let pos2 = boxes[p[1]].innerText;
        let pos3 = boxes[p[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                disableBoxes();
                showWinner(pos1);
                return;
            }
        }
    }

    if (cnt === 9) {
        showDraw();
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

// Initialize on first load
resetGame();
