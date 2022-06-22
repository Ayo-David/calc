import React, { useState, useEffect } from 'react';
import './Container.css'
import ButtonBox from './ButtonBox'
import Button from './Button'
import Output from './Output'

const buttonValue = [
    { value: 0, class: 'digit-0' }, { value: 1, class: 'digit-1' }, { value: 2, class: 'digit-2' }, { value: 3, class: 'digit-3' }, { value: 4, class: 'digit-4' }, { value: 5, class: 'digit-5' }, { value: 6, class: 'digit-6' }, { value: 7, class: 'digit-7' }, { value: 8, class: 'digit-8' }, { value: 9, class: 'digit-9' }, { value: "+", class: 'op-add' }, { value: "-", class: 'op-sub' }, { value: "*", class: 'op-mul' }, { value: "/", class: 'op-div' }, { value: "=", class: 'eq' }, { value: "C", class: 'clear' }
];


const Container = () => {
    const [calc, setCalc] = useState({
        num: 0,
        sign: "",
        result: 0,
    });

    useEffect(() => {
        console.log(calc.num, 'the result is:', calc.result)
    }, [calc.num, calc.result])



    const numClick = (e) => {
        e.preventDefault()
        const value = e.target.innerHTML
        setCalc({
            ...calc,
            num: calc.num === "0" && value === "0" ? "0" : calc.num % 1 === 0
                ? Number(calc.num + value)
                : calc.num + value,
            result: !calc.sign ? 0 : calc.result,
        })
        //console.log('1st num', calc.num, 'expected output', calc.result)
    };

    const equalsClick = () => {
        if (calc.sign && calc.num) {
            const compute = (a, b, sign) =>
                sign === '+' ? a + b :
                    sign === '-' ? a - b :
                        sign === '*' ? a * b :
                            a / b;


            setCalc({
                ...calc,
                result: compute(Number(calc.result), Number(calc.num), calc.sign),
                num: 0,
                sign: "",
            })
        }
    }

    const signClick = (e) => {
        e.preventDefault()
        const value = e.target.innerHTML
        // if (calc.num === 0 && calc.sign === '/') {
        //     setCalc({
        //         ...calc,
        //         num: 0,
        //         result: 0,
        //         sign: ""
        //     })
        // }
        setCalc({
            ...calc,
            sign: value,
            result: !calc.result && calc.num ? calc.num : calc.result,
            num: 0
        })
        // console.log('Initial Input', calc.num, 'expected output', calc.result)
    }
    const clearClick = () => {
        setCalc({
            ...calc,
            num: 0,
            result: 0,
            sign: ""
        })

    }

    return (
        <div className="container">
            <Output value={calc.num ? calc.num : calc.result} />
            <ButtonBox>
                {
                    buttonValue.map((btn, i) => {
                        return (
                            <Button class={btn.class}
                                onClick={
                                    btn.value === "C" ? clearClick :
                                        btn.value === "+" || btn.value === "-" || btn.value === "*" || btn.value === "/" ? signClick :
                                            btn.value === "=" ? equalsClick :
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