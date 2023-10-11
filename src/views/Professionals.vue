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
      :rows="200"
      :loading="ProfessionalsStore.isLoading"
      v-model:expandedRows="expandedRows"
      paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rows-per-page-options="[200, 300, 400, 400, 600]"
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
        header="Tipo"
        style="width: 5%; text-align: center;"
        sortable
      >
        <template #body="slotProps">
          <i
            v-if="slotProps.data.professional.cnpj"
            class="pi pi-briefcase"
            style="color: gray"
            v-tooltip.top="'Pessoa Jurídica'"
          />
          <i
            v-else
            class="pi pi-user"
            style="color: gray"
            v-tooltip.top="'Pessoa Física'"
          />
        </template>
      </Column>
      <Column
        header="Nome"
        style="width: 42%"
        sortable
      >
        <template #body="slotProps">
          <span>{{ getProfessionalName(slotProps.data.professional.name || slotProps.data.professional.businessName) }}</span>
        </template>
      </Column>
      <Column
        field="professional.professionalPlan.planName"
        header="Plano"
        style="width: 15%"
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
          <p><b>Nome:</b> {{ getProfessionalName(slotProps.data.professional.name || slotProps.data.professional.businessName) }}</p>
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
            <span>Geral</span>
          </template>
          <ProgressSpinner
            v-if="ProfessionalsStore.isLoadingUser"
            class="flex md:align-items-center"
          />
          <div v-else>
            <div class="formgrid grid gap-4">
              <div>
                <span class="p-float-label">
                  <InputText
                    class="input-text-size"
                    id="nome"
                    v-model="ProfessionalsStore.userInfo.name"
                  />
                  <label for="nome">Nome</label>
                </span>
              </div>
              <div>
                <span class="p-float-label">
                  <InputText
                    class="input-text-size"
                    id="nickname"
                    v-model="ProfessionalsStore.userInfo.nickname"
                  />
                  <label for="nickname">Nickname</label>
                </span>
              </div>
              <div>
                <span class="p-float-label">
                  <InputText
                    class="input-text-size"
                    id="email"
                    v-model="ProfessionalsStore.userInfo.email"
                  />
                  <label for="email">email</label>
                </span>
              </div>
              <div>
                <span class="p-float-label">
                  <InputMask
                    class="input-text-size"
                    id="birthdate"
                    v-model="ProfessionalsStore.userInfo.birthdate"
                    mask="99/99/9999"
                  />
                  <label for="birthdate">Data de Nascimento</label>
                </span>
              </div>
              <div>
                <span class="p-float-label">
                  <InputMask
                    class="input-text-size"
                    id="phone"
                    v-model="ProfessionalsStore.userInfo.phone"
                    mask="(99) 99999-9999"
                  />
                  <label for="phone">Telefone</label>
                </span>
              </div>
              <div style="display: flex">
                <span class="p-float-label">
                  <InputMask
                    :disabled="!ProfessionalsStore.isCPFEditable"
                    style="width: 207px; margin-right: 0.5rem"
                    id="cpf"
                    mask="999.999.999-99"
                    v-model="ProfessionalsStore.userInfo.cpf"
                  />
                  <label for="cpf">CPF</label>
                </span>
                <i
                  v-if="!ProfessionalsStore.isCPFEditable"
                  @click="changeCPFEditable()"
                  style="color: #bc71eb"
                  class="pi pi-pencil vertically-align"
                />
                <i
                  v-if="ProfessionalsStore.isCPFEditable"
                  @click="changeCPFEditable()"
                  style="color: red"
                  class="pi pi-lock vertically-align"
                />
              </div>
              <div>
                <span class="p-float-label">
                  <Dropdown
                    class="input-text-size"
                    id="genre"
                    v-model="ProfessionalsStore.userInfo.genre"
                    option-label="label"
                    option-value="value"
                    :options="genreOptions"
                  />
                  <label for="genre">Gênero</label>
                </span>
              </div>
              <div>
                <span class="p-float-label">
                  <InputText
                    class="input-text-size"
                    id="nationalIdCard"
                    v-model="ProfessionalsStore.userInfo.nationalIdCard"
                  />
                  <label for="nationalIdCard">Identidate</label>
                </span>
              </div>
              <div class="formgrid grid gap-5 ml-1">
                <div>
                  <div class="mb-3">
                    Terms
                  </div>
                  <InputSwitch
                    id="accepted_terms"
                    v-model="ProfessionalsStore.userInfo.accepted_terms"
                  />
                </div>
                <div>
                  <div class="mb-3">
                    Newsletter
                  </div>
                  <InputSwitch
                    id="subscribe_newsletter"
                    v-model="ProfessionalsStore.userInfo.subscribe_newsletter"
                  />
                </div>
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
      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          @click="console.log('cancel')"
          text
        />
        <Button
          label="Save"
          icon="pi pi-check"
          @click="console.log('save')"
          autofocus
        />
      </template>
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
      genreOptions: [
        { label: 'Masculino', value: 'male' },
        { label: 'Feminino', value: 'female' },
        { label: 'Outro', value: 'other' },
      ],
    };
  },
  async created() {
    await this.ProfessionalsStore.getProfessionals();
  },
  methods: {
    getProfessionalName(name) {
      return name.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
      );
    },
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
    changeCPFEditable() {
      this.ProfessionalsStore.isCPFEditable = !this.ProfessionalsStore.isCPFEditable;
    },
  },
  computed: {
    ...mapStores(useProfessionalsStore),
    ...mapStores(useGlobalStore),
  },
};

</script>
  <style lang="scss">

  .input-text-size {
    width: 230px;
  }

  .vertically-align {
    display: flex;
    align-items: center;
  }

  </style>
