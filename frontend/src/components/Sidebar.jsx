
function Sidebar({ currentPage, onNavigate }) {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-box">EB</div>

        <div>
          <h2>Enterprise BI</h2>
          <span>Business Intelligence</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="nav-section">MAIN</div>

        <button
          className={`nav-item ${
            currentPage === "dashboard" ? "active" : ""
          }`}
          onClick={() => onNavigate("dashboard")}
        >
          <span>▦</span>
          Dashboard
        </button>

        <button
          className={`nav-item ${
            currentPage === "employees" ? "active" : ""
          }`}
          onClick={() => onNavigate("employees")}
        >
          <span>♙</span>
          Employees
        </button>

        <button
          className={`nav-item ${
            currentPage === "customers" ? "active" : ""
          }`}
          onClick={() => onNavigate("customers")}
        >
          <span>♧</span>
          Customers
        </button>

        <button
          className={`nav-item ${
            currentPage === "products" ? "active" : ""
          }`}
          onClick={() => onNavigate("products")}
        >
          <span>▣</span>
          Products
        </button>

        <button
          className={`nav-item ${
            currentPage === "sales" ? "active" : ""
          }`}
          onClick={() => onNavigate("sales")}
        >
          <span>▤</span>
          Sales
        </button>

        <div className="nav-section">ANALYTICS</div>

        <button
          className={`nav-item ${
            currentPage === "reports" ? "active" : ""
          }`}
          onClick={() => onNavigate("reports")}
        >
          <span>◫</span>
          Reports
        </button>

        <button
          className={`nav-item ${
            currentPage === "ai" ? "active" : ""
          }`}
          onClick={() => onNavigate("ai")}
        >
          <span>✧</span>
          AI Assistant
        </button>

        <div className="nav-section">SYSTEM</div>

        <button
          className={`nav-item ${
            currentPage === "settings" ? "active" : ""
          }`}
          onClick={() => onNavigate("settings")}
        >
          <span>⚙</span>
          Settings
        </button>
      </nav>

      {/* User */}
      <div className="sidebar-footer">
        <div className="user-avatar">L</div>

        <div className="user-info">
          <strong>Likhitha</strong>
          <span>Administrator</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
