import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Sprite from "./Sprite.js";
import modeloMapa2 from "../maps/mapa2.js";

export default class TelaFase02 extends Cena{
    quandoColidir(a, b){

        if(a.tags.has("pc") && b.tags.has("enemy")){
            this.assets.play("boom");
            if(!this.aRemover.includes(a)){
                this.aRemover.push(a);
            }
            if(!this.aRemover.includes(b)){
                this.aRemover.push(b);
            }
            this.rodando = false;
            this.game.selecionaCena("fim")
        }
        if(a.tags.has("enemy") && b.tags.has("enemy")){
            this.assets.play("boom");
            if(!this.aRemover.includes(a)){
                this.aRemover.push(a);
            }
            if(!this.aRemover.includes(b)){
                this.aRemover.push(b);
            }
        }
        if(a.tags.has("pc") && b.tags.has("coin")){
            this.assets.play("coin");
            this.game.pontos+=1;
            if(!this.aRemover.includes(b)){
                this.aRemover.push(b);
            }
        }
        if(a.tags.has("pc") && b.tags.has("portal")){
            this.assets.play("portal");
            this.rodando = false;
            this.game.selecionaCena("fim")
        }
    }
    preparar(){
        super.preparar();
        const mapa2 = new Mapa(10,14,32);
        mapa2.carregaMapa(modeloMapa2);
        this.configuraMapa(mapa2);

        const pc = new Sprite({x: 64, y: 160});
        pc.tags.add("pc");
        const cena = this;
        pc.controlar = function (dt) {
            if(cena.input.comandos.get("MOVE_ESQUERDA")){
                this.vx = -50;
            } else if(cena.input.comandos.get("MOVE_DIREITA")){
                this.vx = +50;
            } else {
                this.vx = 0;
            }
            if(cena.input.comandos.get("MOVE_CIMA")){
                this.vy = -50;
            } else if(cena.input.comandos.get("MOVE_BAIXO")){
                this.vy = +50;
            } else {
                this.vy = 0;
            }
        };
        this.adicionar(pc);

        function perseguePC(dt) {
            this.vx = 25*Math.sign(pc.x - this.x);
            this.vy = 25*Math.sign(pc.y - this.y);
        }

        const en1 = new Sprite({x: 400, y: 200, vx: -10, color: "red", controlar: perseguePC, tags:["enemy"]});
        const en2 = new Sprite({x: 240, y: 80, vx: -10, color: "red", controlar: perseguePC, tags:["enemy"]});
        const en3 = new Sprite({x: 240, y: 160, vx: -10, color: "red", controlar: perseguePC, tags:["enemy"]});
        const en4 = new Sprite({x: 360, y: 90, vx: -10, color: "red", controlar: perseguePC, tags:["enemy"]});
        this.adicionar(en1);
        this.adicionar(en2);
        this.adicionar(en3);
        this.adicionar(en4);
        const coloca = new Sprite({x: 384, y: 260, color: "purple", tags:["portal"]});
        this.adicionar(coloca);
        const coin = new Sprite({x: 300, y: 46, color: "yellow", tags:["coin"]});
        const coin2 = new Sprite({x: 100, y: 46, color: "yellow", tags:["coin"]});
        const coin3 = new Sprite({x: 400, y: 140, color: "yellow", tags:["coin"]});
        this.adicionar(coin);
        this.adicionar(coin2);
        this.adicionar(coin3);
    }
}