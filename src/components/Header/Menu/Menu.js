import React from 'react';
import './menu.scss';
import { Transition, animated } from 'react-spring/renderprops';
import ChangeNutrients from './Menu-change-nutrients';

const Menu = (props) => {
    const { toggleChangingNutrients, 
            changeDailyNutrientsActive, 
            changeDailyNutrients, 
            globalStartingNutrients, 
            activateMenu, 
            introQuestionsAnswered, 
            addNewDateTracker } = props;

    const addNutrient = () => {
        addNewDateTracker()
        activateMenu();
    }

    const reset = () => {
        localStorage.clear();
        window.location.reload();
    }
    
    return (
        <div className="menu">
            <ul>
                <li onClick={introQuestionsAnswered === true ? toggleChangingNutrients : null}>Change Daily Nutrient Goals</li>
                {<Transition
                    items={changeDailyNutrientsActive === true && introQuestionsAnswered === true}
                    from={{transform: 'scaleY(0)', transformOrigin: 'top'}}
                    enter={{transform: 'scaleY(1)', transformOrigin: 'top'}}
                    leave={{transform: 'scaleY(0)', transformOrigin: 'top',}}
                >
                {show => show && (props => (
                    <animated.div style={props} className="rs-changeNutrients">
                        <ChangeNutrients    changeDailyNutrients={changeDailyNutrients} 
                                            globalStartingNutrients={globalStartingNutrients}
                                            toggleChangingNutrients={toggleChangingNutrients}
                                            activateMenu={activateMenu}
                        />
                    </animated.div>
                ))}
                </Transition>}
                <li onClick={introQuestionsAnswered === true ? addNutrient : null}>Add New Tracker</li>
                <li onClick={reset}>Reset App</li>
            </ul>
        </div>
    )
}

export default Menu