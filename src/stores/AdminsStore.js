import { defineStore } from 'pinia';
import {
  findAdmins,
  findAdminById,
  updateAdmin,
  createAdmin,
  deleteAdmin,
} from '@/api/SuperAdmin';

const useAdminsStore = defineStore('Admins', {
  // Data
  state: () => ({
    admins: [],
    adminInfo: {},
    isLoadingAdmins: false,
    isLoadingAdmin: false,
  }),
  // Methods
  actions: {
    async getAdmins() {
      try {
        this.isLoadingAdmins = true;
        this.admins = await findAdmins();
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoadingAdmins = false;
      }
    },
    async getAdminById(id) {
      try {
        this.isLoadingAdmin = true;
        this.adminInfo = await findAdminById(id);
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoadingAdmin = false;
      }
    },
    async updateAdmin(id, data) {
      let response;
      try {
        this.isLoadingAdmin = true;
        response = await updateAdmin(id, data);
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoadingAdmin = false;
      }
      return response;
    },
    async createAdmin(data) {
      let response;
      try {
        this.isLoadingAdmin = true;
        response = await createAdmin(data);
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoadingAdmin = false;
      }
      return response;
    },
    async deleteAdmin(id) {
      let response;
      try {
        this.isLoadingAdmin = true;
        response = await deleteAdmin(id);
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoadingAdmin = false;
      }
      return response;
    },
  },
});

export default useAdminsStore;
