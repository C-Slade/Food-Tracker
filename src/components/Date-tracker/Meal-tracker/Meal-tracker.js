import React from 'react';
import './meal-tracker.scss'

class MealTracker extends React.Component {

    state = {isActive: false}

    changeState = () => {
        this.setState(prevState => ({isActive: !prevState.isActive}))
    }

    render(){
        const {meal} = this.props;

        const openedMeal = () => {
                return (
                    <div className="meal-wrapper" onClick={this.changeState} >
                        <h2>{meal[0].value === null ? '' : meal[0].value}</h2>
                        
                        {this.state.isActive ? meal.map(meal => {
                            if (typeof meal.value !== 'string') {
                                return <p>{`${meal.type}: ${meal.value}`}</p>
                            }
                            return null
                        }) : null}
                    </div>
                )
        }
        return (
            <React.Fragment>
                {openedMeal()}
            </React.Fragment>
        )

    }
}

export default MealTracker