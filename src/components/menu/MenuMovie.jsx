import React, { useState } from "react";
import { Menu as MenuTop, Switch } from 'antd';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.svg';

import './Menu.scss'

export default function Menu(props) {
    const { theme, changeTheme } = props
    const [current, setCurrent] = useState('1');

    const items = [
        { key: '1', label: <Link to="/">Inicio</Link> },
        { key: '2', label: <Link to="/movies/:id">Peliculas</Link> },
        { key: '3', label: <Link to="/new-movies">Lanzamientos nuevos</Link> },
        { key: '4', label: <Link to="/popularBuster">Populares</Link> },
        { key: '5', label: <Link to="/search-Movie">Buscar</Link> },
    ]

    const handleClick = (e) => {
        setCurrent(e.key); // 🟢 Guarda el ítem seleccionado
    };

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
                onClick={handleClick}
                mode="horizontal"
                selectedKeys={[current]}
                items={items}
                style={{ width: "100%", lineHeight: "64px" }}
            >
            </MenuTop>
        </div>

    )
};