<script setup>

import axios from "axios";
import { ref } from "vue";
import emitter from 'tiny-emitter/instance';

    var mills = ref([]);
    var selectedMillId = "";
    var remarks = "";
    var isStartError = ref(false);
    var startError = ref("");
    var isStartSuccess = ref(false);
    var startSuccess = ref("");

    millsDrpDown();
    
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

    function addOptRemarks() {

        isStartError.value = false;
        startError.value = "";
        isStartSuccess.value = false;
        startSuccess.value = "";

        var local_logind = localStorage.getItem('login');

        var request = {
            remarks: remarks,
            millId: selectedMillId,
            remarkLoginId: local_logind,
            remarkType: "Operational"
        }
        console.log(request);

        axios.post('http://localhost:8080/remarks', request)
        .then(function (response) {
            console.log(response);
            isStartSuccess.value = true;
            startSuccess.value = "Remarks added.";
        })
        .catch(function (error) {
            startError.value = "Error in adding remarks. Please try again later";
            isStartError.value = true;
        });
    }

</script>

<template>
   
   <div class= "flex flex-row mt-10">
      <div class= "flex flex-col mx-8 w-1/4">
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
      
      <div class = "mx-12 flex flex-col w-2/4">
            <div class="">
                <label for="remarksLbl" class="block text-sm font-medium leading-6 text-white" >Operational Remarks</label>
            </div>
            <div class="mt-2 w-1/4">
                <textarea class="bg-slate-900 rounded-md border-2 light:[color-scheme:light] px-28"></textarea>
                <!-- <input id="remarks" name="remarks" type="text" class="bg-slate-900 rounded-md border-2 light:[color-scheme:light]" v-model="remarks"/> -->
            </div>
      </div>
    <div class="mt-9">
        <button class="bg-sky-700 py-2 px-6 shadow-xl rounded-md min-w-100 mx-10"
        @click="addOptRemarks">Submit&nbsp;Remarks</button>
    </div>
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