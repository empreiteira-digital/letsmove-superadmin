import { defineStore } from 'pinia';
import { login } from '@/api/SuperAdmin';

const useAuthStore = defineStore('Auth', {
  // Data
  state: () => ({
    isAuthenticated: false,
    isLoadingAdmin: false,
    access_token: '',
    error: '',
  }),
  // Methods
  actions: {
    async login(data) {
      try {
        this.isLoadingAdmin = true;

        const result = await login(data);
        if (result) {
          this.access_token = result.access_token;
          localStorage.setItem('access_token', this.access_token);
          this.isAuthenticated = true;
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoadingAdmin = false;
      }
    },
    async logout() {
      this.isAuthenticated = false;
      localStorage.removeItem('access_token');
    },
    async checkAuthentication() {
      const token = localStorage.getItem('access_token');
      this.isAuthenticated = !!token;
    },
  },
});

export default useAuthStore;
