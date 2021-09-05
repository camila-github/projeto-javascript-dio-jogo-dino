let posicaoX; let posicaoY;
let direcaoX; let direcaoY; 
let posicaoCactusUm; let posicaoCactusDois; let posicaoCactusTres;
let velocity; let velocityParalax;
let paralaxX;
let pontuacao;
let animaPaisagem; let animaGravidade; let animaPular;
let cactusUm; 
let cactusDois;
let cactusTres;
let dino;
let montanha;
let areia;
let areiaCactus;
let chao;
let contReiniciarPosicaoCactus = 0;

document.getElementById('reiniciarJogo').addEventListener('click', () => {
    reiniciarPosicaoCactus();
    iniciar()
    document.getElementById('gameOver').style.visibility = 'hidden'
    document.getElementById('reiniciarJogo').style.visibility = 'hidden'

    document.getElementById('pontuacaoMaxima').style.visibility = 'visible'
    document.getElementById('pontuacaoTitulo').style.visibility = 'visible'
    document.getElementById('pontuacao').style.visibility = 'visible'
})

document.getElementById('iniciarJogo').addEventListener('click', () => {
    const menu = document.getElementById('iniciarMenu');
    document.body.removeChild(menu);
    document.getElementById('jogoDino').setAttribute('class', 'intro')
    setTimeout(() => iniciar(), 2000);
})

window.addEventListener("keydown", teclaPressionada);

function teclaPressionada (event) {
    if (event.keyCode === 32 && direcaoY >= 420) pular();    
}

function iniciar(){
    posicaoX = 1; posicaoY = 1; direcaoX = 0; direcaoY = 420; 
    posicaoCactusUm = 2095; posicaoCactusDois = 2695; posicaoCactusTres = 2695;
    velocity = 5; velocityParalax = 0.3; paralaxX = 0; pontuacao = 0;

    cactusUm = document.getElementById('cactus-um'); 
    cactusDois = document.getElementById('cactus-dois');
    cactusTres = document.getElementById('cactus-tres');
    dino = document.getElementById('dino');
    montanha = document.getElementById('montanha');
    areia = document.getElementById('areia');
    areiaCactus = document.getElementById('areia-cactus');
    chao = document.getElementById('chao');
    dino.setAttribute('class', 'dinoCorrer')
    dino.style.top = direcaoY + 'px';
    
    gravidade() 
    renderizar()
}

const gravidade = () => {
    if (direcaoY < 420){
        direcaoY+= posicaoY * velocity;
        dino.style.top = direcaoY + 'px';
        if (direcaoY >= 420) {
            direcaoX = 420
            dino.removeAttribute('class')
            dino.setAttribute('class','dinoCorrer')
        }
    animaGravidade = requestAnimationFrame(gravidade)
    }
}

const pular = () => {
    cancelAnimationFrame(animaGravidade)
    dino.setAttribute('class', 'dinoPular')
    if (direcaoY > 270){
        direcaoY-= posicaoY * velocity;
        dino.style.top = direcaoY + 'px';
        animaPular = requestAnimationFrame(pular);
    }else{
        gravidade();
    }
}

const renderizar = () => {
    direcaoX-= posicaoX * velocity;
    paralaxX-= posicaoX * velocityParalax;
    montanha.style.backgroundPosicaoX = paralaxX + 'px';
    let x = paralaxX + paralaxX;
    areia.style.backgroundPosicaoX = x + 'px';
    areiaCactus.style.backgroundPosicaoX = x + 'px';
    chao.style.backgroundPosicaoX = direcaoX + 'px';
    criarCactus();
    let status = colisao();
    velocity+= 0.005;
    pontuacao++;
    document.getElementById('pontuacao').innerHTML = pontuacao;   
    animaPaisagem = requestAnimationFrame(renderizar);
    pararJogo(status);
}

const criarCactus = () => {
        contReiniciarPosicaoCactus++;
        if(contReiniciarPosicaoCactus > 1000) reiniciarPosicaoCactus();

        posicaoCactusUm -= posicaoX * velocity;
        posicaoCactusDois -= posicaoX * velocity;
        posicaoCactusTres-= posicaoX * velocity;
        cactusUm.style.left = posicaoCactusUm + 'px';
        cactusDois.style.left = posicaoCactusDois + 'px';
        cactusTres.style.left = posicaoCactusTres + 'px';

        if (posicaoCactusUm <= -65 ) posicaoCactusUm = 995
        if (posicaoCactusDois <= -65) posicaoCactusDois = 5095
        if (posicaoCactusTres <= -65) posicaoCactusTres = 10095   
    
}


const colisao = () => {
    if (posicaoCactusUm < 155 && direcaoY > 340 && posicaoCactusUm > 75){
        dino.setAttribute('class', 'dinoPerdeu');
        return true;
    }else if (posicaoCactusDois < 155 && direcaoY > 340 && posicaoCactusDois > 75){
        dino.setAttribute('class', 'dinoPerdeu');
        return true;
    }else if (posicaoCactusTres < 155 && direcaoY > 340 && posicaoCactusTres > 75){
        dino.setAttribute('class', 'dinoPerdeu');
        return true;
    }
    return false;
}

const pararJogo = (status) => {
    if (status){
        direcaoY = 0;
        cancelAnimationFrame(animaGravidade);
        cancelAnimationFrame(animaPular);
        cancelAnimationFrame(animaPaisagem);
        
        document.getElementById('pontuacaoMaxima').innerHTML = 'PONTUACAO MAXIMA : ' + pontuacao;
        document.getElementById('gameOver').style.visibility = 'visible'
        document.getElementById('reiniciarJogo').style.visibility = 'visible'

        document.getElementById('pontuacaoMaxima').style.visibility = 'hidden'
        document.getElementById('pontuacaoTitulo').style.visibility = 'hidden'
        document.getElementById('pontuacao').style.visibility = 'hidden'
    }
}


const reiniciarPosicaoCactus = () => {    
    contReiniciarPosicaoCactus = 0;
    posicaoCactusUm = 1095; posicaoCactusDois = 1595; posicaoCactusTres = 2095;
}
