import React from 'react';

class ChangeNutrients extends React.Component {
    state = {
        inputsAreInvalid: false
    }

    render() {
        let caloires = {amount: this.props.globalStartingNutrients[0].amount, type: this.props.globalStartingNutrients[0].type};
        let protien = {amount: this.props.globalStartingNutrients[1].amount, type: this.props.globalStartingNutrients[1].type};
        let carbs = {amount: this.props.globalStartingNutrients[2].amount, type: this.props.globalStartingNutrients[2].type};
        let sodium = {amount: this.props.globalStartingNutrients[3].amount, type: this.props.globalStartingNutrients[3].type};
        let fat = {amount: this.props.globalStartingNutrients[4].amount, type: this.props.globalStartingNutrients[4].type};
        let sugar = {amount: this.props.globalStartingNutrients[5].amount, type: this.props.globalStartingNutrients[5].type};
        let potassium = {amount: this.props.globalStartingNutrients[6].amount, type: this.props.globalStartingNutrients[6].type};
        let phosphorus = {amount: this.props.globalStartingNutrients[7].amount, type: this.props.globalStartingNutrients[7].type};

        let nutrientArr = [caloires, protien, carbs, sodium, fat, sugar, potassium, phosphorus];

        const update = (e) => {
            let isAllNumbers = true;
            nutrientArr.forEach(nutrient => isNaN(nutrient.amount) ? isAllNumbers = false : null)
            e.preventDefault();

            if (isAllNumbers === true) {
                this.props.changeDailyNutrients(nutrientArr);
                this.props.activateMenu();
                this.props.toggleChangingNutrients('true');
                this.setState({inputsAreInvalid: false})
            } else {
                this.setState({inputsAreInvalid: true})
            }
        }

        const inputError = () => {
            return (
                 <div className="inputError">
                    <i className="material-icons">priority_high</i>
                    <p>Nutrients must be number values</p>
                </div>
            )
        }

        return (
            <React.Fragment>
            {this.state.inputsAreInvalid === true ? inputError() : null}
                <form onSubmit={update} className="change-global-nutrients">
                    <input type="text" onChange={e => caloires.amount = parseInt(e.target.value)} placeholder={`New ${caloires.type} goal`}/>
                    <input type="text" onChange={e => protien.amount = parseInt(e.target.value)} placeholder={`New ${protien.type} goal`}/>
                    <input type="text" onChange={e => carbs.amount = parseInt(e.target.value)} placeholder={`New ${carbs.type} goal`}/>
                    <input type="text" onChange={e => sodium.amount = parseInt(e.target.value)} placeholder={`New ${sodium.type} goal`}/>
                    <input type="text" onChange={e => fat.amount = parseInt(e.target.value)} placeholder={`New ${fat.type} goal`}/>
                    <input type="text" onChange={e => sugar.amount = parseInt(e.target.value)} placeholder={`New ${sugar.type} goal`}/>
                    <input type="text" onChange={e => potassium.amount = parseInt(e.target.value)} placeholder={`New ${potassium.type} goal`}/>
                    <input type="text" onChange={e => phosphorus.amount = parseInt(e.target.value)} placeholder={`New ${phosphorus.type} goal`}/>
                    <input type="submit" value="Submit" className="CGN-submit"/>
                </form>
            </React.Fragment>
        )
    }
}

export default ChangeNutrients