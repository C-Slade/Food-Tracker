import React from 'react';
import TrackerList from './Tracker-list/Tracker-list';
import AddMealList from './AddMeal-list/AddMeal-list';
import MealTracker from './Meal-tracker/Meal-tracker';
import uuid from 'uuid';
import './date-tracker.scss';

class DateTracker extends React.Component {

    state = {
        isMealActive: false
    }

    render() {
        const {
            globalInfo, 
            activeForm, 
            activateForm, 
            addMeal, 
            dateOfNutrients, 
            cancelForm, 
            inputsAreNaN, 
            checkInputs, 
            checkEmptyInputs, 
            prieviewNextDON,
            prieviewLastDON,
            inputsAreEmpty } = this.props;


    const updateCurrent = () => {
        const allNutrients = [];
    
        if (dateOfNutrients.noMeals === false) {
            dateOfNutrients.meals[dateOfNutrients.meals.length - 1].map(nutrient => 
                nutrient.type !== "meal" ? allNutrients.push({amount: nutrient.value, type: nutrient.type}) : null)
        }

        allNutrients.map((nutrient, aNindex) => {
            let aN_amount = nutrient.amount;

            dateOfNutrients.nutrients.map((nI, gIindex) => {
                if (nutrient.type === nI.type){
                    nI.current = nI.current + aN_amount
                }
                return null
            })
            return null
        });
    }

    const getMealTracker = () => {
        if (dateOfNutrients.meals[0]) {
            return (
                <React.Fragment>
                    {dateOfNutrients.meals.map(meal => <MealTracker meal={meal} key={uuid.v4()}/>)}
                </React.Fragment>
            )
        }
    }

    return (
        <div className='date-tracker'>
            <div className="date-tracker-header">
                <i className="material-icons" onClick={prieviewLastDON}>chevron_left</i>
                    <h2>{dateOfNutrients.date}</h2>
                <i className="material-icons" onClick={prieviewNextDON}>chevron_right</i>
            </div>

            <TrackerList dateOfNutrients={dateOfNutrients} 
                         globalInfo={globalInfo}/>
                         
            <AddMealList activeForm={activeForm} 
                         activateForm={activateForm} 
                         addMeal={addMeal} 
                         updateCurrent={updateCurrent} 
                         cancelForm={cancelForm}
                         inputsAreNaN={inputsAreNaN}
                         checkInputs={checkInputs}
                         checkEmptyInputs={checkEmptyInputs}
                         inputsAreEmpty={inputsAreEmpty}
                         />

            {getMealTracker()}
        </div>
    )
    }
} 

export default DateTracker;
