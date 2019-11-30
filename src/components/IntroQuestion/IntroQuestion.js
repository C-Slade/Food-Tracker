import React from 'react';
import './introQuestion.scss'

const IntroQuestion = ({question, addNutrient, index, toggleQuestionValidation, isIntroQuestionValid}) => {
    const userInput = React.createRef();

    const addThisNutrient = (e) => {
        e.preventDefault();
        if (userInput.current.value === '') {
            toggleQuestionValidation(false)
        } else {
            addNutrient(parseInt(userInput.current.value), index, question.type);
            userInput.current.value = '';
            toggleQuestionValidation(true)
        }
    }

    const ifEmpty = () => {
        return (
            <div className="inputError">
                <i className="material-icons">priority_high</i>
                <p>Nutrients must be number values and/or not be empty</p>
            </div>
        )
    }


    return (
        <div className='introQuestion-wrapper'>
            <p>{question.question}</p>
            <form onSubmit={addThisNutrient} className='IQ-form'>
                <input type="text" placeholder='Enter in Grams' ref={userInput}/>
                <button onClick={addThisNutrient}>Next</button>
            </form>
            {isIntroQuestionValid === false ? ifEmpty() : null}
        </div>
    )
}

export default IntroQuestion;