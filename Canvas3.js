$(document).ready(function() {
    var p = 20;
    var numCells = 20;
    var canvas = document.getElementById("canvas");
    $('#canvas').attr("width", "400");
    $('#canvas').attr("height", "400");
    var context = canvas.getContext('2d');
    canvas.addEventListener('click', Click);

    function create(arr) {
        for (var i = 0; i < arr.length; i++) {
            var row = arr[i];
            for (var j = 0; j < row.length; j++) {
                var cell = row[j];
                drawCell(i, j, cell);
            }
        }
    }

    function drawCell(i, j, alive) {
        context.beginPath();
        context.rect(i * p, j * p, p, p);
        context.fillStyle = alive ? 'black' : 'white';
        context.fill();
    }

    function Click(e) {
        context.fillStyle = "black";
        context.fillRect(Math.floor(e.offsetX / p) * p,
            Math.floor(e.offsetY / p) * p,
            p, p);
        var x = Math.floor(e.offsetX / p);
        var y = Math.floor(e.offsetY / p);

        arr[x][y] = 1;

    }

    var arr = buildArr();

    function buildArr() {
        var arr = [];
        for (var i = 0; i < numCells; i++) {
            var innerArr = [];
            for (var j = 0; j < numCells; j++) {
                innerArr.push(0);
            }
            arr.push(innerArr);
        }
        return arr;
    }

   

    function display(arr) {
        for (var x = 0; x < arr.length; x++) {
            for (var y = 0; y < arr[x].length; y++) {
                drawCell(x, y, arr[x][y]);
            }
        }
    }

    function step() {
        var nextArr = buildArr();
        for (var x = 1; x < arr.length - 1 ; x++) {
            for (var y = 1; y < arr[x].length - 1 ; y++) {

                var totalAlive = arr[x - 1][y - 1] + arr[x - 1][y] +
                    arr[x + 1][y + 1] + arr[x][y - 1] + arr[x + 1][y] +
                    arr[x - 1][y + 1] + arr[x][y + 1] + arr[x + 1][y - 1];

                 if (arr[x][y] == 1) {
                    if (totalAlive < 2) {
                        nextArr[x][y] = 0;
                    } else if (totalAlive == 2 || totalAlive == 3) {
                        nextArr[x][y] = 1;
                    } else if (totalAlive > 3) {
                        nextArr[x][y] = 0;
                    }
                } else if (arr[x][y] == 0 && totalAlive == 3) {
                    nextArr[x][y] = 1;
                }

	            }
            }
        }
         for (var l = 1; l < numCells - 1; l++) {
	        nextArr[l][0] = nextArr[l][numCells-1];
	        nextArr[l][numCells-1] = nextArr[l][1];
	        nextArr[0][l] = nextArr[numCells-1][l];
	        nextArr[numCells-1][l] = nextArr[1][l];

	    }

       var t = arr;
	   arr = nextArr;
	   nextArr = t;
       display(nextArr);
        
    }
    create(arr);
    $(".start").on("click", function() {
         step();

    });
})
