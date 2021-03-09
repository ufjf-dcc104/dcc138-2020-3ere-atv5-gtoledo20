import Cena from "./Cena.js"
/*  É responsável por desenhar elementos na tela em uma animação
*/
console.log("Hello, World!");
const canvas = document.querySelector("canvas");
console.log(canvas);
const cena1 = new Cena(canvas);
cena1.desenhar();