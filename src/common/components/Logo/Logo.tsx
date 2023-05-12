import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../svg/svgLogo.svg';
import { Path } from '../../../enums/path';
import s from './Logo.module.scss';

const Logo = () => {
    return (
        <NavLink to={Path.Root}>
            <img src={logo} alt="Logo" className={s.logo} />
        </NavLink>
    );
};

export default Logo;
