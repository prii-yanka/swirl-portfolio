import React, { useContext } from 'react';
import { NavContext } from '../context/NavContext';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';



const NavLink = ({ navLinkId, scrollToId }) => {
    const { activeNavLinkId, setActiveNavLinkId } = useContext(NavContext);
    const nav_items = 'nav-items'
    let active = activeNavLinkId === navLinkId ? 'activeClass' : ''

    const handleClick = () => {
        setActiveNavLinkId(navLinkId);
        document.getElementById(scrollToId).scrollIntoView({ behavior: 'smooth' });
    };

    const Icon = ({ navLinkId }) => {
        if (navLinkId == 'Intro') {
            return <PersonIcon fontSize='large' sx={{
                color: `${activeNavLinkId === 'Intro' ? "#fed46e" : "#EF8181"}`
            }} />
        }
        else if (navLinkId == 'Education') {
            return <SchoolIcon fontSize='large' sx={{
                color: `${activeNavLinkId === 'Education' ? "#fed46e" : "#EF8181"}`
            }} />
        }
        else if (navLinkId == 'Skills') {
            return <DisplaySettingsIcon fontSize='large' sx={{
                color: `${activeNavLinkId === 'Skills' ? "#fed46e" : "#EF8181"}`
            }} />
        }
        else if (navLinkId == 'Portfolio') {
            return <MenuBookIcon fontSize='large' sx={{
                color: `${activeNavLinkId === 'Portfolio' ? "#fed46e" : "#EF8181"}`
            }} />
        }
        else if (navLinkId == 'Contact') {
            return <AlternateEmailIcon fontSize='large' sx={{
                color: `${activeNavLinkId === 'Contact' ? "#fed46e" : "#EF8181"}`
            }} />
        }
    }


    return (
        <div id={navLinkId}
            className={nav_items + " " + active}
            title={navLinkId}
            onClick={handleClick}>
            {/* {navLinkId} */}
            <Icon navLinkId={navLinkId} className="icons" />
        </div>

    );
};

export default NavLink;