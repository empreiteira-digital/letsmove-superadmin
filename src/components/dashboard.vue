<template>
  <div class="min-h-screen flex relative lg:static surface-ground">
    <div
      id="app-sidebar-1"
      class="surface-section h-screen hidden lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none"
      style="width: 280px"
    >
      <div class="flex flex-column h-full">
        <div
          class="flex align-items-center px-5 flex-shrink-0"
          style="height: 60px"
        >
          <img
            src="@/images/blocks/logos/hyper-700.svg"
            alt="Image"
            height="30"
          >
        </div>
        <div class="overflow-y-auto">
          <ul class="list-none p-3 m-0">
            <li>
              <ul class="list-none p-0 m-0 overflow-hidden">
                <li>
                  <a
                    v-ripple
                    class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                  >
                    <i class="pi pi-home mr-2" />
                    <span class="font-medium">Visão Geral</span>
                  </a>
                </li>
                <li>
                  <a
                    v-ripple
                    class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                  >
                    <i class="pi pi-bookmark mr-2" />
                    <span class="font-medium">Clientes</span>
                  </a>
                </li>
                <li>
                  <a
                    v-ripple
                    class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                  >
                    <i class="pi pi-users mr-2" />
                    <span class="font-medium">Chamados</span>
                  </a>
                </li>
                <li>
                  <a
                    v-ripple
                    class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                  >
                    <i class="pi pi-comments mr-2" />
                    <span class="font-medium">Dúvidas</span>
                  </a>
                </li>
                <li>
                  <a
                    v-ripple
                    class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                  >
                    <i class="pi pi-calendar mr-2" />
                    <span class="font-medium">Cupons</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="mt-auto">
          <hr class="mb-3 mx-3 border-top-1 border-none surface-border">
          <a
            v-ripple
            class="m-3 flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
          >
            <span class="font-medium">Sair</span>
          </a>
        </div>
      </div>
    </div>
    <div class="min-h-screen flex flex-column relative flex-auto">
      <div
        class="flex justify-content-end align-items-center px-5 surface-0 border-bottom-1 surface-border relative lg:static"
        style="height: 60px"
      >
        <a
          v-ripple
          class="cursor-pointer block lg:hidden text-700 p-ripple"
          v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'fadein', leaveToClass: 'hidden', leaveActiveClass: 'fadeout', hideOnOutsideClick: true }"
        >
          <i class="pi pi-ellipsis-v text-2xl" />
        </a>
        <ul class="list-none p-0 m-0 hidden lg:flex lg:align-items-center select-none lg:flex-row surface-section border-1 lg:border-none surface-border right-0 top-100 z-1 shadow-2 lg:shadow-none absolute lg:static">
          <li class="border-top-1 surface-border lg:border-top-none">
            <a
              v-ripple
              class="flex p-3 lg:px-3 lg:py-2 align-items-center hover:surface-100 font-medium border-round cursor-pointer transition-duration-150 transition-colors p-ripple gap-2"
            >
              <img
                src="@/images/blocks/avatars/circle/avatar-f-1.png"
                class="mr-3 lg:mr-0"
                style="width: 32px; height: 32px"
              >
              <div class="block lg">
                <div class="text-900 font-medium">Nome do Usuário</div>
                <span class="text-600 font-medium text-sm">Cargo</span>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div class="p-5 flex flex-column flex-auto">
        <div class="border-2 border-dashed surface-border border-round surface-section flex-auto">
          <router-view />
        </div>
      </div>
    </div>
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
