class SudokuSolver {
    static SIZE = 9;

    constructor() {
        this.sd = new Sudoku();
        this.line = 0;
    }

    isSafe(row, col, val) {
        return this.checkRowCol(row, col, val) && this.checkBox(row, col, val);
    }

    checkRowCol(row, col, val) {
        for (let i = 0; i < SudokuSolver.SIZE; i++) {
            if (this.sd.getGridPoint(row, i) === val || this.sd.getGridPoint(i, col) === val) {
                return false;
            }
        }
        return true;
    }

    checkBox(row, col, val) {
        const [xLeft, xRight, yLeft, yRight] = this.getEdgesIdx(row, col);
        for (let r = xLeft; r < xRight + 1; r++) {
            for (let c = yLeft; c < yRight + 1; c++) {
                if (this.sd.getGridPoint(r, c) === val) {
                    return false;
                }
            }
        }
        return true;
    }

    getEdgesIdx(row, col) {
        const xLeft = Math.floor(row / 3) * 3;
        const xRight = xLeft + 2;
        const yLeft = Math.floor(col / 3) * 3;
        const yRight = yLeft + 2;
        return [xLeft, xRight, yLeft, yRight];
    }

    solve() {
        for (let row = 0; row < SudokuSolver.SIZE; row++) {
            for (let col = 0; col < SudokuSolver.SIZE; col++) {
                if (this.sd.getGridPoint(row, col) === 0) {
                    return this.putNumber(row, col);
                }
            }
        }
        return true;
    }

    putNumber(row, col) {
        for (let i = 1; i <= SudokuSolver.SIZE; i++) {
            if (this.isSafe(row, col, i)) {
                this.sd.setGridPoint(row, col, i);
                if (this.solve()) {
                    return true;
                } else {
                    this.sd.setGridPoint(row, col, 0);
                }
            }
        }
        return false;
    }

    solveSudoku() {
        if (this.solve()) {
            console.log("Sudoku solved!");
            this.sd.printSudoku();
            document.getElementById("result").style.display = "block";
            document.getElementById("result").innerHTML = "Sudoku Solved!";
        } else {
            console.log("Unsolvable");
            document.getElementById("result").innerHTML = "Unsolvable";
            document.getElementById("result").style.display = "block";
            for (let row = 0; row < SudokuSolver.SIZE; row++) {
                for (let col = 0; col < SudokuSolver.SIZE; col++) {
                    document.getElementById(`input${row}${col}`).readOnly = !document.getElementById(`input${row}${col}`).readOnly;
                }
            }
        }
    }
}

const sds = new SudokuSolver();

function solveButton() {
    validateInput();
    for (let row = 0; row < SudokuSolver.SIZE; row++) {
        for (let col = 0; col < SudokuSolver.SIZE; col++) {
            document.getElementById(`input${row}${col}`).readOnly = !document.getElementById(`input${row}${col}`).readOnly;
            const curVal = document.getElementById(`input${row}${col}`).value;
            if (curVal !== "") {
                sds.sd.setGridPoint(row, col, parseInt(curVal));
            } else {
                sds.sd.setGridPoint(row, col, 0);
            }
        }
    }
    document.getElementById("solve").disabled = true;
    sds.solveSudoku();
}

function resetButton() {
    for (let row = 0; row < SudokuSolver.SIZE; row++) {
        for (let col = 0; col < SudokuSolver.SIZE; col++) {
            document.getElementById(`input${row}${col}`).value = "";
            document.getElementById(`input${row}${col}`).style.color = "black";
            document.getElementById(`input${row}${col}`).readOnly = false;
        }
    }
    document.getElementById("solve").disabled = false;
    document.getElementById("result").style.display = "none";
}

function createGrid() {
    const grid_table = document.getElementsByClassName("gridtb")[0]
    for (let row = 0; row < SudokuSolver.SIZE; row++) {
        let tr = document.createElement("tr");
        for (let col = 0; col < SudokuSolver.SIZE; col++) {
            let td = document.createElement("td");
            let input = document.createElement("input");
            input.type = "text";
            input.id = `input${row}${col}`;
            input.pattern = "[1-9]";
            input.maxLength = 1;
            input.pattern = "[1-9]";
            input.size = 1;
            if (
                (Math.floor(row / 3) + Math.floor(col / 3)) % 2 === 0
            ) {
                input.style.backgroundColor = "lightgray";
            } else {
                input.style.backgroundColor = "white";
            }
            td.appendChild(input);
            tr.appendChild(td);
        }
        grid_table.appendChild(tr);
    }
}

function validateInput() {
    const inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("input", () => {
            if (inputs[i].value === "") {
                inputs[i].setCustomValidity("");
                return;
            }
            const val = parseInt(inputs[i].value);
            if (isNaN(val) || val < 1 || val > 9) {
                inputs[i].value = "";
                window.alert("Please enter a number from 1 to 9");
            } else {
                inputs[i].setCustomValidity("");
            }
        })
    }
}

window.onload = () => {
    createGrid();
    validateInput();
}