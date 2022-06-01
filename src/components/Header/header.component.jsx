import React from 'react';
import { Link } from 'react-router-dom';

import { Links } from '../../data/nav-links/links';
import logo from '../../assets/logo.png';

import './header.styles.scss';

export const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="header_wrapper">
          <div className="logo_container">
            <Link to="/">
              <img src={logo} alt="Logo" width="80" />
            </Link>
          </div>
          <div className="nav_links">
            {Links.map((link) => (
              <Link to={link.slug} className="link" key={link.id}>
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
