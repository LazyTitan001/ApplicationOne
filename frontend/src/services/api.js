import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/rules';


const api = {
  createRule: async (ruleData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/create`, ruleData);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.details ||
                          error.response?.data?.error ||
                          'Failed to create rule';
      throw new Error(errorMessage);
    }
  },

  getAllRules: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}`);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.details ||
                          error.response?.data?.error ||
                          'Failed to fetch rules';
      throw new Error(errorMessage);
    }
  },

  getRuleById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.details ||
                          error.response?.data?.error ||
                          'Failed to fetch rule';
      throw new Error(errorMessage);
    }
  },

  combineRules: async (ruleIds) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/combine`, { ruleIds });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.details ||
                          error.response?.data?.error ||
                          'Failed to combine rules';
      throw new Error(errorMessage);
    }
  },

  evaluateRule: async (ast, data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/evaluate`, { ast, data });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.details ||
                          error.response?.data?.error ||
                          'Failed to evaluate rule';
      throw new Error(errorMessage);
    }
  },

};

export default api;
