// Controla interatividade dos botoes dos modos de tempo.

const html = document.querySelector('html');
const botaoFoco = document.querySelector('.app__card-button--foco');
const botaoCurto = document.querySelector('.app__card-button--curto');
const botaoLongo = document.querySelector('.app__card-button--longo');
const botoes = document.querySelectorAll('.app__card-button');
const imagemPrincipal = document.querySelector('.app__image');
const textoPrincipal = document.querySelector('.app__title');

botaoFoco.addEventListener('click', () => {
   tempoDecorridoSegundos = 1500;
   alterarContexto('foco');
   botaoFoco.classList.add('active');
})

botaoCurto.addEventListener('click', () => {
   tempoDecorridoSegundos = 300;
   alterarContexto('descanso-curto');
   botaoCurto.classList.add('active');
})
botaoLongo.addEventListener('click', () => {
   tempoDecorridoSegundos = 900;
   alterarContexto('descanso-longo');
   botaoLongo.classList.add('active');
})


function alterarContexto(contexto) {
   mostrarTempo();
   botoes.forEach(function (contexto) {
      contexto.classList.remove('active');
   })

   html.setAttribute('data-contexto', contexto);
   imagemPrincipal.setAttribute('src', `imagens/${contexto}.png`);

   switch (contexto) {
      case "foco":
         textoPrincipal.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong"> mergulhe no que importa.</strong>`;
            botaoFoco.classList.add('active');
            
         break;

      case "descanso-curto":
         textoPrincipal.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça ua pausa curta!</strong>`;
            botaoCurto.classList.add('active');
         
         break;

      case "descanso-longo":
         textoPrincipal.innerHTML = `Hora de voltar a superfície!<br>
            <strong class="app__title-strong">Faça uma pausa longa!</strong>`;
            botaoLongo.classList.add('active');
         break;

      default:
         break;
   } 
};

// Controla a interatividade do botao de musica.

const iniciarMusica = document.querySelector('#alternar-musica');
const musica = new Audio('sons/luna-rise-part-one.mp3');
musica.loop = true;
musica.checked = false;

iniciarMusica.addEventListener('change', () => {
   if (musica.paused) {
      musica.play();
   }
   else {
      musica.pause();
   }
   })


// Controla a interatividade do cronometo.

const botaoIniciar = document.querySelector('#start-pause');
const iniciar = new Audio('sons/play.wav');
const pausar = new Audio('sons/pause.mp3');
const final = new Audio('sons/beep.mp3');
const textoIniciarPausar = document.querySelector('#start-pause span');
const imagemBotao = document.querySelector('.app__card-primary-butto-icon');
const tempoTela = document.querySelector('#timer');
let tempoDecorridoSegundos = 1500;
let intervaloId = null;



const contagemRegressiva = () => {
      if (tempoDecorridoSegundos <= 0) {
      musica.pause();
      final.play();
      zerar();
      alert('Tempo finalizado!');
      zerar();
      final.pause();
      window.location.reload(true);
      return
  }
   tempoDecorridoSegundos -= 1;
   console.log(`T: ${tempoDecorridoSegundos}`);
   mostrarTempo();
}

botaoIniciar.addEventListener('click', iniciarPausar);

function iniciarPausar() {
      if (intervaloId) {
      pausar.play();
      zerar();
      return
   }
   iniciar.play();
   intervaloId = setInterval(contagemRegressiva, 1000);
   textoIniciarPausar.textContent = "Pausar";
   imagemBotao.setAttribute('src', 'imagens/pause.png');
}


function zerar() {
   clearInterval(intervaloId);
   textoIniciarPausar.textContent = "Iniciar";
   imagemBotao.setAttribute('src', 'imagens/play_arrow.png');
   intervaloId = null;
}

function mostrarTempo() {
   const tempo = new Date(tempoDecorridoSegundos * 1000);
   const tempoFormatado = tempo.toLocaleString("pt-BR", {
      minute: "2-digit",
      second: "2-digit"
   })
   tempoTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();






