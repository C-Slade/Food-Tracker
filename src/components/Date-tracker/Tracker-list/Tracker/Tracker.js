import React from 'react';

const Tracker = ({nutrient, globalNutrient}) => {
    return (
        <div>
            <h3>{`${nutrient.current}/${globalNutrient.amount}g`}</h3>
            <p>{nutrient.type}</p>
        </div>
    )
}

export default Tracker