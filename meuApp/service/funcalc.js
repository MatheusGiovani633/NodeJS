

function calc(num1, num2, operacao) {
    const a = Number(num1);
    const b = Number(num2);

    let resultado;
    switch (operacao) {
        case 'soma': resultado = a + b; break;
        case 'subtracao': resultado = a - b; break;
        case 'multiplicacao': resultado = a * b; break;
        case 'divisao':
            if (b === 0) {
                throw new Error('Divisão por zero');
            }
            resultado = a / b;
            break;
        default:
            throw new Error(`Operação inválida: ${operacao}`);
    }

    return resultado;
}
module.exports = {calc};