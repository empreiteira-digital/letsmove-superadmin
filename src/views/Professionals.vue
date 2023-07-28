<template>
  <div>
    <h2>Profissionais</h2>
    <ProgressBar
      v-if="ProfessionalsStore.isLoading"
      mode="indeterminate"
      style="height: 6px"
    />

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
      :rows-per-page-options="[10, 20, 30, 40, 50]"
      :loading="ProfessionalsStore.isLoading"
    >
      <Column
        field="name"
        header="Nome"
        style="width: 70%"
        sortable
      />
      <Column
        field="professionalPlan.planName"
        header="Plano"
        style="width: 18%"
        sortable
      />
      <Column
        field="professionalPlan.active"
        header="Status"
        style="width: 5%; text-align: center;"
        sortable
      >
        <template #body="slotProps">
          <i
            v-if="slotProps.data.professionalPlan.active"
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
        field="rating"
        header="Avaliações"
        style="width: 5%; text-align: center;"
        sortable
      >
        <template #body="slotProps">
          <Rating
            :model-value="slotProps.data.rating"
            readonly
            :cancel="false"
          />
        </template>
      </Column>
      <Column
        header="Cadastrado em"
        style="width: 10%; text-align: center;"
        sortable
      >
        <template #body="slotProps">
          {{ formatDate(slotProps.data.createdAt) }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import { mapStores } from 'pinia';
import useProfessionalsStore from '@/stores/ProfessionalsStore';

export default {
  name: 'ProfessionalsView',
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
  },
  computed: {
    ...mapStores(useProfessionalsStore),
  },
};

</script>
  <style lang="scss">

  </style>
