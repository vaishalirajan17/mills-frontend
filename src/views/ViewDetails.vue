<script setup>
import {ref} from "vue";
import axios from "axios";
import moment from 'moment';

  var history = ref([]);
  var temp = [];

  view();
  function view() {
    axios
      .get('http://localhost:8080/viewdetails') 
      .then(response => {
        temp = response.data; 
        console.log(temp);  
      }).then( () => {
        for(var hist of temp) {
        if(hist.fdpDate == null || hist.fdpDate == '') {
          hist.fdpDate = "--";  
        }  else {
          hist.fdpDate = moment(String(hist.fdpDate)).format('MM/DD/YYYY hh:mm');
          console.log("date - ",hist.fdpDate)
        }
        if(hist.vanePadDate == null || hist.vanePadDate == '') {
          console.log("inside if");
          hist.vanePadDate = "--";  
        } else {
          hist.vanePadDate = moment(String(hist.vanePadDate)).format('MM/DD/YYYY hh:mm');
          console.log("date - ",hist.vanePadeDate)
        }
        if(hist.status == null || hist.status == '') {
          hist.status = "--";  
        }
        if(hist.remarks == null || hist.remarks == 'AA') {
          hist.remarks = "--";  
        } 
        history.value.push(hist);
      }

      })
  }

</script>

<template>
  <div class="overflow-x-auto mt-10">
  
  <table class="w-full text-sm text-left rtl:text-right text-gray-500 text-gray-400">
      <thead class="text-xs text-white uppercase bg-gray-700 text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
                MILL
            </th>
            <th scope="col" class="px-6 py-3">
                ROTOR
            </th>
            <th scope="col" class="px-6 py-3">
                FDP RUNNING HOURS
            </th>
            <th scope="col" class="px-6 py-3">
                VANE PAD RUNNING HOURS
            </th>
            <th scope="col" class="px-6 py-3">
              FDP OVERALL DATE
            </th>
            <th scope="col" class="px-6 py-3">
              VANE PAD OVERALL DATE
            </th>
            <th scope="col" class="px-6 py-3">
              STATUS
            </th>
            <th scope="col" class="px-6 py-3">
              REMARKS
            </th>
          </tr>  
      </thead>
      <tbody>
          <tr v-for = "his in history" class="bg-slate-900 border-b bg-gray-800 border-gray-700 text-white text-center">
              <th scope="row" class="px-7 py-4 font-medium whitespace-nowrap text-white">
                {{his.millId}}
              </th>
              <td class="px-7 py-4">
                {{his.rotorId}}
              </td>
              <td class="px-7 py-4">
                {{his.fdpHours}}
              </td>
              <td class="px-7 py-4">
                {{his.vanePadHours}}
              </td>
              <td class="px-7 py-4">
                {{his.fdpDate}}
              </td>
              <td class="px-7 py-4">
                {{his.vanePadDate}}
              </td>
              <td class="px-7 py-4">
                {{his.status}}
              </td>
              <td class="px-7 py-4">
                {{his.remarks}}
              </td>
          </tr>
      </tbody>

  </table>

</div>


</template>

<style scoped>
</style>