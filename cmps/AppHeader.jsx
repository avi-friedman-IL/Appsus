const { Link, NavLink } = ReactRouterDOM;
const { useState } = React;
export function AppHeader() {
  const [isOpenModal, setIsOpenModal] = useState(true);

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
        <img src="../assets/img/home.png" alt="home" onClick={onToggleModal} />
      </NavLink>

      <NavLink to="/about">
        <img
          src="../assets/img/about.png"
          alt="about"
          onClick={onToggleModal}
        />
      </NavLink>

      <NavLink to="/mail">
        <img src="../assets/img/mail.png" alt="mail" onClick={onToggleModal} />
      </NavLink>

      <NavLink to="/note">
        <img
          src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
          alt="keep"
          onClick={onToggleModal}
        />
      </NavLink>
    </section>
  );
}
