
   
import React, { useState } from 'react';
import * as Io from 'react-icons/io'; //some nice looking icons
import { Link } from 'react-router-dom';

const NavLinks = [ // Creating information for each page
    {
      path: '/home',
      page: 'Homepage',
      icon: <Io.IoIosHome />,
      cssname: 'sidebar_info'
    },
    {
      path: '/new',
      page: 'New Playlist',
      icon: <Io.IoIosAdd />,
      cssname: 'sidebar_info'
    },
    {
      path: '/play',
      page: 'Playlists',
      icon: <Io.IoIosPlay />,
      cssname: 'sidebar_info'
    },

  ];

function Sidebar() {
  const [sidebar, sidebarToggle] = useState(false); // toggling sisdebar

  const revealSB = () => sidebarToggle(!sidebar); // using toggle to show sidebar

  return (
    <>
        <div className="togglesidebar">
          <Link to='#' className="opensidebar">
            <Io.IoIosMenu onClick={revealSB} />
          </Link>
        </div>

        <nav className={sidebar ? 'sidebar active' : 'sidebar'}>
          <ul onClick={revealSB}>
            <li className='closesidebar'>
              <Link to='#' className='opensidebar'>
                <Io.IoIosClose />
              </Link>
            </li>
            {NavLinks.map((item, index) => {
              return (
                <li key={index} className={item.cssname}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.page}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
    </>
  );
}

export default Sidebar;
