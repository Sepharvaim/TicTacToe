let Gameboard = (function() {
    
    // dom and var selection 

    let button = document.getElementById('button'); 
    button.addEventListener('click', () => {
        let one = document.getElementById('one').value || 'Player One';
        let two = document.getElementById('two').value || 'Player Two';
        player = one;
        turno();  
    })

    let player;
    let sign = 'x';
    let gameboard = ["","","","","","","","",""];
    
    let allSquareGrid =  document.querySelectorAll('.square');
    let endDiv = document.querySelector('.endGame');
    let restart = document.getElementById('restart');
    let continua = document.getElementById('continua');

    restart.addEventListener('click', function() {
        location.reload();
    });

    continua.addEventListener('click', function() {
        gameboard = ["","","","","","","","",""];
        endDiv.style.display = 'none';
        render();
    });

    function render() {
        let index = 0;
        allSquareGrid.forEach(square => {   
            square.innerHTML = gameboard[index];
            index++;
        })    
    }

    allSquareGrid.forEach(square => square.addEventListener('click', prova));
    function prova(e) {
        
        if (e.target.innerHTML == 'o' || e.target.innerHTML == 'x') {
            return
        } else {
            gameboard[e.target.id] = sign;
            render();
            winner();
            switcher();
            turno();
        }
        if (completed()) {
            endGame(false);
        }
    }
    
    function switcher() {
        sign == 'x' ? (sign = 'o', player = two.value) : (sign = 'x', player = one.value);
        console.log(player)
    }
    
    function completed() {
        return gameboard.every(element => element == 'x' || element == 'o');
    }

    function winner() {
        if (gameboard[0] == gameboard[1] && gameboard[0] == gameboard[2] && gameboard[0] != "" || gameboard[3] == gameboard[4] && gameboard[3] == gameboard[5] && gameboard[3]!= "" || gameboard[6] == gameboard[7] && gameboard[6] == gameboard[8] && gameboard[6] != "") { 
            
            endGame(true);
        }
    }

    function endGame(drawOrWin) {
        endDiv.style.display = 'flex';
        let endText = document.getElementById('text');
        drawOrWin ? endText.innerHTML = `Congratulazioni ${player} hai vinto! Continua o rinizia il gioco` : endText.innerHTML = ("Avete Pareggiato Ritentate o cambiate giocatori ciao")
    }
    function turno() {
        let turno = document.getElementById('turno');
        turno.innerHTML = "e' il turno di " + player;
    }
        
        
        return {
            render,
            prova,
            winner,
        }
})();


let startButton = document.getElementById('button');
let divStarter = document.getElementById('nameDiv');
let container = document.querySelector('.container')
startButton.addEventListener('click', function() {
    divStarter.style.display = 'none';
    container.style.filter = 'none';
    
    Gameboard.prova()
})




