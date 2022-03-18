import { Link } from 'react-router-dom';

function MobileMenu(props) {
  return (
    <section className={props.isMenuOpen ? 'menu_mobile' : 'menu_mobile menu_hidden'}>
      <span className="menu__email">{props.email}</span>
      <Link to="/sign-in" onClick={props.handleLogout} className="menu__link">
        Выйти
      </Link>
    </section>
  );
};

export default MobileMenu;