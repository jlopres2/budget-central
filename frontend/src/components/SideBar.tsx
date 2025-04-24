import React from 'react';
import { NavLink, Link } from 'react-router-dom';

type SidebarItem = {
  name: string;
  path: string;
};

type SidebarProps = {
  items: SidebarItem[];
};

const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  return (
    <div className="w-64 h-screen bg-base-200 p-4 flex flex-col items-center">
      <ul className="menu text-base-content font-poppins text-center">
        <div className="dropdown dropdown-right">
            <div tabIndex={0} role="button" className="btn-ghost m-1 font-bold">Charles Dalisay</div> {/*Insert pictures here*/}
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 w-52 p-2 shadow-sm">
                <li><Link to="/Profile/">Profile</Link></li>
                <li><Link to="/Settings/">Settings</Link></li>
                <li><Link to="/logout/">Logout</Link></li>
            </ul>
        </div>
        
        {items.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `block w-full p-2 rounded-md ${
                  isActive ? 'bg-green-700 text-white' : 'hover:bg-green-700 hover:text-white'
                }`
              } 
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;