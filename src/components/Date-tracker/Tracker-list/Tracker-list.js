import React from 'react';
import Tracker from './Tracker/Tracker';
import './tracker-list.scss';
import uuid from 'uuid'

const TrackerList = ({globalInfo, dateOfNutrients, updateLocal}) => {
    return (
        <div className='tracker-list-wrapper'>
            <h2>Nutrients</h2>
            <div className='tracker-list'>
                {dateOfNutrients.nutrients.map((nutrient, index) => {return <Tracker nutrient={nutrient} globalNutrient={globalInfo[index]} updateLocal={updateLocal} key={uuid.v4()}/>})}
            </div>
        </div>
    )
}

export default TrackerList;