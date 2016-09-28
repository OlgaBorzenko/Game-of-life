function print(arr1) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i].length; j++) {
            if (arr[i][j]) {
                drawCell(i, j, cell);
            } else {
                drawCell(i, j, alive);
            }
        }
    }
}
