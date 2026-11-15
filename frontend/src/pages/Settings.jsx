function Settings() {
  return (
    <div className="page-section">

      <div className="page-title">
        <h2>Settings</h2>
        <p>Manage your application settings</p>
      </div>

      <div className="settings-grid">

        {/* Profile Settings */}
        <div className="table-card settings-card">

          <div className="table-header">
            <h3>Profile</h3>
          </div>

          <div className="settings-content">

            <div className="setting-row">
              <div>
                <strong>Name</strong>
                <p>Likhitha</p>
              </div>
            </div>

            <div className="setting-row">
              <div>
                <strong>Role</strong>
                <p>Administrator</p>
              </div>
            </div>

            <div className="setting-row">
              <div>
                <strong>Account Status</strong>
                <p className="status-active">Active</p>
              </div>
            </div>

          </div>
        </div>


        {/* System Settings */}
        <div className="table-card settings-card">

          <div className="table-header">
            <h3>System Information</h3>
          </div>

          <div className="settings-content">

            <div className="setting-row">
              <div>
                <strong>Application</strong>
                <p>Enterprise AI Business Intelligence</p>
              </div>
            </div>

            <div className="setting-row">
              <div>
                <strong>Version</strong>
                <p>1.0.0</p>
              </div>
            </div>

            <div className="setting-row">
              <div>
                <strong>Environment</strong>
                <p>Development</p>
              </div>
            </div>

          </div>
        </div>


        {/* Preferences */}
        <div className="table-card settings-card">

          <div className="table-header">
            <h3>Preferences</h3>
          </div>

          <div className="settings-content">

            <div className="setting-row setting-option">
              <div>
                <strong>Notifications</strong>
                <p>Receive system notifications</p>
              </div>

              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-row setting-option">
              <div>
                <strong>Email Updates</strong>
                <p>Receive business updates by email</p>
              </div>

              <label className="switch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
            </div>

          </div>
        </div>


        {/* Security */}
        <div className="table-card settings-card">

          <div className="table-header">
            <h3>Security</h3>
          </div>

          <div className="settings-content">

            <div className="setting-row">
              <div>
                <strong>Authentication</strong>
                <p>JWT Authentication</p>
              </div>
            </div>

            <div className="setting-row">
              <div>
                <strong>Access Control</strong>
                <p>Role-Based Access Control</p>
              </div>
            </div>

            <div className="setting-row">
              <div>
                <strong>Password Security</strong>
                <p>Password hashing enabled</p>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}

export default Settings;