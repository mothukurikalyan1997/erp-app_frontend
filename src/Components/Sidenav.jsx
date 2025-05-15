import React, { act, useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import GridViewIcon from '@mui/icons-material/GridView';
import HandshakeIcon from '@mui/icons-material/Handshake';


import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';


import { useLocation } from "react-router-dom"; // To get current route and highlight active

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("company_id");
    localStorage.removeItem("email");
    localStorage.removeItem("role");

    // Redirect to the login page after logging out
    navigate("/login");
  };


const dropdownMenus = [
  {
    id: 'Employee',
    label: 'Employee',
    icon: <PersonIcon />,
    basePath: '/employee',
    roles: ['admin', 'super_user'], // 👈 only these roles can see it
    links: [
      { to: '/employee/employeetable', label: 'Employee Table' },
      { to: '/employee/employeesaltable', label: 'Salary Table' },
    ],
  },
  {
    id: 'accounts',
    label: 'Accounts',
    icon: <SecurityIcon />,
    basePath: '/accounts',
    roles: ['admin', 'super_user'], // 👈 visible to admin and user
    links: [
      { to: '/accounts/Newinvoicelist', label: 'Invoice Data' },
    ],
  },
  {
    id: 'purchase',
    label: 'Purchase',
    icon: <ShoppingCartIcon />,
    basePath: '/purchase',
    roles: ['admin', 'super_user'], // 👈 only visible to super_user
    links: [
      { to: '/purchase/expensetable', label: 'Expenses' },
    ],
  },
];


const Sidenav = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");

    // Redirect to the login page after logging out
    navigate("/login");
  };

  const role = localStorage.getItem("role");

  const location = useLocation();
  const [openDropdowns, setOpenDropdowns] = useState({});

  // Keep dropdowns open if current route matches any basePath
  useEffect(() => {
    const updatedDropdowns = {};
    dropdownMenus.forEach(menu => {
      updatedDropdowns[menu.id] = location.pathname.startsWith(menu.basePath);
    });
    setOpenDropdowns(updatedDropdowns);
  }, [location]);

  const toggleDropdown = (id) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (

    <div className="sidebar">

<nav className="sidenav">
      <NavLink
        to="/Landing"
        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
      ><span style={{marginRight:'5px'}}><GridViewIcon/></span>
        Dashboard
      </NavLink>
      <NavLink
        to="/partner/Customers"
        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
      ><span style={{marginRight:'5px'}}><HandshakeIcon/></span>
        Partners
      </NavLink>
      <NavLink
        to="/assetmanagement"
        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
      ><span style={{marginRight:'5px'}}><DeliveryDiningIcon/></span>
          Asset Manager
      </NavLink>

      {dropdownMenus
  .filter(menu => menu.roles.includes(role)) // 👈 filter by role
  .map(menu => (
    <div className="dropdown" key={menu.id}>
      <button
        className="dropdown-toggle"
        onClick={() => toggleDropdown(menu.id)}
      >
        <span style={{ marginRight: '5px' }}>{menu.icon}</span>
        {menu.label}
        <ArrowDropDownIcon />
      </button>

      {openDropdowns[menu.id] && (
        <div className="dropdown-menu">
          {menu.links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive ? 'dropdown-link active' : 'dropdown-link'
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  ))}


{role === 'super_user' && (
  <NavLink
    to="/Signup"
    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
  >
    <span style={{ marginRight: '5px' }}>
      <HomeIcon />
    </span>
    Add New User
  </NavLink>
)}

      {role === 'super_user' || role === 'admin' && (<NavLink
        to="/Banking"
        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
      ><span style={{marginRight:'5px'}}><HomeIcon/></span>
        Bank
      </NavLink>)}
      <NavLink
        to="/Login"
        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        onClick={handleLogout}
      ><span style={{marginRight:'5px'}}><LogoutIcon/></span>
        Logout
      </NavLink>
    </nav>


    </div>

  )
}

export default Sidenav
