import React from 'react';
import AddMeal from '../AddMeal/AddMeal';
import { Transition, animated } from 'react-spring/renderprops';
import './addmeal-list.scss';

const AddMealList = (props) => {
    const { addMeal, 
            activeForm, 
            activateForm, 
            updateCurrent, 
            cancelForm, 
            inputsAreNaN, 
            checkInputs, 
            inputsAreEmpty, 
            checkEmptyInputs } = props;


    let meal = React.createRef();
    let protien = React.createRef();
    let fat = React.createRef();
    let carbs = React.createRef();
    let sodium = React.createRef();
    let sugar = React.createRef();
    let calories = React.createRef();
    let potassium = React.createRef();
    let phosphorus = React.createRef();

    let isAllInputsNumbers = true;
    let isAnyInputsEmpty = false; 


    const addThisMeal = (e) => {
        e.preventDefault();

        const allInputs = [
            protien.current.value,
            fat.current.value,
            carbs.current.value,
            sodium.current.value,
            sugar.current.value,
            calories.current.value,
            potassium.current.value,
            phosphorus.current.value,
        ];

        allInputs.map(input => isNaN(input) ? isAllInputsNumbers = false : null );
        allInputs.map(input => input === '' ? isAnyInputsEmpty = true : null)
        console.log(meal.current.value)

        console.log(protien.current.value)

        if (isAllInputsNumbers === true && isAnyInputsEmpty === false) {
            addMeal([
                {value: meal.current.value, type: 'meal', mealName: true},
                {value: protien.current.value, type: 'protein'},
                {value: fat.current.value, type: 'fat'},
                {value: carbs.current.value, type: 'carbs'},
                {value: sodium.current.value, type: 'sodium'},
                {value: sugar.current.value, type: 'sugar'},
                {value: calories.current.value, type: 'calories'},
                {value: phosphorus.current.value, type: 'phosphorus'},
                {value: potassium.current.value, type: 'potassium'},
            ])
            updateCurrent();
            inputsAreNaN(false);
            inputsAreEmpty(false)
        } else {
            if (activeForm === true) {
                inputsAreNaN(true)
                inputsAreEmpty(true)
            }
        }
    }

    const cancelFormFeild = () => {
        cancelForm();
        inputsAreNaN(false)
        inputsAreEmpty(false)
    }

    const addMealForm = () => {
            return (
                <Transition
                    items={activeForm}
                    from={{transform: 'scaleY(0)', transformOrigin: 'top'}}
                    enter={{transform: 'scaleY(1)', transformOrigin: 'top'}}
                    leave={{transform: 'scaleY(0)', transformOrigin: 'top'}}
                >
                {show => show && (props => (
                    <animated.div style={props} className="rs-AMF">
                        <form onSubmit={addThisMeal} className="addMealForm">
                            <input type="text" placeholder='Meal Name...' ref={meal}/>
                            <input type="text" placeholder='Total Protien...' ref={protien}/>
                            <input type="text" placeholder='Total Fat...' ref={fat}/>
                            <input type="text" placeholder='Total Carbs...' ref={carbs} />
                            <input type="text" placeholder='Total Sodium...' ref={sodium}/>
                            <input type="text" placeholder='Total Sugar...' ref={sugar}/>
                            <input type="text" placeholder='Total Calories...' ref={calories}/>
                            <input type="text" placeholder='Total Potassium...' ref={potassium}/>
                            <input type="text" placeholder='Total Phosphorus...' ref={phosphorus}/>

                            <button onClick={addThisMeal} className="add">Add</button>
                            <button className="cancel" onClick={cancelFormFeild}>Cancel</button>
                        </form>
                    </animated.div>
                ))}
                </Transition> )
    } 

    const inputError = () => {
        if (checkEmptyInputs === true || checkInputs === true) {
            return (
                <div className="inputError">
                    <i className="material-icons">priority_high</i>
                    <p>Nutrients must be number values and/or not be empty</p>
                </div>
            )
        }
    }

    return (
        <div className="addMealList">
            {activeForm === true ? inputError() : null}
            {addMealForm()}
            <AddMeal activateForm={activateForm} cancelFormFeild={cancelFormFeild} activeForm={activeForm} />
        </div>
    )
}

export default AddMealList;