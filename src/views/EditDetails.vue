<script setup>

import { useRouter } from 'vue-router'
import { ref } from "vue";
import emitter from 'tiny-emitter/instance';
import axios from "axios";
import moment from 'moment';

var millRotor = ref([]);
var startError = ref("");
var isStartError = ref(false);
var isStartSuccess = ref(false);
var startSuccess = ref("");
var previousBtn = ref(false);
var nextBtn = ref(false);
var selectedDateTime =[];

function getFormattedDate(date) {
    return moment(date).format("DD-MM-YYYY hh:mm:ss")
}

editDisplay();
function editDisplay() {
    axios
    .get('http://localhost:8080/editmill') 
    .then(response => {
      console.log(response);
      millRotor.value = response.data;
    })
}

function deleteDetail(millId,rotorId,editDate,actionPerformed) {
    var loginId_localEdit = localStorage.getItem('login');
    var request = {
        millId: millId,
        rotorId: rotorId,
        componentName: "00",
        editDate:editDate,
        actionPerformed: actionPerformed,
        loginId: loginId_localEdit
    }

    console.log(request);

    axios.post('http://localhost:8080/edit', request)
    .then(function (response) {
      console.log(response);

      //validations for start date
      if(response.data.errorCode != null && response.data.errorCode != '') {
        startError.value = response.data.errorMsg;
        isStartError.value = true;
        return;
      }

      isStartSuccess.value = true;
      startSuccess.value = "Deletion Sucessful";
      editDisplay();
    })
    .catch(function (error) {
      startError.value = "Error in deleting record. Please try again later";
      isStartError.value = true;
    });
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
              DATE TIME CHANGED
            </th>
            <th scope="col" class="px-20 py-3">
              ACTION PERFORMED
            </th>
            <th scope="col" class="px-20 py-3">
              DELETE
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="({millId,rotorId,editDate,actionPerformed,transactionid },index) in millRotor" class="bg-slate-900 border-b border-gray-700 text-white text-center">
            <th scope="row" class="px-7 py-4 font-medium whitespace-nowrap text-white">
              {{ millId }}
            </th>
            <td class="px-7 py-4">
              {{ rotorId }}
            </td>
            <td class="px-7 py-4">
                {{  getFormattedDate(editDate) }}
            </td>
            <td class="px-7 py-4">
              {{ actionPerformed }}
            </td>
            <td class="px-7 py-4">
              <button class="bg-red-700 py-2 rounded-md min-w-24" @click="deleteDetail(millId,rotorId,editDate,actionPerformed)">DELETE</button>
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
      <span class="block sm:inline">{{ startSuccess }}</span>
    </div>
  </template>