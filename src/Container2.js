///stable

import React, { useState } from 'react';
import './Container.css'
import ButtonBox from './ButtonBox'
import Button from './Button'
import Output from './Output'

const buttonValue = [
    { value: 0, class: 'digit-0' }, { value: 1, class: 'digit-1' }, { value: 2, class: 'digit-2' }, { value: 3, class: 'digit-3' }, { value: 4, class: 'digit-4' }, { value: 5, class: 'digit-5' }, { value: 6, class: 'digit-6' }, { value: 7, class: 'digit-7' }, { value: 8, class: 'digit-8' }, { value: 9, class: 'digit-9' }, { value: "+", class: 'op-add' }, { value: "-", class: 'op-sub' }, { value: "*", class: 'op-mul' }, { value: "/", class: 'op-div' }, { value: "=", class: 'eq' }, { value: "C", class: 'clear' }
];


const Container = () => {
    const [calc, setCalc] = useState({
        // num: 0,
        // sign: "",
        // result: 0,
        input: '',
        output: '',
        operator: null,
    });
    //for = and numbers
    const numClick = (e) => {
        e.preventDefault()
        const value = e.target.innerHTML
        if (value === '=') {// = pressed;'''
            setCalc({
                ...calc,
                input: calc.output,
                output: '',
                operator: null,
                //    deleteToggle: 'CLR'
            })
        } else if (calc.operator !== null) { //operator pressed
            var newInput = calc.input + value;
            var replace = newInput.replace(/x/g, '*').replace(/÷/g, '/');
            var result = eval(replace);
            setCalc({
                ...calc,
                input: newInput,
                output: result,
                //    deleteToggle: 'DEL'
            })
        } else {//num pressed
            setCalc({
                ...calc,
                input: calc.input + value,
                //    deleteToggle: 'DEL'
            })
        }
    }
    //for operators and C
    const signClick = (e) => {
        e.preventDefault()
        const value = e.target.innerHTML
        if (value == 'C') {
            setCalc({
                ...calc,
                input: '',
                output: '',
                operator: null
            })
            // } else if (value == 'DEL') {
            //     setCalc({
            //         ...calc,
            //         input: calc.input.slice(0, -1)
            //     })
        } else {

            setCalc({
                ...calc,
                input: calc.input + value,
                operator: value.replace(/x/g, '*').replace(/÷/g, '/')
            })

        }
    }








    return (
        <div className="container">
            <Output value={calc.input} />
            <ButtonBox>
                {
                    buttonValue.map((btn, i) => {
                        return (
                            <Button class={btn.class}
                                onClick={
                                    btn.value === "C" ? signClick :
                                        btn.value === "+" || btn.value === "-" || btn.value === "*" || btn.value === "/" ? signClick :
                                            // btn.value === "=" ? equalsClick :
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



