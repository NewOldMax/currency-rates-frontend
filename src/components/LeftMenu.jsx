import React from 'react';
import { Link } from 'react-router';
import { Nav, NavItem } from 'reactstrap';
import LogoIcon from 'react-icons/lib/md/account-balance';
import HomeIcon from 'react-icons/lib/md/home';
import PairsIcon from 'react-icons/lib/md/attach-money';
import LogoutIcon from 'react-icons/lib/md/undo';

const style = {
    nav: {
        backgroundColor: '#f5f5f5',
        position: 'fixed',
        left: 0,
        top: 0,
        height: '100%',
        width: '150px',
        boxShadow: 'rgba(0, 0, 0, 0.08) 0px 3px 4px, rgba(0, 0, 0, 0.08) 0px 3px 2px',
    },
    item: {
        padding: '0 0 16px 16px',
        fontSize: '14px',
    },
    logo: {
        fontSize: '50px',
        margin: '4px auto 28px',
        color: '#097b67',
    },
};

const links = [
    { link: '/', icon: <HomeIcon />, text: 'Home' },
    { link: '/pairs', icon: <PairsIcon />, text: 'Currency Pairs' },
    { link: '/logout', icon: <LogoutIcon />, text: 'Logout' },
];

const renderItems = items => items.map((item, i) => (
    <NavItem style={style.item} key={i}>
        <Link activeClassName="active" to={item.link}>
            {item.icon} {item.text}
        </Link>
    </NavItem>
));

class LeftMenu extends React.Component {

    render() {
        return (
            <Nav
                id="left-menu"
                vertical
                style={style.nav}
            >
                <Link to="/" style={style.logo}><LogoIcon /></Link>
                {renderItems(links)}
            </Nav>
        );
    }
}

export default LeftMenu;
