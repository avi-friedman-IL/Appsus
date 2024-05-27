const { Link, NavLink } = ReactRouterDOM;
const { useState } = React;
export function AppHeader() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  function handleToggleModal() {
    setIsOpenModal((isOpenModal) => !isOpenModal);
  }

  return (
    <React.Fragment>
      <header className="app-header">
        <NavLink to="/">
          <img
            className="logo"
            src="https://www.svgrepo.com/show/10350/logo.svg"
          />
        </NavLink>
        {/* <Link to="/">
        <h3>LOGO!</h3>
      </Link>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/mail">Mail</NavLink>
        <NavLink to="/note">Note</NavLink> */}
        <nav>
          <img
            className="menu"
            src="https://www.svgrepo.com/show/10257/menu.svg"
            onClick={handleToggleModal}
          />
        </nav>
      </header>
      {isOpenModal && <IconsModal onToggleModal={handleToggleModal} />}
    </React.Fragment>
  );
}

function IconsModal({ onToggleModal }) {
  return (
    <section className="menu-modal">
      <NavLink to="/">
        <img
          src="https://www.svgrepo.com/show/421619/home-menu-web.svg"
          alt="home"
          title="home"
          onClick={onToggleModal}
        />
      </NavLink>

      <NavLink to="/about">
        <img
          src="https://www.svgrepo.com/show/475026/about.svg"
          alt="about"
          title="about"
          onClick={onToggleModal}
        />
      </NavLink>

      <NavLink to="/mail">
        <img
          src="https://www.svgrepo.com/show/349378/gmail.svg"
          alt="mail"
          title="mail"
          onClick={onToggleModal}
        />
      </NavLink>

      <NavLink to="/note">
        <img
          src="https://www.svgrepo.com/show/353816/google-keep.svg"
          alt="keep"
          title="keep"
          onClick={onToggleModal}
        />
      </NavLink>
    </section>
  );
}
