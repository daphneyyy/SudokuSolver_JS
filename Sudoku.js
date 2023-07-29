class Sudoku {
    /* Declare magic numbers */
    static SIZE = 9;
    static FACTOR = 3;

    constructor() {
        this.grid = new Array(Sudoku.SIZE).fill(0).map(
            () => new Array(Sudoku.SIZE).fill(0)
        );
    }

    getGrid() {
        return this.grid;
    }

    setGridPoint(x, y, val) {
        this.grid[x][y] = val;
    }

    getGridPoint(row, col) {
        return this.grid[row][col];
    }

    setLine(row, values) {
        for (let i = 0; i < values.length; i++) {
            const val = parseInt(values[i]);
            this.setGridPoint(row, i, val);
        }
    }

    printSudoku() {
        for (let row = 0; row < Sudoku.SIZE; row++) {
            for (let col = 0; col < Sudoku.SIZE; col++) {
                let curVal = document.getElementById(`input${row}${col}`).value;
                if (curVal === "") {
                    document.getElementById(`input${row}${col}`).value = this.grid[row][col];
                    document.getElementById(`input${row}${col}`).style.color = "red";
                }
            }
        }
    }
}
