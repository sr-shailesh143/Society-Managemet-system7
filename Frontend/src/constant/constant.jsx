const constant = {
  API: import.meta.env.VITE_API_URL || "http://localhost:8001/api",  // Default to backend API URL for local dev
};

export default constant;
