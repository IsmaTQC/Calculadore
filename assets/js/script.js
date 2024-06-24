const botao              = document.querySelectorAll('button')
const visualcimabotao    = document.querySelector('#visual-cima')
const visualbaixobotao   = document.querySelector('#visual-baixo')


/* O "this" em JavaScript se refere ao objeto que está sendo referenciado em um determinado contexto ou escopo. Ele pode ser usado dentro de uma função para se referir ao objeto que a chamou, ou pode ser usado fora de uma função para se referir ao objeto global (no caso do navegador, seria o objeto "window") */
//transformando em object para trabalhar em cima desses elementos
//entrada
class calculator {
    constructor(visualcimabotao, visualbaixobotao) {//intanciar novos objetos, mostrar as diferenças
    this.visualcimabotao  = visualcimabotao //impresso na tela
    this.visualbaixobotao = visualbaixobotao  //impresso na tela
    this.Operation = ""  // o que o usuario vai digitar
    }


    //mostrar digitos no visor
    visorDigit(digitacao){
        //digitar apenas 1 ponto
        if(digitacao === "." && this.visualbaixobotao.innerText.includes(".")){
            return
        }
        this.Operation = digitacao
        this.updateScreen()//responsavel por atualizar a tela
    }

    //processamento para calcular as operações
    processoOpera(operacao){
        //checar se o valor de baixo ta vazio
        if(this.visualbaixobotao.innerText === "" && operacao !=="AC"){
            //mudanca de operação

            if(this.visualcimabotao.innerText !== ""){
                this.changeOperation(operacao)
            }
            return
        }

        //pegando os valores da operação e calculando
        let operacaovalor;
        let cima = +this.visualcimabotao.innerText.split(" ")[0];
        let abaixo = +this.visualbaixobotao.innerText;

        switch(operacao){
            case "/":
                operacaovalor = cima / abaixo
                this.updateScreen(operacaovalor, operacao, cima, abaixo)
                break;
            case "*":
                operacaovalor = cima * abaixo
                this.updateScreen(operacaovalor, operacao, cima, abaixo)
                break;
            case "+":
                operacaovalor = cima + abaixo
                this.updateScreen(operacaovalor, operacao, cima, abaixo)
                break;
            case "-":
                operacaovalor = cima - abaixo
                this.updateScreen(operacaovalor, operacao, cima, abaixo)
                break;
            case "DEL":
                this.processoDelOp()
                break;
            case "AC":
                this.processoDelAll()
                break;
            case "=":
                this.processoIgual()
                break;
            default:
                return;
        }
    }

    //processamento
    //valores
    updateScreen(
        operacaovalor = null, 
        operacao = null, 
        cima = null, 
        abaixo = null){
            
        if(operacaovalor === null){
            this.visualbaixobotao.innerText += this.Operation 
        } else{
            //sempre ser zero
            if(cima === 0){
                operacaovalor = abaixo
            }

            //jogar valor de baixo para cima
            this.visualcimabotao.innerText = `${operacaovalor} ${operacao}`;
            this.visualbaixobotao.innerText = "";
        }
    }

    //mudanca de operação
    changeOperation(operacao){
        const matOperacao = ["/", "*", "+", "-"]

        if(!matOperacao.includes(operacao)){//verificando as operações digitas
            return
        }

        //tirar o ultimo caractere
        this.visualcimabotao.innerText = this.visualcimabotao.innerText.slice(0, -1) + operacao
    }

    //deletar as ultimas casas
    processoDelOp(){
        this.visualbaixobotao.innerText = visualbaixobotao.innerText.slice(0, -1) //ultimo digito
    }
    //deletar tudo
    processoDelAll(){
        this.visualcimabotao.innerText  = ""
        this.visualbaixobotao.innerText = ""
    }

    //processo igual
    processoIgual(){
        const operacao = visualcimabotao.innerText.split(" ")[1]

        this.processoOpera(operacao)
    }
}

//saida
const calc = new calculator(visualcimabotao, visualbaixobotao)

botao.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        const valor = e.target.innerText;//buscando valor da TAG

        //convertendo de texto para numero parseInt
        if(parseInt (valor) >=0 || valor === "."){//sinal de + ou, parseInt ytansforma em numero
            calc.visorDigit(valor)
        }else{
            calc.processoOpera(valor)
        }
    })
})


