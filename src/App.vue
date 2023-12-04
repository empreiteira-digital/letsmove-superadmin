<template>
  <div>
    <template v-if="authenticated">
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
    </template>
    <router-view :authenticated="authenticated" />
  </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import useAuthStore from '@/stores/AuthStore';

export default {
  name: 'SuperAdmin',
  setup() {
    const authenticated = ref(false);
    const authStore = useAuthStore();

    onMounted(async () => {
      await authStore.checkAuthentication();
      authenticated.value = authStore.isAuthenticated;
    });

    const navItems = [
      {
        label: 'Profissionais',
        icon: 'pi pi-fw pi-user',
        to: '/profissionais',
      },
      {
        label: 'Administradores',
        icon: 'pi pi-fw pi-users',
        to: '/administradores',
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-sign-out',
        to: '/logout',
      },
    ];

    watch(() => {
      authenticated.value = authStore.isAuthenticated;
    });

    return {
      authenticated,
      navItems,
    };
  },
};

</script>
