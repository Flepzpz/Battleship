var round1 = []
var round2 = []
var round3 = []
var round4 = []
var possibilidades = []   

for(i=0;i<10;i++){
    round1.push([0,0,0,0,0,0,0,0,0,0])
    round2.push([0,0,0,0,0,0,0,0,0,0])
    round3.push([0,0,0,0,0,0,0,0,0,0])
    round4.push([0,0,0,0,0,0,0,0,0,0])
}

for(j=0;j<10;j++){
    for(i=0;i<10;i++){
        possibilidades.push([j,i])
    }
}


function boats(round){

    // barco de 1 ponto
    let l = Math.floor(Math.random() * 10)
    let c = Math.floor(Math.random() * 10)
    
    let eixo = Math.floor(Math.random() * 2)

    round[l][c] = 1
    
    // barco de 2 pontos
    while(round[l][c]==1){
        l = Math.floor(Math.random() * 10)
        c = Math.floor(Math.random() * 10)
    }
    eixo = Math.floor(Math.random() * 2)
    round[l][c] = 1
    if(eixo){
        if(c<=5){
            round[l][c+1] = 1
        }else{
            round[l][c-1] = 1
        }
    }else{
        if(l<=5){
            round[l+1][c] = 1
        }else{
            round[l-1][c] = 1
        }
    }

    // barco de 3 pontos
    while(round[l][c]==1){
        l = Math.floor(Math.random() * 10)
        c = Math.floor(Math.random() * 10)
    }
    eixo = Math.floor(Math.random() * 2)
    round[l][c] = 1
    if(eixo){
        if(c<=5){
            round[l][c+1] = 1
            round[l][c+2] = 1
        }else{
            round[l][c-1] = 1
            round[l][c-2] = 1
        }
    }else{
        if(l<=5){
            round[l+1][c] = 1
            round[l+2][c] = 1
        }else{
            round[l-1][c] = 1
            round[l-2][c] = 1
        }
    }
}

boats(round1)
boats(round2)
boats(round3)
boats(round4)

var points = 0
var lGuess
var cGuess
var hasBoat = 0
var lmais = 0
var lmenos = 0
var cmais = 0
var cmenos = 0
var sizeL = 0
var sizeC = 0
var jogadas = []
var guess

function bot(round){

    switch(hasBoat){
    
        case 1:
            if(lGuess<=5){
                lGuess+=1
                lmais = 1
            }else{
                lGuess-=1
                lmenos = 1
            }

            if(round[lGuess][cGuess]==1){
                if(lmais){
                    hasBoat = 2
                }else if(lmenos){
                    hasBoat = 3
                }
            }else{
                hasBoat = 4
            }
            break
        case 2:
            lGuess+=1

            if(round[lGuess][cGuess]==1){
                hasBoat = 0
            }else{
                lmais = 0
                hasBoat = 0
            }
            break
        case 3:
            lGuess-=1

            if(round[lGuess][cGuess]==1){
                hasBoat = 0
            }else{
                lmenos = 0
                hasBoat = 0
            }
            break
        case 4:
            if(lmais){
                lGuess-=1
                lmais = 0
            }else if(lmenos){
                lGuess+=1
                lmenos = 0
            }

            if(cGuess<=5){
                cGuess+=1
                cmais = 1
            }else{
                cGuess-=1
                cmenos = 1
            }

            if(round[lGuess][cGuess]==1){
                if(cmais){
                    hasBoat = 5
                }else if(cmenos){
                    hasBoat = 6
                }
            }else{
                hasBoat = 0
            }
            break
        case 5:
            cGuess+=1

            if(round[lGuess][cGuess]==1){
                hasBoat = 0
            }else{
                cmais = 0
                hasBoat = 0
            }
            break
        case 6:
            cGuess-=1

            if(round[lGuess][cGuess]==1){
                hasBoat = 0
            }else{
                cmenos = 0
                hasBoat = 0
            }
            break
        default:
            do{
                if(jogadas.length>=100){
                    return 
                }
                guess = possibilidades[Math.floor(Math.random() * 100)]
                lGuess = guess[0]
                cGuess = guess[1]
            }while(jogadas.find(item => item[0]==lGuess && item[1]==cGuess))
            if(round[lGuess][cGuess]==1){
                hasBoat = 1
            }
            break
        }
        return [lGuess,cGuess]

}

var rodada 
var jogada = []
var contador = 0

function play(round){
    switch(round){
        case round1:
            rodada = 1
            break
        case round2:
            rodada = 2
            break
        case round3:
            rodada = 3
            break
        case round4:
            rodada = 4
            break
    }
    console.log("Mapa do round: "+rodada)
    console.table(round)
    while(points<6){
        console.log("===================================")
        jogada = bot(round)
        if(!jogada){
            console.warn("Máximo de pontos atingido, próximo jogo")
            break
        }
        jogadas.push(jogada)
        console.log("Posição "+jogada[0]+","+jogada[1])
        if(round[jogada[0]][jogada[1]]==1){
            console.log("Correto, +1 ponto")
            points+=1
            round[jogada[0]][jogada[1]] = 14
        }else{
            console.log("Incorreto")
        }
        console.log("Pontos: "+points)
        //console.log(contador++)
        console.log("===================================")
    }
    //console.table(jogadas)
    jogadas = []
    points = 0
}

play(round1)
play(round2)
play(round3)
play(round4)