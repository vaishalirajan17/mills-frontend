<script setup>
import axios from "axios";
import { ref } from "vue";

// Define reactive variables
var comps = ref([]);
var mills = ref([]);
var selectedMillId = "";
var resetTime = ref("");
var isStartError = ref(false);
var startError = ref("");
var isStartSuccess = ref(false);
var startSuccess = ref("");

// Initialize display and dropdown
resetDisplay();
millsDrpDown();

// Function to fetch reset component data
function resetDisplay() {
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

// Function to populate mills dropdown
function millsDrpDown() {
  var data = [
    { "millId": "1A" },
    { "millId": "2A" },
    { "millId": "3A" }
  ];

  mills.value = data;
  console.log(mills.value);
}

// Function to reset
function reset(mill, rotor, comp, overAllDate) {
  if (resetTime.value == null || resetTime.value === '') {
    isStartError.value = true;
    startError.value = "Please select reset time to reset.";
  } else if (resetTime.value <= overAllDate) {
    isStartError.value = true;
    startError.value = "Reset Date Time cannot be greater than overall date Time.";
  }

  if (isStartError.value) {
    return;
  }

  isStartError.value = false;
  startError.value = "";
  isStartSuccess.value = false;
  startSuccess.value = "";

  var request = {
    millId: mill,
    rotorId: rotor,
    component: comp,
    action: 'RSET',
    startTime: resetTime.value
  };

  console.log(request);

  axios.post('http://localhost:8080/millOpt', request)
    .then(function (response) {
      console.log(response);
      isStartSuccess.value = true;
      startSuccess.value = "Reset successful";
      resetDisplay();
    })
    .catch(function (error) {
      startError.value = "Error in resetting rotor. Please try again later";
      isStartError.value = true;
    });
}  
</script>

<template>
  <div class="mt-15">
    <div>
      <label class="font-medium whitespace-nowrap text-white px-5 rounded-md">MILL : </label>
      <select class="bg-white-900 bg-gray-700 my-10 px-5 rounded-md" name="mill" id="mill_id" v-model="selectedMillId"
        @change="search">
        <option class="text-slate-500" value="">Select Mill</option>
        <option v-for="mill in mills" :value="mill.millId">{{ mill.millId }}</option>
      </select>
    </div>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
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
            RESET TIME
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
        <tr v-for="comp in comps" class="bg-slate-900 border-b border-gray-700 text-white">
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
            <input class="bg-slate-900 light:[color-scheme:light]" type="datetime-local" id="resetTime"
              v-model="resetTime">
          </td>
          <td class="px-6 py-4">
            {{ comp.runningHours }}
          </td>
          <td class="px-6 py-4">
            <button class="bg-rose-700 py-2 rounded-md min-w-24 disabled:bg-gray-300"
              @click="reset(comp.millId, comp.rotorId, comp.componentName, comp.overAllDate)">RESET</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="isStartError" class="bg-red-100 border border-red-400 text-red-700 py-3 px-10 rounded relative"
      role="alert">
      <strong class="font-bold">Error! </strong>
      <span class="block sm:inline">{{ startError }}</span>
    </div>

    <div v-if="isStartSuccess" class="bg-green-100 border border-green-400 text-green-700  py-3 px-10 rounded relative"
      role="alert">
      <strong class="font-bold">Success! </strong>
      <span class="block sm:inline">{{ startSucess }}</span>
    </div>

  </div>
</template>

<style scoped>
input[type="datetime-local"]::-webkit-calendar-picker-indicator {
  /* background-color: white; */
  filter: invert(1);
}
</style>