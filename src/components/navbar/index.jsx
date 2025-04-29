import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { userShape } from '@components/thread/item';

const MenuItems = () => (
  <>
    <li><Link to="/">Threads</Link></li>
    <li><Link to="/leaderboards">Leaderboards</Link></li>
  </>
);

const MenuButton = () => (
  <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h8m-8 6h16"
      />
    </svg>
  </div>
);

const Navbar = ({ authUser, signOut }) => (
  <nav className="navbar bg-base-300 text-base-content shadow-sm">
    <div className="navbar-start">
      <div className="dropdown">
        <MenuButton />
        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          <MenuItems />
        </ul>
      </div>
      <Link to="/" className="btn btn-ghost text-xl">Forum Web</Link>
    </div>

    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
        <MenuItems />
      </ul>
    </div>

    <div className="navbar-end gap-2">
      <div className="avatar">
        <div className="w-8 rounded-full">
          <img
            src={authUser.avatar}
            alt="avatar-image"
            className="avatar-image"
          />
        </div>
      </div>
      <button
        type="button"
        className="btn btn-soft btn-error"
        onClick={signOut}
      >
        Logout
      </button>
    </div>
  </nav>
);

Navbar.propTypes = {
  authUser: PropTypes.shape(userShape).isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Navbar;