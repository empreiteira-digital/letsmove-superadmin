import { defineStore } from 'pinia';
import getProfessionals from '@/api/Professionals';

const useProfessionalsStore = defineStore('Professionals', {
  // Data
  state: () => ({
    professionals: [],
    isLoading: false,
  }),
  // Methods
  actions: {
    async getProfessionals() {
      try {
        this.isLoading = true;
        this.professionals = await getProfessionals();
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    },
  },
});

export default useProfessionalsStore;
