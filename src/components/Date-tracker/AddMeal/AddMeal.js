import React from 'react';
import './addmeal.scss'

const AddMeal = ({activateForm, cancelFormFeild, activeForm}) => {

    const removeFormField = () => {
        if (activeForm === true) {
            cancelFormFeild();
        } else {
            activateForm()
        }
    }

    return (
        <button className="addMeal" onClick={removeFormField}>
            Add a meal
        </button>
    )
}

export default AddMeal;