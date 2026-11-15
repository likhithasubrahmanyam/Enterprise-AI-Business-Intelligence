function Header({ onLogout }) {
  return (
    <header className="header">

      <div className="header-left">

        <button className="menu-button">
          ☰
        </button>

        <div>
          <h1>Enterprise Business Intelligence</h1>
          <p>Business Overview</p>
        </div>

      </div>

      <div className="header-right">

        <button className="notification-button">
          🔔
        </button>

        <div className="header-user">

          <div className="header-avatar">
            L
          </div>

          <div>
            <strong>Likhitha</strong>
            <span>Administrator</span>
          </div>

          <button
            className="logout-button"
            onClick={onLogout}
          >
            Logout
          </button>

        </div>

      </div>

    </header>
  );
}

export default Header;