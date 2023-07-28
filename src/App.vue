<template>
  <div>
    <Menubar
      class="mb-5"
      :model="navItems"
    >
      <template #start>
        <router-link to="/">
          <img
            alt="logo"
            src="./images/logo.png"
            height="24"
            class="mr-2"
          >
        </router-link>
      </template>
    </Menubar>
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'SuperAdmin',
  data() {
    return {
      navItems: [
        {
          label: 'Usuários',
          icon: 'pi pi-fw pi-user',
          to: '/professionals',
        },
      ],
    };
  },
};

</script>
<style lang="scss">

</style>
