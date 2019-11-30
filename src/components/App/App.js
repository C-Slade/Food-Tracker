import React from 'react';
import { Transition, animated } from 'react-spring/renderprops';
import IntroQuestion from '../IntroQuestion/IntroQuestion';
import Header from '../Header/Header';
import DateTracker from '../Date-tracker/Date-tracker';
import Menu from '../Header/Menu/Menu';
import State from './state.js'
import './app.scss';

class App extends React.Component {
    state = localStorage.getItem('localState') ? JSON.parse(localStorage.getItem('localState')) : State

    updateLocal(state) {
        localStorage.setItem('localState', JSON.stringify(state))
    }

    checkAnsweredQuestions() {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();

        let numOfAnswered = 0;

        this.state.questions.map(question => (question.answered === true) ? numOfAnswered++ : null);

        if (numOfAnswered >= 7) { 
            this.setState({introQuestionsAnswered: true});

            let doN = [...this.state.dateOfNutrients];
            doN[0].isActive = true
            doN[0].date = `${mm}/${dd}/${yyyy}`;

            this.setState({dateOfNutrients: doN})
        }
    }

    addNutrient = (answer, addIndex, questionType) => {
        const unansweredQuestion = (question) => question.answered === false;
        const unusedIndex = this.state.questions.findIndex(unansweredQuestion);

        this.setState({
            questions: this.state.questions.map((question, index) => {
                if (unusedIndex === index) {
                    return {
                        ...question,
                        answered: true,
                        amount: answer,
                    }
                }
                return question
            })
        })

        this.setState(prevState => ({
            globalStartingNutrients: [
                ...prevState.globalStartingNutrients,
                {
                    type: questionType,
                    amount: parseInt(answer),
                    current: 0
                }
            ]
        }))
        

        const copyOfDON = this.state.dateOfNutrients;
        copyOfDON[0].nutrients.push({type: questionType, amount: answer, current: 0})

        this.setState(prevState => ({
            dateOfNutrients: copyOfDON
        }))
        this.checkAnsweredQuestions();
    }

    addMeal = (meal) => {
        const mealArr = meal.map(eachMeal => {
            if (eachMeal.mealName) {
                return {
                    type: eachMeal.type,
                    value: eachMeal.value
                }
            } else {
                return {
                    type: eachMeal.type,
                    value: parseInt(eachMeal.value)
                }
            }
        })

        const copiedDON = [...this.state.dateOfNutrients]
        const activeDate = copiedDON.find(active => active.isActive === true);
        activeDate.meals.push(mealArr)
        activeDate.noMeals = false

        this.setState(prevState => ({
            dateOfNutrients: copiedDON
        }))

        this.setState({AddingMealActive: false})
    }

    activateForm = () => {
        this.setState(prevState => ({
            AddingMealActive: !prevState.AddingMealActive
        }))
    }

    cancelForm = () => {
        this.setState({AddingMealActive: false})
    }

    inputsAreNaN = (boolean) => {
        this.setState(prevState => ({
            inputsAreNaN: boolean
        }))
    }

    inputsAreEmpty = (boolean) => {
        this.setState(prevState => ({
            inputsAreEmpty: boolean
        }))
    }

    activateMenu = () => {
        this.setState(prevState => ({
            menuIsActive: !prevState.menuIsActive
        }))
    }

    toggleChangingNutrients = () => {
        this.setState(prevState => ({
            changeDailyNutrientsActive: !prevState.changeDailyNutrientsActive
        }))
    }

    changeDailyNutrientsStateToFalse = () => {
        this.setState({changeDailyNutrientsActive: false})
    }

    changeDailyNutrients = (globalNutrients) => {
       const newGlobal = this.state.globalStartingNutrients.map(nutrient => {
            globalNutrients.map(input => {
                if (input.type === nutrient.type) {
                    nutrient.amount = input.amount
                }
                return null
            })
            return nutrient
        })
        this.setState({globalStartingNutrients: newGlobal})
    }

    toggleQuestionValidation = (boolean) => {
        this.setState({introQuestionIsValid: boolean})
    }

    addNewDateTracker = () => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();

        const activeDON = (DON) => DON.isActive === true;
        const activeDONIndex = this.state.dateOfNutrients.findIndex(activeDON);

        const copyOfDON = this.state.dateOfNutrients;
        copyOfDON[activeDONIndex].isActive = false;

        this.setState({dateOfNutrients: copyOfDON})

        const nutrients = this.state.globalStartingNutrients.map(GN => {
            return {amount: parseInt(GN.amount), type: GN.type, current: 0}
        })

        this.setState(prevState => ({
            dateOfNutrients: [
                ...prevState.dateOfNutrients,
                {
                    isActive: true,
                    date: `${mm}/${dd}/${yyyy}`,
                    noMeals: true,
                    nutrients: nutrients,
                    meals: []
                }
            ]
        }))
    }

    prieviewLastDON = () => {
        const activeDON = (DON) => DON.isActive === true;
        const activeDONIndex = this.state.dateOfNutrients.findIndex(activeDON);
        const copyOfDON = this.state.dateOfNutrients;

        if (activeDONIndex - 1 !== -1) {
            copyOfDON[activeDONIndex].isActive = false;
            copyOfDON[activeDONIndex - 1].isActive = true;

            this.setState({dateOfNutrients: copyOfDON})
        }
    }

    prieviewNextDON = () => {
        const activeDON = (DON) => DON.isActive === true;
        const activeDONIndex = this.state.dateOfNutrients.findIndex(activeDON);
        const copyOfDON = this.state.dateOfNutrients;

        if (activeDONIndex + 1 !== copyOfDON.length) {
            copyOfDON[activeDONIndex].isActive = false;
            copyOfDON[activeDONIndex + 1].isActive = true;

            this.setState({dateOfNutrients: copyOfDON})
        }
    }

    checkForUnansweredQuestion = () => {
        const unansweredQuestion = (question) => question.answered === false;
        const unusedIndex = this.state.questions.findIndex(unansweredQuestion);
        
        if (this.state.introQuestionsAnswered === false){
            return (
                <IntroQuestion  question={this.state.questions[unusedIndex]}
                                questionKey={this.state.questions[unusedIndex].type} 
                                index={0}
                                addNutrient={this.addNutrient}
                                toggleQuestionValidation={this.toggleQuestionValidation}
                                isIntroQuestionValid={this.state.introQuestionIsValid}
                />         
            )
        } else {
            this.updateLocal(this.state)
            return (
                <DateTracker globalInfo={this.state.globalStartingNutrients}
                             dateOfNutrients={this.state.dateOfNutrients.find(doN => doN.isActive === true)}
                             activeForm={this.state.AddingMealActive} 
                             activateForm={this.activateForm} 
                             addMeal={this.addMeal}
                             cancelForm={this.cancelForm}
                             inputsAreNaN={this.inputsAreNaN}
                             checkInputs={this.state.inputsAreNaN}
                             checkEmptyInputs={this.state.inputsAreEmpty}
                             inputsAreEmpty={this.inputsAreEmpty}
                             prieviewLastDON={this.prieviewLastDON}
                             prieviewNextDON={this.prieviewNextDON}
                             />
            )
        }
    }



    render() {
        return (
            <React.Fragment>
                <Header toggleMenu={this.activateMenu} menuIsActive={this.state.menuIsActive} changeDailyNutrientsStateToFalse={this.changeDailyNutrientsStateToFalse}/>
                <Transition
                    items={this.state.menuIsActive}
                    from={{transform: 'scaleY(0)', transformOrigin: 'top', top: '0'}}
                    enter={{transform: 'scaleY(1)', transformOrigin: 'top', top: '4rem'}}
                    leave={{transform: 'scaleY(0)', transformOrigin: 'top', top: '0'}}
                >
                {show => show && (props => (
                    <animated.div style={props} className="rs-menu">
                        <Menu   changeDailyNutrientsActive={this.state.changeDailyNutrientsActive} 
                                toggleChangingNutrients={this.toggleChangingNutrients}
                                changeDailyNutrients={this.changeDailyNutrients}
                                globalStartingNutrients={this.state.globalStartingNutrients}
                                activateMenu={this.activateMenu}
                                introQuestionsAnswered={this.state.introQuestionsAnswered}
                                addNewDateTracker={this.addNewDateTracker}
                                />
                    </animated.div>
                ))}

                </Transition>
                {this.checkForUnansweredQuestion()}
            </React.Fragment>
        )
    }
} 

export default App;