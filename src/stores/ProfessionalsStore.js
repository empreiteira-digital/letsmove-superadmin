import { defineStore } from 'pinia';
import {
  findProfessionals,
  findProfessionalById,
  findUserById,
  getTokenProfessional,
} from '@/api/SuperAdmin';

const useProfessionalsStore = defineStore('Professionals', {
  // Data
  state: () => ({
    professionals: [],
    professionalInfo: {},
    userInfo: {},
    isLoadingProfessionals: false,
    isLoadingProfessional: true,
    isLoadingUser: true,
    isCPFEditable: false,
  }),
  // Methods
  actions: {
    async getProfessionals() {
      try {
        this.isLoadingProfessionals = true;
        this.professionals = await findProfessionals();
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoadingProfessionals = false;
      }
    },
    async getProfessionalById(id) {
      try {
        this.isLoadingProfessional = true;
        this.professionalInfo = await findProfessionalById(id);
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoadingProfessional = false;
      }
    },
    async getUserById(id) {
      try {
        this.isLoadingUser = true;
        this.userInfo = await findUserById(id);
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoadingUser = false;
      }
    },
    async getTokenProfessional(id) {
      try {
        const user = await getTokenProfessional(id);
        window.open(`${import.meta.env.VITE_LM_DASHBOARD_URL}/login-admin/${id}?token=${user.tokenLoginAdmin}`, '_blank');
      } catch (e) {
        console.error(e);
      }
    },
  },
});

export default useProfessionalsStore;
