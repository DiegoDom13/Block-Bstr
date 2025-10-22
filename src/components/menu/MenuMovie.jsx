import React, { useState } from "react";
import { Menu as MenuTop, Switch } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/logo.svg';

import './Menu.scss'

export default function Menu(props) {
    const { theme, changeTheme } = props
    const location = useLocation();

    // 🔹 Mapeo de rutas a claves del menú
    const getKeyFromPath = (pathname) => {
        if (pathname === '/') return '1';
        if (pathname === '/new-movies') return '2';
        if (pathname === '/popularBuster') return '3';
        if (pathname === '/search-Movie') return '4';
        return ''; // Si no coincide con ninguna, no selecciona nada
    };

    const currentKey = getKeyFromPath(location.pathname);
 
    const items = [
        { key: '1', label: <Link to="/">Inicio</Link> },
        { key: '2', label: <Link to="/new-movies">Lanzamientos nuevos</Link> },
        { key: '3', label: <Link to="/popularBuster">Populares</Link> },
        { key: '4', label: <Link to="/search-Movie">Buscar</Link> },
    ]
    
    return (

        <div className="menu">
            <div className="menu__logo">
                <img src={Logo} alt="Logo" />
            </div>
            <Switch
                className="switch"
                checked={theme === 'dark'}
                onChange={changeTheme}
                checkedChildren='Dark'
                unCheckedChildren='Light'
            />
            <MenuTop
                className="menu-top"
                theme={theme}
                mode="horizontal"
                selectedKeys={[currentKey]}
                items={items}
                style={{ width: "100%", lineHeight: "64px" }}
            >
            </MenuTop>
        </div>

    )
};