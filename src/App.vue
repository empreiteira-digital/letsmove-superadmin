<template>
  <div>
    <Dashboard />
  </div>
</template>

<script>
import { mapStores } from 'pinia';
import useExampleStore from '@/stores/ExampleStore';
import Dashboard from '@/components/dashboard.vue';

export default {
  name: 'ExampleApp',
  components: {
    Dashboard,
  },
  data() {
    return {
      exampleData: '123',
    };
  },
  computed: {
    ...mapStores(useExampleStore),
  },
};

</script>
<style lang="scss">

</style>
