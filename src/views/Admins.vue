<template>
  <div>
    <div v-if="AdminsStore.isLoadingAdmins">
      <h2>
        Administradores
      </h2>
      <ProgressBar
        mode="indeterminate"
        style="height: 6px"
      />
    </div>

    <DataTable
      v-else
      ref="admins"
      striped-rows
      show-gridlines
      class="p-datatable-sm"
      removable-sort
      sort-mode="multiple"
      :value="AdminsStore.admins"
      table-style="min-width: 50rem"
      paginator
      :rows="200"
      :loading="AdminsStore.isLoading"
      v-model:expandedRows="expandedRows"
      paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rows-per-page-options="[200, 300, 400, 400, 600]"
      current-page-report-template="Mostrando {first} de {last} do total de {totalRecords} profissionais"
    >
      <template #header>
        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
          <span class="text-xl text-900 font-bold">Administradores</span>
          <span class="p-input-icon-left">
            <Button
              @click="showAddAdminModal"
              icon="pi pi-user-plus"
              label="Adicionar administrador"
              class="mr-2"
              rounded
              raised
            />
            <Button
              @click="AdminsStore.getAdmins"
              icon="pi pi-refresh"
              label="Atualizar lista"
              rounded
              raised
            />
          </span>
        </div>
      </template>
      <Column
        expander
        style="width: 3%"
      />
      <Column
        field="name"
        header="Nome"
        style="width: 15%"
        sortable
      />
      <Column
        field="nickname"
        header="Nickname"
        style="width: 15%"
        sortable
      />
      <Column
        field="email"
        header="E-mail"
        style="width: 15%"
        sortable
      />
      <Column
        field="createdAt"
        header="Cadastrado em"
        style="width: 5%; text-align: center;"
        sortable
      >
        <template #body="slotProps">
          {{ formatDate(slotProps.data.createdAt) }}
        </template>
      </Column>
      <Column
        header="Ações"
        style="width: 10%; text-align: center;"
      >
        <template #body="slotProps">
          <Button
            @click="showEditAdminModal(slotProps.data)"
            icon="pi pi-user-edit"
            outlined
            rounded
            class="mr-2"
          />
          <Button
            @click="showDeleteAdminModal(slotProps.data)"
            icon="pi pi-trash"
            outlined
            rounded
            class="mr-2"
          />
        </template>
      </Column>
      <template #expansion="slotProps">
        <div>
          <p><b>Nome:</b> {{ slotProps.data.name }}</p>
          <p><b>Nickname:</b> {{ slotProps.data.nickname }}</p>
          <p><b>E-mail:</b> {{ slotProps.data.email }}</p>
          <p><b>Cadastrado em:</b> {{ formatDate(slotProps.data.createdAt) }}</p>
          <p><b>Atualizado em:</b> {{ formatDate(slotProps.data.updatedAt) }}</p>
        </div>
      </template>
    </DataTable>

    <Dialog
      v-model:visible="showAdminModal"
      modal
      maximizable
      :style="{ width: '50vw' }"
    >
      <template #header>
        <span>
          <span v-if="AdminsStore.adminInfo.id">Editar Informações - ID {{ AdminsStore.adminInfo.id }}</span>
          <span v-else>Adicionar Administrador</span>
        </span>
      </template>
      <ProgressSpinner
        v-if="AdminsStore.isLoadingAdmin"
        class="flex md:align-items-center"
      />
      <div v-else>
        <form @submit.prevent="saveAdmin">
          <div class="formgrid grid gap-4">
            <div>
              <InputText
                type="hidden"
                id="id"
                v-model="AdminsStore.adminInfo.id"
              />
              <span class="p-float-label">
                <InputText
                  class="input-text-size"
                  id="nome"
                  :required="newAdmin"
                  v-model="AdminsStore.adminInfo.name"
                />
                <label for="nome">Nome</label>
              </span>
            </div>
            <div>
              <span class="p-float-label">
                <InputText
                  class="input-text-size"
                  id="nickname"
                  :required="newAdmin"
                  v-model="AdminsStore.adminInfo.nickname"
                />
                <label for="nickname">Nickname</label>
              </span>
            </div>
            <div>
              <span class="p-float-label">
                <InputText
                  class="input-text-size"
                  id="email"
                  :required="newAdmin"
                  v-model="AdminsStore.adminInfo.email"
                />
                <label for="email">email</label>
              </span>
            </div>
            <div style="display: flex">
              <span class="p-float-label">
                <InputText
                  :type="showPassword ? 'text' : 'password'"
                  class="input-text-size"
                  id="password"
                  style="width: 207px; margin-right: 0.5rem"
                  :required="newAdmin"
                  v-model="password"
                />
                <label for="password">Senha</label>
              </span>
              <i
                v-if="!showPassword"
                @click="showPasswordText()"
                style="color: #bc71eb"
                class="pi pi-eye-slash vertically-align"
              />
              <i
                v-else
                @click="showPasswordText()"
                style="color: red"
                class="pi pi-eye vertically-align"
              />
            </div>
            <div style="display: flex">
              <span class="p-float-label">
                <InputText
                  :type="showConfirmPassword ? 'text' : 'password'"
                  class="input-text-size"
                  id="confirmPassword"
                  style="width: 207px; margin-right: 0.5rem"
                  :required="newAdmin"
                  v-model="confirmPassword"
                />
                <label for="confirmPassword">Confirme a senha</label>
              </span>
              <i
                v-if="!showConfirmPassword"
                @click="showConfirmPasswordText()"
                style="color: #bc71eb"
                class="pi pi-eye-slash vertically-align"
              />
              <i
                v-else
                @click="showConfirmPasswordText()"
                style="color: red"
                class="pi pi-eye vertically-align"
              />
            </div>
          </div>
          <div
            class="error-message"
            v-if="error"
          >
            {{ error }}
          </div>
          <div v-if="AdminsStore.isLoadingAdmin">
            <h2>
              Atualizando...
            </h2>
            <ProgressBar
              mode="indeterminate"
              style="height: 6px"
            />
          </div>
        </form>
      </div>
      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          @click="hideAdminModal"
          text
        />
        <Button
          label="Save"
          icon="pi pi-check"
          @click="saveAdmin"
          autofocus
        />
      </template>
    </Dialog>
    <Dialog
      v-model:visible="showAdminDeleteModal"
      modal
      maximizable
      :style="{ width: '50vw' }"
    >
      <template #header>
        <span>
          <span v-if="AdminsStore.adminInfo.id">Deletar Administrador - ID {{ AdminsStore.adminInfo.id }}</span>
        </span>
      </template>
      <ProgressSpinner
        v-if="AdminsStore.isLoadingAdmin"
        class="flex md:align-items-center"
      />
      <div v-else>
        <div class="p-fluid text-center">
          <h3>Deseja realmente deletar o administrador {{ AdminsStore.adminInfo.name }}?</h3>
          <p class="error-message">
            Esta operação não pode ser desfeita.
          </p>
        </div>
      </div>
      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          @click="hideAdminDeleteModal"
          text
        />
        <Button
          label="Delete"
          icon="pi pi-check"
          @click="deleteAdmin(AdminsStore.adminInfo.id)"
          autofocus
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import { mapStores } from 'pinia';
import useAdminsStore from '@/stores/AdminsStore';
import useGlobalStore from '@/stores/GlobalStore';

export default {
  name: 'AdminsView',
  data() {
    return {
      expandedRows: [],
      showAdminModal: false,
      showAdminDeleteModal: false,
      newAdmin: false,
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,
      error: null,
    };
  },
  async created() {
    await this.AdminsStore.getAdmins();
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
    showEditAdminModal(data) {
      const adminId = data.id;
      this.showAdminModal = true;
      this.AdminsStore.getAdminById(adminId);
    },
    showAddAdminModal() {
      this.newAdmin = true;
      this.showAdminModal = true;
    },
    showDeleteAdminModal(data) {
      this.AdminsStore.getAdminById(data.id);
      this.showAdminDeleteModal = !this.showAdminDeleteModal;
    },
    hideAdminModal() {
      this.showAdminModal = false;
    },
    hideAdminDeleteModal() {
      this.showAdminDeleteModal = false;
    },
    async saveAdmin() {
      if (this.newAdmin && !this.validateRequiredFields()) {
        return;
      }

      let params = {
        name: this.AdminsStore.adminInfo.name,
        nickname: this.AdminsStore.adminInfo.nickname,
        email: this.AdminsStore.adminInfo.email,
        role: ['ADMIN'],
      };

      if (this.password && this.validatePasswords()) {
        params = {
          ...params,
          password: this.password,
        };
      }

      try {
        let response;
        if (this.newAdmin) {
          response = await this.AdminsStore.createAdmin(params);
        } else {
          response = await this.AdminsStore.updateAdmin(this.AdminsStore.adminInfo.id, params);
        }

        if (response) {
          await this.AdminsStore.getAdmins();
          this.hideAdminModal();
          this.$toast.success(this.newAdmin ? 'Cadastrado com sucesso.' : 'Atualizado com sucesso.', {
            position: 'top-right',
          });
          this.newAdmin = false;
        } else {
          this.$toast.error('Erro ao atualizar, verifique os dados e tente novamente.', {
            position: 'top-right',
          });
        }
      } catch (error) {
        this.error = error;
      }
    },
    validatePasswords() {
      if (this.password.length < 8) {
        this.error = 'Senha deve ter no minimo 8 caracteres';
        return false;
      }
      if (this.password !== this.confirmPassword) {
        this.error = 'As senhas devem ser iguais';
        return false;
      }
      return true;
    },
    validateRequiredFields() {
      const requiredFields = ['name', 'nickname', 'email', 'password', 'confirmPassword'];

      const isFieldEmpty = (field) => !this.AdminsStore.adminInfo[field] && !this[field];
      if (requiredFields.some(isFieldEmpty)) {
        this.error = 'Preencha os campos obrigatórios.';
        return false;
      }

      return true;
    },
    async deleteAdmin(id) {
      const response = await this.AdminsStore.deleteAdmin(id);
      if (response) {
        await this.AdminsStore.getAdmins();
        this.hideAdminDeleteModal();
        this.$toast.success('Excluído com sucesso.', {
          position: 'top-right',
        });
      } else {
        this.$toast.error('Erro ao excluir, tente novamente.', {
          position: 'top-right',
        });
      }
    },
    showPasswordText() {
      this.showPassword = !this.showPassword;
    },
    showConfirmPasswordText() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
  },
  computed: {
    ...mapStores(useAdminsStore),
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

  .formgrid.grid {
    margin-top: 20px !important;
  }

  .error-message {
    color: red;
    margin-top: 10px;
  }
</style>
