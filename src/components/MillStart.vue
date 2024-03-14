<script setup>
import axios from "axios";
import { ref } from "vue";
import emitter from 'tiny-emitter/instance';

// Define reactive variables
var selectedDateTime = "";
var startError = ref("");
var isStartError = ref(false);
var isStartSuccess = ref(false);
var startSuccess = ref("");
var buttonText = ref("START");
var limit = 3;
var count = 0;
var previousBtn = ref(false);
var nextBtn = ref(false);
var millRotor = ref([]);
var temp = [];

// Fetch initial data
getMapping();

// Function to fetch mapping data
function getMapping() {
  axios
    .get('http://localhost:8080/mapData')
    .then(response => {
      temp = response.data;
      console.log(temp);
      pageData(temp);
    })
}

// Function to handle mill start
function start(mill, rotor) {
  if (selectedDateTime === null || selectedDateTime === '') {
    isStartError.value = true;
    startError.value = "Please select a date and time to start.";
    return;
  }

  isStartError.value = false;
  startError.value = "";
  isStartSuccess.value = false;
  startSuccess.value = "";

  var request = {
    millId: mill,
    rotorId: rotor,
    component: '00',
    startTime: selectedDateTime,
    action: 'STRT'
  };

  console.log(request);

  axios.post('http://localhost:8080/millOpt', request)
    .then(function (response) {
      console.log(response);
      isStartSuccess.value = true;
      startSuccess.value = "Mill Started";
      buttonText.value = "START";
      getMapping();
      emitter.emit('refreshRunningMill');
    })
    .catch(function (error) {
      startError.value = "Error in starting mill. Please try again later";
      isStartError.value = true;
      buttonText.value = "START";
      startSuccess.value = "Mill Stopped";
    });
}

// Function to paginate and display data
function pageData(temp) {
  millRotor.value = [];
  for (var e = count; e < count + limit; e++) {
    if (e >= temp.length) {
      break;
    }
    millRotor.value.push(temp[e]);
  }
  if (e >= temp.length) {
    nextBtn.value = true;
  } else {
    nextBtn.value = false;
  }
  console.log(count);
  if (count <= 0) {
    previousBtn.value = true;
  } else {
    previousBtn.value = false;
  }
}

// Function to navigate to previous page
function previous() {
  count = count - limit;
  console.log(count);
  pageData(temp);
}

// Function to navigate to next page
function next() {
  count = count + limit;
  pageData(temp);
}

</script>

<template>
  <div class="overflow-x-auto mt-10">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
      <thead class="text-xs text-white uppercase bg-gray-700">
        <tr>
          <th scope="col" class="px-20 py-3">
            MILL
          </th>
          <th scope="col" class="px-20 py-3">
            ROTOR
          </th>
          <th scope="col" class="px-20 py-3">
            START TIME
          </th>
          <th scope="col" class="px-20 py-3">
            ACTION
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="run in millRotor" class="bg-slate-900 border-b border-gray-700 text-white text-center">
          <th scope="row" class="px-7 py-4 font-medium whitespace-nowrap text-white">
            {{ run.millId }}
          </th>
          <td class="px-7 py-4">
            {{ run.rotorId }}
          </td>
          <td class="px-7 py-4">
            <input class="bg-slate-900 light:[color-scheme:light]" type="datetime-local" id="selectedDateTime"
              v-model="selectedDateTime">
          </td>
          <td class="px-7 py-4">
            <button class="bg-red-700 py-2 rounded-md min-w-24" @click="start(run.millId, run.rotorId)">START</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="py-10 flex flex-row justify-center">
    <button :disabled="previousBtn"
      class="bg-rose-700 py-2 shadow-xl rounded-md min-w-24 mx-5 disabled:bg-gray-300 disabled:text-slate-700 disabled:shadow-none"
      @click="previous">Previous</button>
    <button :disabled="nextBtn"
      class="bg-rose-700 py-2 shadow-xl rounded-md min-w-24 mx-5 disabled:bg-gray-300 disabled:text-slate-700 disabled:shadow-none"
      @click="next">Next</button>
  </div>

  <div v-if="isStartError" class="bg-red-100 border border-red-400 text-red-700 py-3 px-10 rounded relative" role="alert">
    <strong class="font-bold">Error! </strong>
    <span class="block sm:inline">{{ startError }}</span>
  </div>

  <div v-if="isStartSuccess" class="bg-green-100 border border-green-400 text-green-700  py-3 px-10 rounded relative"
    role="alert">
    <strong class="font-bold">Success! </strong>
    <span class="block sm:inline">{{ startSucess }}</span>
  </div>
</template>

<style scoped>
input[type="datetime-local"]::-webkit-calendar-picker-indicator {
  /* background-color: white; */
  filter: invert(1);
}
</style>
