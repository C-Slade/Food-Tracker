import React from 'react';
import './header.scss'

const Header = ({toggleMenu, menuIsActive, changeDailyNutrientsStateToFalse}) => {
    const hideMenu = () => {
        toggleMenu()
        changeDailyNutrientsStateToFalse();
    }
    return (
        <div className='header'>
            <h3>Food Tracker</h3>
            <i className="material-icons" onClick={hideMenu}>{menuIsActive === true ? "clear" : "menu"}</i>
        </div>
    )
}

export default Header;