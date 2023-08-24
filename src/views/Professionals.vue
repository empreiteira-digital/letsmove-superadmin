<!-- eslint-disable vue/no-v-model-argument -->
<template>
  <div>
    <div v-if="ProfessionalsStore.isLoadingProfessionals">
      <h2>
        Profissionais
      </h2>
      <ProgressBar
        mode="indeterminate"
        style="height: 6px"
      />
    </div>

    <DataTable
      v-else
      ref="professionals"
      striped-rows
      show-gridlines
      class="p-datatable-sm"
      removable-sort
      sort-mode="multiple"
      :value="ProfessionalsStore.professionals"
      table-style="min-width: 50rem"
      paginator
      :rows="10"
      :loading="ProfessionalsStore.isLoading"
      v-model:expandedRows="expandedRows"
      paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rows-per-page-options="[10, 20, 30, 40, 50]"
      current-page-report-template="Mostrando {first} de {last} do total de {totalRecords} profissionais"
    >
      <template #header>
        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
          <span class="text-xl text-900 font-bold">Profissionais</span>
          <Button
            @click="ProfessionalsStore.getProfessionals"
            icon="pi pi-refresh"
            rounded
            raised
          />
        </div>
      </template>
      <Column
        expander
        style="width: 5rem"
      />
      <Column
        field="professional.name"
        header="Nome"
        style="width: 52%"
        sortable
      />
      <Column
        field="professional.professionalPlan.planName"
        header="Plano"
        style="width: 18%"
        sortable
      />
      <Column
        field="professional.professionalPlan.active"
        header="Status"
        style="width: 5%; text-align: center;"
        sortable
      >
        <template #body="slotProps">
          <i
            v-if="slotProps.data.professional.professionalPlan.active"
            class="pi pi-check-circle"
            style="color: green"
          />
          <i
            v-else
            class="pi pi-times-circle"
            style="color: red"
          />
        </template>
      </Column>
      <Column
        field="professional.rating"
        header="Avaliações"
        style="width: 5%; text-align: center;"
        sortable
      >
        <template #body="slotProps">
          <Rating
            :model-value="slotProps.data.professional.rating"
            readonly
            :cancel="false"
          />
        </template>
      </Column>
      <Column
        header="Cadastrado em"
        style="width: 5%; text-align: center;"
        sortable
      >
        <template #body="slotProps">
          {{ formatDate(slotProps.data.professional.createdAt) }}
        </template>
      </Column>
      <Column
        header="Ações"
        style="width: 15%; text-align: center;"
      >
        <template #body="slotProps">
          <Button
            @click="showEditProfessionalModal(slotProps.data)"
            icon="pi pi-user-edit"
            outlined
            rounded
            class="mr-2"
          />
          <Button
            disabled="true"
            icon="pi pi-file-edit"
            outlined
            rounded
            class="mr-2"
          />
          <Button
            disabled="true"
            icon="pi pi-external-link"
            outlined
            rounded
            class="mr-2"
          />
        </template>
      </Column>
      <template #expansion="slotProps">
        <div>
          <p><b>Nome:</b> {{ slotProps.data.professional.name }}</p>
          <p><b>Plano:</b> {{ slotProps.data.professional.professionalPlan.planName }}</p>
          <p><b>CPF:</b> {{ GlobalStore.cpf(slotProps.data.cpf) }}</p>
          <p><b>CNPJ:</b> {{ GlobalStore.cnpj(slotProps.data.professional.cnpj) }}</p>
          <p><b>Número de Registro:</b> {{ slotProps.data.professional.registerNumber || 'N/A' }}</p>
          <p><b>E-mail:</b> {{ slotProps.data.email }}</p>
          <p><b>Telefone:</b> {{ GlobalStore.telefone(slotProps.data.professional.phone) }}</p>
        </div>
      </template>
    </DataTable>

    <Dialog
      v-model:visible="showProfessionalModal"
      @hide="resetIsLoading()"
      modal
      maximizable
      :style="{ width: '50vw' }"
    >
      <template #header>
        <span>Editar Informações <span v-if="ProfessionalsStore.userInfo.id">- ID {{ ProfessionalsStore.userInfo.id }}</span> </span>
      </template>
      <TabView>
        <TabPanel>
          <template #header>
            <i
              class="pi pi-user mr-2"
            />
            <span>Usuário</span>
          </template>
          <ProgressSpinner
            v-if="ProfessionalsStore.isLoadingUser"
            class="flex md:align-items-center"
          />
          <div v-else>
            <div class="container">
              <div class="child">
                <span class="p-float-label">
                  <InputText
                    id="nome"
                    v-model="ProfessionalsStore.userInfo.name"
                  />
                  <label for="nome">Nome</label>
                </span>
              </div>
              <div class="child">
                <span class="p-float-label">
                  <InputText
                    id="nickname"
                    v-model="ProfessionalsStore.userInfo.nickname"
                  />
                  <label for="nickname">Nickname</label>
                </span>
              </div>
              <div class="child">
                <span class="p-float-label">
                  <InputText
                    id="email"
                    v-model="ProfessionalsStore.userInfo.email"
                  />
                  <label for="email">email</label>
                </span>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <template #header>
            <i
              class="pi pi-users mr-2"
            />
            <span>Profissional</span>
          </template>
          <ProgressSpinner
            v-if="ProfessionalsStore.isLoadingProfessional"
            class="flex md:align-items-center"
          />
        </TabPanel>
      </TabView>
    </Dialog>
  </div>
</template>

<script>
import { mapStores } from 'pinia';
import useProfessionalsStore from '@/stores/ProfessionalsStore';
import useGlobalStore from '@/stores/GlobalStore';

export default {
  name: 'ProfessionalsView',
  data() {
    return {
      expandedRows: [],
      showProfessionalModal: false,
    };
  },
  async created() {
    await this.ProfessionalsStore.getProfessionals();
  },
  methods: {
    formatDate(dateString) {
      const dateObj = new Date(dateString);
      const day = dateObj.getUTCDate();
      const month = dateObj.getUTCMonth() + 1;
      const year = dateObj.getUTCFullYear();
      const formattedDay = day.toString().padStart(2, '0');
      const formattedMonth = month.toString().padStart(2, '0');
      return `${formattedDay}/${formattedMonth}/${year}`;
    },
    showEditProfessionalModal(data) {
      const userId = data.id;
      const professionalId = data.professional.id;
      this.showProfessionalModal = !this.showProfessionalModal;
      Promise.all([
        this.ProfessionalsStore.getProfessionalById(professionalId),
        this.ProfessionalsStore.getUserById(userId),
      ]).then(() => {
        this.ProfessionalsStore.isLoadingProfessional = false;
        this.ProfessionalsStore.isLoadingUser = false;
      });
    },
    resetIsLoading() {
      this.ProfessionalsStore.isLoadingProfessional = true;
      this.ProfessionalsStore.isLoadingUser = true;
    },
  },
  computed: {
    ...mapStores(useProfessionalsStore),
    ...mapStores(useGlobalStore),
  },
};

</script>
  <style lang="scss">
  </style>
