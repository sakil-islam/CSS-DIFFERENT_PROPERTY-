const $input = document.querySelector("input");
// is not a mathmatical add it's a string concat if initial value is zero press any key to replace it (0 remove/5 add to replace 0) else it's add one than other as like 888

document.querySelectorAll(".num__key").forEach(
    e1 => {
        e1.onclick = () => $input.value = $input.value !== "0" ? $input.value + e1.innerText : e1.innerText;
    }
);

const buffer = [];

const opCallback = opName => () => {
    let currentVal = parseFloat($input.value);

    if(opName === "percent") {
        currentVal *= 0.01;
        $input.value = currentVal;
    }
    else {
        if(buffer && buffer.length){
            buffer.push({ value: currentVal});

            const result = evalute(buffer);
            buffer.push({ value: result });
            buffer.push({ value: opName });

            $input.value = "";
        }
        else {
            buffer.push({ value: currentVal });
            buffer.push({ value: opName });
            $input.value = "";
        }
    }
}

const evalute = buffer => {
    const secondOperand = buffer.pop().value;
    const operator = buffer.pop().value;
    const firstOperand = buffer.pop().value;

    switch(operator) {
        case "add":
            return firstOperand + secondOperand;
            break;
        case "subtract":
            return firstOperand - secondOperand;
            break;
        case "multiply":
            return firstOperand * secondOperand;
            break;
        case "divide":
            return firstOperand / secondOperand;
            break;

        default:
            return secondOperand;
    }
}

for (const opName of ["add", "subtract", "multiply", "divide", "percent"]){
    document.querySelector(`.op__key[op=${opName}]`).onclick = opCallback(opName);
}

document.querySelector(".eq__key").onclick = () => {
    if(buffer && buffer.length) {
        buffer.push({ value: parseFloat($input.value)});
        $input.value = evalute(buffer);
    }
}

document.querySelector(".op__key[op=clear]").onclick = () => {
    $input.value = 0;
    buffer.length = 0;
}

document.querySelector(".op__key[op=negate]").onclick = () => ($input.value = -parseFloat($input.value));