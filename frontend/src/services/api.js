const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      Accept: "application/json",
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    throw new Error(
      errorData.detail || `Request failed with status ${response.status}`
    );
  }

  return response.json();
}


// ==============================
// AUTHENTICATION
// ==============================

export function login(email, password) {
  const formData = new URLSearchParams();

  formData.append("username", email);
  formData.append("password", password);

  return fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: formData,
  }).then(async (response) => {
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Login failed");
    }

    return data;
  });
}


// ==============================
// DASHBOARD
// ==============================

export function getDashboardSummary() {
  return request("/dashboard/summary");
}

export function getMonthlyRevenue() {
  return request("/dashboard/monthly-revenue");
}

export function getSalesTrend() {
  return request("/dashboard/sales-trend");
}

export function getTopProducts() {
  return request("/dashboard/top-products");
}

export function getTopCustomers() {
  return request("/dashboard/top-customers");
}

export function getTopEmployees() {
  return request("/dashboard/top-employees");
}

export function getLowStockProducts() {
  return request("/dashboard/low-stock-products");
}


// ==============================
// EMPLOYEES
// ==============================

export function getEmployees() {
  return request("/employees/");
}

export function createEmployee(employeeData) {
  return request("/employees/", {
    method: "POST",
    body: JSON.stringify(employeeData),
  });
}


// ==============================
// CUSTOMERS
// ==============================

export function getCustomers() {
  return request("/customers/");
}

export function createCustomer(customerData) {
  return request("/customers/", {
    method: "POST",
    body: JSON.stringify(customerData),
  });
}


// ==============================
// PRODUCTS
// ==============================

export function getProducts() {
  return request("/products/");
}

export function createProduct(productData) {
  return request("/products/", {
    method: "POST",
    body: JSON.stringify(productData),
  });
}


// ==============================
// SALES
// ==============================

export function getSales() {
  return request("/sales/");
}

export function createSale(saleData) {
  return request("/sales/", {
    method: "POST",
    body: JSON.stringify(saleData),
  });
}