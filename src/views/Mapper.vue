<script setup>
  import axios from "axios";
  import {ref} from "vue";
  import Dropdown from "primevue/dropdown";

  var mills = ref ([]);
  var rotors = ref([]);
  var selectedMillId = "";
  var selectedRotorId = "";
  var isStartError = ref(false);
  var isStartSuccess = ref(false);
  var startError = ref("");
  var startSucess = ref("");

  var buttonText= ref("");
  buttonText.value = "CREATE MAPPING";
  getData();
  function getData() {
    axios
      .get('http://localhost:8080/start') 
      .then(response => {
        const data = response.data;
        console.log(data);
        for (const item of data) {
          if(item.type == "Mill") {
           mills.value.push(item)
          } else {
            rotors.value.push(item)
          }
        }
        console.log(mills);
        console.log(rotors);
      })
  }

  function create() {

    buttonText.value = "Creating..."
    if(selectedMillId == null || selectedMillId == '') {
      isStartError.value = true;
      startError.value = "Please select a Mill."
      alert(isStartError.value);
    } else if(selectedRotorId == null || selectedRotorId == '') {
      isStartError.value = true;
      startError.value = "Please select a Rotor."
    }

    if(isStartError.value) {
      return;
    }
    

    isStartError.value = false;
    startError.value = ""
    isStartSuccess.value=false;
    startSucess.value = "";
     

    var request = {
      millId: selectedMillId,
      rotorId: selectedRotorId
    };

    console.log(request)
    axios.post('http://localhost:8080/maprotor', request)
    .then(function (response) {
      console.log(response);
      isStartSuccess.value = true;
      startSucess.value = "Mapping Created";
      buttonText.value = "CREATE MAPPING"
    })
    .catch(function (error) {
      startError.value = "Error in mapping creation. Please try again later"
      isStartError.value = true;
      buttonText.value = "CREATE MAPPING"
    });
  }

  
</script> 

<template>
  <div class="table w-4/6 mt-20 pb-10">
    <div class="table-header-group border-2 border-slate-100 bg-gray-700 text-gray-400">
      <div class="table-row">
        <div class="table-cell text-left p-4 border-b-2 border-b-slate-500">MILL</div>
        <div class="table-cell text-left p-4 border-b-2 border-b-slate-500">ROTOR</div>
        <div class="table-cell text-left p-4 border-b-2 border-b-slate-500">ACTION</div>
      </div>
    </div>

    <div class="table-row-group bg-gray-800">
      <div class="table-row">
        <div class="table-cell text-left p-4 border-b-2 border-b-slate-700">
          <select class="bg-slate-900 bg-gray-700" name="mill" id="mill_id" v-model="selectedMillId">
            <option class="text-slate-500" value="">Select Mill</option>
            <option v-for="mill in mills" :value="mill.mill_rotor_id">{{mill.mill_rotor_id}}</option>
          </select>
          <!-- <Dropdown class="bg-slate-900 w-full md:w-14rem text-white" :options="mills" ></Dropdown> -->
        </div>
        <div class="table-cell text-left p-4 border-b-2 border-b-slate-700">
          <select class="bg-slate-900 bg-gray-700" name="rotor" id="rotor_id" v-model="selectedRotorId">
            <option class="text-slate-500" value="">Select Rotor</option>
            <option v-for="rotor in rotors" :value="rotor.mill_rotor_id">{{rotor.mill_rotor_id}}</option>
          </select>
        </div>
        <div class="table-cell text-left p-4 border-b-2 border-b-slate-700">
          <div class="flex flex-row"><button class="bg-green-500 bg-gray-700 py-2 px-8 rounded-md min-w-24 bg-lime-400 text-black" @click="create">{{ buttonText }}</button></div>
        </div>
      </div>
    </div>
  </div>
  
  <div v-if="isStartError" class="bg-red-100 border border-red-400 text-red-700 py-3 px-10 rounded relative" role="alert">
    <strong class="font-bold">Error! </strong>
    <span class="block sm:inline">{{startError}}</span>
  </div>

  <div v-if="isStartSuccess" class="bg-green-100 border border-green-400 text-green-700  py-3  rounded relative" role="alert">
    <strong class="font-bold">Success! </strong>
    <span class="block sm:inline">{{startSucess}}</span>
  </div>
    
</template>

<style scoped>
</style>
