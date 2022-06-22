import React, { useEffect, useState } from 'react';
import './Container.css'
import ButtonBox from './ButtonBox'
import Button from './Button'
import Output from './Output'

const buttonValue = [
    { value: 0, class: 'digit-0' }, { value: 1, class: 'digit-1' }, { value: 2, class: 'digit-2' }, { value: 3, class: 'digit-3' }, { value: 4, class: 'digit-4' }, { value: 5, class: 'digit-5' }, { value: 6, class: 'digit-6' }, { value: 7, class: 'digit-7' }, { value: 8, class: 'digit-8' }, { value: 9, class: 'digit-9' }, { value: "+", class: 'op-add' }, { value: "-", class: 'op-sub' }, { value: "*", class: 'op-mul' }, { value: "/", class: 'op-div' }, { value: "=", class: 'eq' }, { value: "C", class: 'clear' }
];


const Container = () => {
    const [compute, setCompute] = useState({
        number: "",
        output: "",
        operator: "",
        tempRes: 0,
        new_calculation: false,
    })

    useEffect(() => {
        console.log('temp result', compute.tempRes, 'new number', compute.number, 'new operator', compute.operator)
    }, [compute.tempRes, compute.number, compute.operator])

    const calculate = (a, b, sign) => (
        // if (sign === '+') {
        //     //console.log(a, b, sign)
        //     return a + b
        // }
        // else if (sign === '-') { return a - b }
        // else if (sign === '*') { return a * b }
        // else { return a / b }
        sign === '+' ? a + b :
            sign === '-' ? a - b : sign === '*' ? a * b : (b === 0 ? "" : a / b)
    )


    const numClick = (e) => {
        const value = e.target.value

        setCompute({
            ...compute,
            number: compute.new_calculation ? value : compute.number + value,
            output: compute.new_calculation ? value : compute.output + value,
            new_calculation: false
        })
    }
    const operatorClick = (e) => {
        const value = e.target.value
        let result

        //equate the first number to result b4 any operator is pressed
        //then at the 2nd operator press, do the first computation
        if (compute.operator) {
            result = calculate(Number(compute.tempRes), Number(compute.number), compute.operator)
            //console.log('after the first operator', compute.tempRes, compute.number, 'temp result is now', result)
        } else {
            result = compute.output //this will also cater for -ve first number
            //console.log('b4 sign, new number, ', compute.number, 'temp result is now', result)
        }
        //const result = compute.operator ? calculate(Number(compute.tempRes), Number(compute.output), compute.operator) : compute.output
        let op

        // if (value === "-") {//if it's -ve
        //     op = compute.output + value
        // } else if (compute.number) {
        //     op = compute.output + value
        // } else {
        //     op = compute.output
        //     console.log('old expression', op, 'new op is', value)
        // }

        //When the display is empty, the only buttons that will work are the digit buttons 
        //and the - subtraction button (which acts as a negative sign in this context). 
        //Any other button will have no effect.
        if (!compute.output && value == "-") {
            op = compute.output + value
            //console.log(op, 'I\'m the first operator', value)
        } else if (!compute.number && compute.output) {
            let trailing = compute.output.charAt(compute.output.length - 1)
            if ((trailing === "*" || trailing === "/") && value === "-") {
                op = compute.output + value
                result = compute.output
                //console.log('the last entry is not a digit, new op is', value)
            } else {
                op = compute.output.slice(0, -1) + value
                // console.log('the last entry is not a digit, new op is', value)
            }
        } else if (compute.number) {
            op = compute.output + value
            // console.log('now we have a number', op, 'new op is', value)
        } else {
            op = compute.output
            // console.log('old expression, no number yet', op, 'new op is', value)
        }
        // console.log('the result is now', result)

        //change operator if you already have an operator
        let operate
        if (compute.number) {
            operate = value
            //console.log('the new sign', operate)
        } else if (compute.operator) {
            operate = value
            //console.log('the new sign', operate)
        } else {
            operate = ""
            //console.log('the new sign', operate)
        }

        setCompute({
            ...compute,
            //operator: compute.number ? value : compute.operator && compute.output ? value : "",
            operator: operate,
            number: "",
            //add operator only when number has been pressed
            //output: value === "-" ? compute.output + value : compute.number ? compute.output + value : compute.output, //add operator only when number has been pressed
            output: op,
            //tempRes: compute.tempRes ? result : compute.output,
            tempRes: result

        })


    }
    const equalsClick = () => {
        console.log(compute.tempRes, compute.number)
        //you can only press = if there's compute.number (i'e digit is last pressed)
        setCompute({
            ...compute,
            output: compute.number ? calculate(Number(compute.tempRes), Number(compute.number), compute.operator) : compute.output,
            operator: compute.number ? '' : compute.operator,
            new_calculation: compute.number && true
        })


    }
    const clearClick = () => {
        setCompute({
            new_calculation: "",
            output: "",
            operator: "",
            number: "",
            tempRes: 0
        })

    }

    //console.log(compute)
    return (

        <div className="container">
            <Output value={compute.output} />
            <ButtonBox>
                {
                    buttonValue.map((btn, i) => {
                        return (
                            <Button className={btn.class}
                                onClick={btn.value === "=" ? equalsClick :
                                    btn.value === "-" || btn.value === "+" || btn.value === "/" || btn.value === "*" ? operatorClick :
                                        btn.value === "C" ? clearClick :
                                            numClick
                                }
                                key={i} value={btn.value}
                            />)
                    })
                }
            </ButtonBox>
        </div>
    );
};

export default Container