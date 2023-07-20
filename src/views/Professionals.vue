<template>
  <div>
    <DataTable
      ref="professionals"
      striped-rows
      show-gridlines
      class="p-datatable-sm"
      removable-sort
      sort-mode="multiple"
      :value="ProfessionalsStore.professionals"
    >
      <template #header>
        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
          <span class="text-xl text-900 font-bold">Professionals</span>
        </div>
      </template>
      <Column
        field="name"
        header="Name"
      />
      <Column
        field="professionalPlan.planName"
        header="Plano"
      />
      <Column
        field="professionalPlan.active"
        header="Status"
      />
      <Column
        field="rating"
        header="Reviews"
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
