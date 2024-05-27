const { Link, NavLink } = ReactRouterDOM;
const { useState } = React;
export function AppHeader() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  function handleToggleModal() {
    setIsOpenModal((isOpenModal) => !isOpenModal);
    console.log(isOpenModal);
  }

  return (
    <header className="app-header">
      <Link to="/">
        <h3>LOGO!</h3>
      </Link>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/mail">Mail</NavLink>
        <NavLink to="/note">Note</NavLink>
        <span onClick={handleToggleModal}>
          <img src="../assets/img/apps_24dp_FILL0_wght400_GRAD0_opsz24.png" />
        </span>
        {isOpenModal && <IconsModal onToggleModal={handleToggleModal} />}
      </nav>
    </header>
  );
}

function IconsModal({ onToggleModal }) {
  return (
    <section className="icons-modal">
      <NavLink to="/">
        <img
          // src="../assets/img/home.png"
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
          // src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
          src="https://www.svgrepo.com/show/353816/google-keep.svg"
          alt="keep"
          title="keep"
          onClick={onToggleModal}
        />
      </NavLink>
    </section>
  );
}
