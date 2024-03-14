<script setup>
  import axios from "axios";
  import {ref} from "vue";
  import Dropdown from "primevue/dropdown";

  var selectedMillId = "";
  var selectedRotorId = "";
  var selectedDateTime = "";
  var endTime = "";
  
  var mills = ref([]);
  var rotors = ref([]);
  var runs = ref([]);

  var startError = ref("")
  var isStartError = ref(false);
  var isStartSuccess = ref(false);
  var startSucess = ref("");

  var isRequestActive = false;
  var buttonText = ref("START")

  var limit = 3;
  var count = 0 ;
  var previousBtn = ref(false);
  var nextBtn = ref(false);

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
      stopDisplay();  
      
  function start() {
    buttonText.value = "Starting..."
    if(selectedMillId == null || selectedMillId == '') {
      isStartError.value = true;
      startError.value = "Please select a Mill to start."
    } else if(selectedRotorId == null || selectedRotorId == '') {
      isStartError.value = true;
      startError.value = "Please select a Rotor to start."
    } else if(selectedDateTime == null || selectedDateTime == '') {
      isStartError.value = true;
      startError.value = "Please select a date and time to start."
    } 

    isStartError.value = false;
    startError.value = ""
    isStartSuccess.value=false;
    startSucess.value = "";
    
    if(isStartError.value) {
      return;
    }
    
    var request = {
      millId: selectedMillId,
      rotorId: selectedRotorId,
      component: '00',
      startTime: selectedDateTime,
      action: 'STRT'
    };

    console.log(request)
    axios.post('http://localhost:8080/mill', request)
    .then(function (response) {
      console.log(response);
      isStartSuccess.value = true;
      startSucess.value = "Mill Started";
      buttonText.value = "START"
      stopDisplay();
    })
    .catch(function (error) {
      startError.value = "Error in starting mill. Please try again later"
      isStartError.value = true;
      buttonText.value = "START"
      startSucess.value = "Mill Stopped";
    });
   
  
  }  
 
  var temp = [];
  function stopDisplay() {
    axios
      .get('http://localhost:8080/running') 
      .then(response => {
        temp = response.data;
        console.log(response.data);
        pageData(temp);
        
      })
  }

  // pageData();
  
    function pageData(temp) {
        runs.value = [];
        for(var e = count ; e < count + limit ; e++) {
            if(e >= temp.length) {
                break;
            }
            runs.value.push(temp[e]);
        }
        if(e >= temp.length) {
            nextBtn.value = true;
        } else {
            nextBtn.value = false;
        }
        console.log(count);
        if(count <= 0) {
            previousBtn.value = true;
        } else {
            previousBtn.value = false;
        }

    }

    function previous() {
        count = count - limit;
        console.log(count);
        pageData(temp);
    }
    function next() {
        count = count + limit;
        pageData(temp);
    }

  function stop(millId,rotorId) {

    var request = {
      millId: millId,
      rotorId: rotorId,
      component: '00',
      startTime: endTime,
      action: 'STOP'
    };

    console.log(request);
    axios.post('http://localhost:8080/mill', request)
    .then(function (response) {
      console.log(response);
      isStartSuccess.value = true;
      startSucess.value = "Mill Stopped";
    })
    .catch(function (error) {
      startError.value = "Error in stopping motor. Please try again later"
      isStartError.value = true;
    });
  }

  

</script>

<template>
  <div class="table w-4/6 mt-20 pb-10">
    <div class="table-header-group border-2 border-slate-100 bg-gray-700 text-gray-400">
      <div class="table-row">
        <div class="table-cell text-left p-4 border-b-2 border-b-slate-500">MILL</div>
        <div class="table-cell text-left p-4 border-b-2 border-b-slate-500">ROTOR</div>
        <div class="table-cell text-left p-4 border-b-2 border-b-slate-500">START TIME</div>
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
          <div class="flex flex-row"><input class="bg-slate-900 bg-gray-700 light:[color-scheme:light]" type="datetime-local" id="startTime" v-model="selectedDateTime"></div>
        </div>
        <div class="table-cell text-left p-4 border-b-2 border-b-slate-700">
          <div class="flex flex-row"><button class="bg-green-500 bg-gray-700 py-2 rounded-md min-w-24 bg-lime-400 text-white" @click="start">{{buttonText}}</button></div>
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
    
  <div class="overflow-x-auto mt-10">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 text-gray-400">
      <thead class="text-xs text-white uppercase bg-gray-700 text-gray-400">
          <tr>
              <th scope="col" class="px-20 py-3">
                  MILL
              </th>
              <th scope="col" class="px-20 py-3">
                  ROTOR
              </th>
              <th scope="col" class="px-20 py-3">
                  END TIME
              </th>
              <th scope="col" class="px-20 py-3">
                  ACTION
              </th>
          </tr>
      </thead>
      <tbody>
          <tr v-for = "run in runs" class="bg-slate-900 border-b bg-gray-800 border-gray-700 text-white text-center">
              <th scope="row" class="px-7 py-4 font-medium whitespace-nowrap text-white">
                  {{run.millId}}
              </th>
              <td class="px-7 py-4">
                {{run.rotorId}}
              </td>
              <td class="px-7 py-4">
                <input class="bg-slate-900 bg-gray-700 light:[color-scheme:light]" type="datetime-local" id="endTime" v-model="endTime">
              </td>
              <td class="px-7 py-4">
                <button class="bg-red-700 bg-gray-700 py-2 rounded-md min-w-24" @click="stop(run.millId, run.rotorId)">STOP</button>
              </td>
          </tr>
      </tbody>
    </table>
  </div>    
  <div class="py-10 flex flex-row justify-center">
            <button :disabled="previousBtn" class="bg-rose-700 bg-gray-700 py-2 shadow-xl rounded-md min-w-24 mx-5 disabled:bg-gray-300 disabled:text-slate-700 disabled:shadow-none" @click="previous">Previous</button>
            <button :disabled="nextBtn" class="bg-rose-700 bg-gray-700 py-2 shadow-xl rounded-md min-w-24 mx-5 disabled:bg-gray-300 disabled:text-slate-700 disabled:shadow-none" @click="next">Next</button>
  </div>
</template>

<style scoped>
  input[type="datetime-local"]::-webkit-calendar-picker-indicator {
    /* background-color: white; */
    filter: invert(1);
  }
</style>
