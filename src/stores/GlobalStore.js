import { defineStore } from 'pinia';

const useGlobalStore = defineStore('Global', {
  // Methods
  actions: {
    cpf(value) {
      if (!value) return 'N/A';
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
    },
    cnpj(value) {
      if (!value) return 'N/A';
      return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3/$4-$5');
    },
    telefone(value) {
      if (!value) return 'N/A';
      return value.replace(/(\d{2})(\d{4})(\d{4})/g, '($1) $2-$3');
    },
  },
});

export default useGlobalStore;
