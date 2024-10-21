import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/rules';

const api = {
  createRule: async (ruleData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/create`, ruleData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getAllRules: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  combineRules: async (ruleIds) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/combine`, { ruleIds });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  evaluateRule: async (ast, data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/evaluate`, { ast, data });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default api;