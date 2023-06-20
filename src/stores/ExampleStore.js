import { defineStore } from 'pinia';

const useExampleStore = defineStore('useExampleStore', {
  // Methods
  actions: {
    console() {
      console.log('123');
    },

  },
});

export default useExampleStore;
