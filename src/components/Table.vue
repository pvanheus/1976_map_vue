<template>
  <div>
    <ag-grid-vue
      style="height: 500px;"
      class="ag-theme-balham"
      :columnDefs="columnDefs"
      @grid-ready="onGridReady"
      :rowData="rowData"
      rowSelection="single"
      pagination
      animateRows
    ></ag-grid-vue>
    <button @click="getSelectedRows()">Get Selected Rows</button>
  </div>
</template>

<script>
import axios from "axios";
import { AgGridVue } from "ag-grid-vue";

export default {
  name: "Table",
  data() {
    return {
			columnDefs: [
				{headerName: 'Name', field: 'person', sortable: true, filter: true },
				{headerName: 'Date of Death', field: 'date_of_death', sortable: true, filter: true },
				{headerName: 'Place', field: 'place', sortable: true, filter: true },
				{headerName: 'COD', field: 'detail', sortable: true, filter: true }
			],
			rowData: null,
    }
  },
  components: {
		AgGridVue
  },
  mounted() {
    let data_url =
      "https://raw.githubusercontent.com/pvanheus/1976/master/1976_cape_deaths.json";
    axios.get(data_url).then(response => {
			this.rowData = response.data;
    });
  },
  methods: {
		onGridReady(params) {
			this.gridApi = params.api;
			this.columnApi = params.columnApi;
		},
		getSelectedRows() {
				const selectedRow = this.gridApi.getSelectedNodes().map( node => node.data );
				// const person = selectedData.map( node => node.person + ' ' + node.date_of_death).join(', ');
				return console.log("selectedRow", selectedRow);
		},
  }
}
</script>