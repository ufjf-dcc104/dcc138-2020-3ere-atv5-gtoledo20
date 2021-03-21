import AssetManager from "./AssetManager.js";
import Mixer from "./Mixer.js";
import InputManager from "./InputManager.js";
import Game from "./Game.js";
import CenaJogo from "./CenaJogo.js";
import CenaCarregando from "./CenaCarregando.js";
import CenaFim from "./CenaFim.js";
import TelaFase01 from "./TelaFase01.js";
import TelaFase02 from "./TelaFase02.js";


const input = new InputManager();
const mixer= new Mixer(10);
const assets = new AssetManager(mixer);

assets.carregaImagem("garota", "assets/garota.png");
assets.carregaImagem("orc", "assets/orc.png");
assets.carregaImagem("esqueleto", "assets/skelly.png");
assets.carregaAudio("coin", "assets/coin.wav"); 
assets.carregaAudio("boom", "assets/boom.wav");

assets.carregaImagem("floor1", "assets/lava1.png");
assets.carregaImagem("floor2", "assets/lava2.png");
assets.carregaImagem("floor3", "assets/lava3.png");

const canvas = document.querySelector("canvas");
canvas.width = 14*32;
canvas.height = 10*32;

input.configurarTeclado({
  ArrowLeft: "MOVE_ESQUERDA",
  ArrowRight: "MOVE_DIREITA",
  ArrowUp: "MOVE_CIMA",
  ArrowDown: "MOVE_BAIXO",
  " ": "PROXIMA_CENA",
});

const game = new Game(canvas, assets, input);
const cena0 = new CenaCarregando();
const cena1 = new TelaFase01();
const cena2 = new TelaFase02();
const cena3 = new CenaFim();  

game.adicionarCena("carregando", cena0);
game.adicionarCena("fase_01", cena1);
game.adicionarCena("fase_02", cena2);
game.adicionarCena("fim", cena3);

game.iniciar();

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "s":
      game.iniciar();
      break;
    case "S":
      game.parar();
      break;
    case "c":
      assets.play("coin");
      break;
    case "b":
     assets.play("boom");
      break;
  }
});