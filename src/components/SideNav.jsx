import React, {useState} from 'react';
import {Link} from  'react-router-dom';
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarFooter, SidebarContent } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import './SideNav.css'
import logoImg from '../images/logo.png'
import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";

    const SideNav = (props) => {
        const {onLogOut} = props
        const [menuCollapse, setMenuCollapse] = useState(false)
        const menuIconClick = () => {
            menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
        };

        return (
            <>
                <div id="sidenav">
                    <ProSidebar collapsed={menuCollapse}>
                    <SidebarHeader>
                    <div className="logotext">
                        <p>{menuCollapse ? 'Logo' : <img src={logoImg} className='logo' alt='PlantPal logo' width='120px'/>}</p>
                    </div>
                    <div className="closemenu" onClick={menuIconClick}>
                        {menuCollapse ? (
                            <FiArrowRightCircle/>
                        ) : (
                            <FiArrowLeftCircle/>
                        )}
                    </div>
                    </SidebarHeader>

                    <SidebarContent>
                        <Menu iconShape="square">
                            <MenuItem active={true} icon={<FiHome />}>
                                <Link to='/dashboard'>
                                    Dashboard
                                </Link>
                            </MenuItem>

                            <MenuItem icon={<FaRegHeart />}>
                                <Link to='/plants'>
                                    Plants
                                </Link>
                            </MenuItem>

                            <MenuItem icon={<FaList />}>
                                Tasks
                            </MenuItem>
                            
                            <MenuItem icon={<RiPencilLine />}>
                                Guides
                            </MenuItem>
                        
                            <MenuItem icon={<BiCog />}>
                                <Link to='/profile'>
                                    Settings
                                </Link>
                            </MenuItem>

                        </Menu>
                    </SidebarContent>

                    <SidebarFooter>
                        <Menu iconShape="square">
                            <MenuItem icon={<FiLogOut />}>
                                <button onClick={onLogOut} id='logoutButton'>Logout</button>
                            </MenuItem>
                        </Menu>
                    </SidebarFooter>
                    </ProSidebar>
                </div>
            </>
        )
    };

export default SideNav;