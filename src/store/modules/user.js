import axios from 'axios';

export const user = {
  namespaced: true,
  state: {
    user: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    clearAuth(state) {
      axios.defaults.headers.common['Authorization'] = null;
      state.user = null;
      localStorage.removeItem('accessToken');
    },
    setToken(state, payload) {
      localStorage.setItem('accessToken', payload);
    },
  },
  actions: {
    login: async ({ commit }, user) => {
      try {
        let response = await axios.post(
          'http://localhost:5000/api/users/login',
          {
            email: user.email,
            password: user.password,
          }
        );
        const token = response.data.token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        response = await axios.get('http://localhost:5000/api/users/user');
        commit('setUser', response.data);
        commit('setToken', token);
        return response;
      } catch (err) {
        throw new Error(err.response.data);
      }
    },
    logout({ commit }) {
      commit('clearAuth');
    },
    setUser({ commit }, payload) {
      commit('setUser', payload);
    },
  },
};