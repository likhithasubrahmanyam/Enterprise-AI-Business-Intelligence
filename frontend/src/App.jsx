
import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Customers from "./pages/Customers";
import Products from "./pages/Products";
import Sales from "./pages/Sales";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import AIAssistant from "./pages/AIAssistant";

import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("token"))
  );

  const [currentPage, setCurrentPage] = useState("dashboard");

  function handleLogin() {
    setIsAuthenticated(true);
    setCurrentPage("dashboard");
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setCurrentPage("dashboard");
  }

  function renderPage() {
    switch (currentPage) {
      case "employees":
        return <Employees />;

      case "customers":
        return <Customers />;

      case "products":
        return <Products />;

      case "sales":
        return <Sales />;

      case "reports":
        return <Reports />;

      case "settings":
        return <Settings />;

      case "ai":
        return <AIAssistant />;

      case "dashboard":
      default:
        return <Dashboard />;
    }
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-layout">
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />

      <div className="main-area">
        <Header onLogout={handleLogout} />

        <main className="page-content">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
