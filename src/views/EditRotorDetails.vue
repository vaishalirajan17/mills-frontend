<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from 'vue-router';
import emitter from 'tiny-emitter/instance';

// Define reactive variables
var comps = ref([]);
var mills = ref([]);
var selectedMillId = "";
var resetTime = [];
var isStartError = ref(false);
var startError = ref("");
var isStartSuccess = ref(false);
var startSuccess = ref("");
const router = useRouter();
var remarks = "";

// Initialize display and dropdown
resetEditDisplay();
millsDrpDown();

if(localStorage.getItem('login') == null || localStorage.getItem('login') == '') {
        router.push('login');
}

// Function to fetch reset component data
function resetEditDisplay() {

  isStartError.value = false;
  startError.value = "";
  isStartSuccess.value = false;
  startSuccess.value = "";
  
  axios
    .get('http://localhost:8080/resetcomponent', {
      params: {
        millid: selectedMillId,
      }
    })
    .then(response => {
      comps.value = response.data;
      console.log(comps.value);
    })
}

emitter.on('millsDrpDown', function () {
  millsDrpDown();
});

// Function to populate mills dropdown
function millsDrpDown() {

  axios
    .get('http://localhost:8080/mills')
    .then(response => {
      const data = response.data;
      console.log(data);
      mills.value = data.mills;
      console.log(mills.value);
    })
  
}
 
</script>

<template>
  <div class="mt-15">
    <div class= "flex flex-row">
      <div class= "flex flex-col w-1/4">
        <div>
          <label class="font-medium whitespace-nowrap text-white text-sm rounded-md">Mill </label>
        </div>
        <div class="mt-2 ">
          <select class="bg-white-900 bg-gray-700 px-5 rounded-md py-1" name="mill" id="mill_id" v-model="selectedMillId"
          @change="resetDisplay">
          <option class="text-slate-500" value="">Select Mill</option>
          <option v-for="mill in mills" :value="mill">{{ mill }}</option>
        </select>
        </div>
      </div>
          
    </div>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 mt-10">
      <thead class="text-xs text-white uppercase bg-gray-700">
        <tr>
          <th scope="col" class="px-6 py-3">
            MILL
          </th>
          <th scope="col" class="px-6 py-3">
            ROTOR
          </th>
          <th scope="col" class="px-6 py-3">
            COMPONENT
          </th>
          <th scope="col" class="px-6 py-3">
            OVERALL DATE TIME
          </th>
          <th scope="col" class="px-6 py-3">
            RUNNING HOURS
          </th>
          <th scope="col" class="px-6 py-3">
            ACTION
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="comp,index in comps" class="bg-slate-900 border-b border-gray-700 text-white">
          <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap text-white">
            {{ comp.millId }}
          </th>
          <td class="px-6 py-4">
            {{ comp.rotorId }}
          </td>
          <td class="px-6 py-4">
            {{ comp.componentName }}
          </td>
          <td class="px-6 py-4">
            {{ comp.overAllDate }}
          </td>
          <td class="px-6 py-4">
            {{ comp.runningHours }}
          </td>
          <td class="px-6 py-4">
            <button class="bg-rose-700 py-2 rounded-md min-w-24 disabled:bg-gray-300"
              @click="">DELETE</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-if="isStartError" class="bg-red-100 border border-red-400 text-red-700 py-3 px-10 mt-4 rounded"
      role="alert">
      <strong class="font-bold">Error! </strong>
      <span class="block sm:inline">{{ startError }}</span>
    </div>

    <div v-if="isStartSuccess" class="bg-green-100 border border-green-400 text-green-700 w-25 mt-4 py-3 px-10 rounded"
      role="alert">
      <strong class="font-bold">Success! </strong>
      <span class="block sm:inline">{{ startSuccess }}</span>
    </div>

</template>

<style scoped>
input[type="datetime-local"]::-webkit-calendar-picker-indicator {
  /* background-color: white; */
  filter: invert(1);
}
</style>