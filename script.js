class Calculator{
    constructor(previousResultElement, currenctResultElement){
        this.previousResultElement = previousResultElement
        this.currenctResultElement = currenctResultElement
        this.clear_f()
    }

    clear_f(){
        this.currenctResult = ''
        this.previousResult = ''
        this.operation = undefined
    }

    delete_f(){
        this.currenctResult = this.currenctResult.toString().slice(0, -1)
    }

    expandResult_f(digit){
        if(digit == '.' && this.currenctResult.includes('.')) return
        this.currenctResult = this.currenctResult.toString() + digit.toString()
    }

    chooseOperation_f(operation){
        if(this.currenctResult == '') return
        if(this.previousResult != ''){
            this.calculate_f()
        }
        this.operation = operation
        this.previousResult = this.currenctResult
        this.currenctResult = ''
    }

    calculate_f(){
        let calculation
        const prev = parseFloat(this.previousResult)
        const current = parseFloat(this.currenctResult)

        if(isNaN(prev) || isNaN(current)) return

        switch(this.operation){
            case '+':
                calculation = prev + current
                break
            case '-':
                calculation = prev - current
                break
            case '*':
                calculation = prev * current
                break
            case '÷':
                calculation = prev / current
                break
            default:
                return
        }

        this.currenctResult = calculation
        this.previousResult = ''
        this.operation = undefined
    }
    
    getNumberWithValidation_f(digit){
        const floatNumber = parseFloat(digit)
        if(isNaN(floatNumber)) return ''
        return digit.toLocaleString('en')
    }

    display_f(){
        this.currenctResultElement.innerText = this.getNumberWithValidation_f(this.currenctResult)

        if(this.operation != null){
            this.previousResultElement.innerText = this.previousResult + ' ' + this.operation
        }
        else {
            this.previousResultElement.innerText = ''
        }
        
    }
}

const digits = document.querySelectorAll('[data-digit]')
const operations = document.querySelectorAll('[data-operation]')
const equals = document.querySelector('[data-equals]')
const delete_variable = document.querySelector('[data-delete]')
const allClear = document.querySelector('[data-all-clear]')
const previousResultElement = document.querySelector('[data-previous-result]')
const currenctResultElement = document.querySelector('[data-current-result]')

const calculator = new Calculator(previousResultElement, currenctResultElement)

digits.forEach(button => {
    button.addEventListener('click', () => {
        calculator.expandResult_f(button.value)
        calculator.display_f()
    })
})

operations.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation_f(button.value)
        calculator.display_f()
    })
})

equals.addEventListener('click', button => {
    calculator.calculate_f()
    calculator.display_f()
})

allClear.addEventListener('click', button => {
    calculator.clear_f()
    calculator.display_f()
})

delete_variable.addEventListener('click', button => {
    calculator.delete_f()
    calculator.display_f()
})