<template>
  <div>
    <h1>BoilerPlate em Vue3 com PrimeVue {{ exampleData }}</h1>
  </div>
</template>

<script>
import { mapStores } from 'pinia';
import useExampleStore from '@/stores/ExampleStore';

export default {
  name: 'ExampleApp',
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
