const { NavLink } = ReactRouterDOM

export function AppHeader() {
    return <header>
        <h1>Hello React</h1>
        <nav>
            <NavLink to="/book">Books |</NavLink>
            <NavLink to="/"> Home |</NavLink>
            <NavLink to="/about"> About</NavLink>
        </nav>
    </header>

}