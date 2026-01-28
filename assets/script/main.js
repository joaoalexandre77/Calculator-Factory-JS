function createCalculator(){
    return {
        value : 0,
        display : document.querySelector('.tela'),
        audio : document.querySelector('#audio'),
        specialCaracters: ["(", ")", "/", "*", "+", "-"],

        init(){
            this.clickButton();;
        },

        storageNumber(value){
            let displayValue = this.display.value;
            if(displayValue === "0" || displayValue === "ERRO") {
                this.display.value = value;
            }else{
                this.display.value += value;
            }
        },

        resultCalc(){
            try {
                this.value = eval(this.display.value);
                this.display.value = this.value;
            } catch (error) {
                this.display.value = "ERRO";
            }
        },

        clearDisplay(){
            this.display.value = 0;
        },

        clearOne(){
            this.value = this.display.value.slice(0, -1);
            this.display.value = this.value;
            if(this.display.value === "") this.display.value = 0;
        },

        clickButton(){
            document.addEventListener("click", e => {
                const el = e.target;

                if(el.type === "button") {
                    this.audio.play();
                }

                if(!isNaN(el.value) || el.value === ".") this.storageNumber(el.value);

                if(this.specialCaracters.includes(el.value)) this.storageNumber(el.value);

                if(el.value === "=") this.resultCalc();

                if(el.value === "C") this.clearDisplay();

                if(el.value === "<<") this.clearOne();
            });
        },
    }
};

const calculator = createCalculator();
calculator.init();