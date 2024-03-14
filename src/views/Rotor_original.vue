<script setup>
  import axios from "axios";
  import {ref} from "vue";

  var comps = [];
  var rotorDetails = [];

  var final = ref([]);
  var resetTime = "";
  var startError =ref("");
  var isStartError =ref(false);
  var selectedMillId ="";

  var limit = 8;
  var count = 0 ;
  var previousBtn = ref(false);
  var nextBtn = ref(false);


  var mills = ref([]);
  var data = [
    {
      "millId": "M1"
    },
    {
      "millId": "M2"
    },
    {
      "millId": "M3"
    }
];

    mills.value = data;
    console.log(mills.value);


  var temp =[];
    axios
      .get('http://localhost:8080/resetcomponent') 
      .then(response => {
        comps = response.data.cmptDetails;
        rotorDetails = response.data.rotorRunningDetails;
      })
      .then(()=> {
        //pageData(temp);
        for(var comp of comps) {
            for(var rotor of rotorDetails) {
                if(comp.rotorId == rotor.rotor_id) {
                    var temp1 = comp;
                    if(rotor.status == "Stop") {
                        temp1.stopped = false;
                    } else {
                        temp1.stopped = true;
                    }
                    final.value.push(temp1)
                }
            }
         }
         console.log(final.value)
      })
       
    //   function pageData(temp) {
    //     comps.value = [];
    //     for(var e = count ; e < count + limit ; e++) {
    //         if(e >= temp.length) {
    //             break;
    //         }
    //         comps.value.push(temp[e]);
    //     }
    //     if(e >= temp.length) {
    //         nextBtn.value = true;
    //     } else {
    //         nextBtn.value = false;
    //     }
    //     console.log(count);
    //     if(count <= 0) {
    //         previousBtn.value = true;
    //     } else {
    //         previousBtn.value = false;
    //     }

    // }

    // function previous() {
    //     count = count - limit;
    //     console.log(count);
    //     pageData(temp);
    // }
    // function next() {
    //     count = count + limit;
    //     pageData(temp);
    // }

  function reset(millId, rotorId, comp) {

    if(resetTime == null || resetTime =='') {
        isStartError.value = true;
      startError.value = "Please select reset time to reset."
    }

    isStartError.value = false;
    startError.value = ""
    
    if(isStartError.value) {
      return;
    }

    var request = {
        millId: millId,
        rotorId: rotorId,
        component: comp,
        action: 'RSET',
        startTime: resetTime
    };
    console.log(request);
    axios.post('http://localhost:8080/millOpt', request)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      startError.value = "Error in resetting rotor. Please try again later"
      isStartError.value = true;
    });

  }
    
  function search() {
    axios
      .get('http://localhost:8080/componentsearch' , {
        params: {
          millid: selectedMillId,
        }
      })  
      .then(response => {
        console.log(response)
        // comps = response.data.cmptDetails;
        // rotorDetails = response.data.rotorRunningDetails;
      })
      // .then(()=> {
      //   //pageData(temp);
      //   for(var comp of comps) {
      //       for(var rotor of rotorDetails) {
      //           if(comp.rotorId == rotor.rotor_id) {
      //               var temp1 = comp;
      //               if(rotor.status == "Stop") {
      //                   temp1.stopped = false;
      //               } else {
      //                   temp1.stopped = true;
      //               }
      //               final.value.push(temp1)
      //           }
      //       }
      //    }
      //    console.log(final.value)
      // })
  }  
</script>

<template>

  <div class="mt-15">
  <div>
    <label class ="font-medium whitespace-nowrap text-white px-5 rounded-md">MILL : </label>
    <select class="bg-white-900 bg-gray-700 my-10 px-5 rounded-md" name="mill" id="mill_id" v-model="selectedMillId" @change="search">
      <option class="text-slate-500" value="">Select Mill</option>
      <option v-for="mill in mills" :value="mill.millId">{{mill.millId}}</option>
    </select>
  </div>
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
          <tr v-for = "comp in final" class="bg-slate-900 border-b bg-gray-800 border-gray-700 text-white">
              <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap text-white">
                  {{comp.millId}}
              </th>
              <td class="px-6 py-4">
                {{comp.rotorId}}
              </td>
              <td class="px-6 py-4">
                {{comp.componentName}}
              </td>
              <td class="px-6 py-4">
                <input class="bg-slate-900 bg-gray-700 light:[color-scheme:light]" type="datetime-local" id="startTime" v-model="resetTime">
              </td>
              <td class="px-6 py-4">
                {{comp.runningHours}}
              </td>
              <td class="px-6 py-4">
                <button :disabled='comp.stopped' class="bg-rose-700 bg-gray-700 py-2 rounded-md min-w-24 disabled:bg-gray-300 disabled:text-slate-700 disabled:shadow-none" @click="reset(comp.millId, comp.rotorId, comp.componentName)">RESET</button>
              </td>
          </tr>
      </tbody>
  </table>

  <div v-if="isStartError" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-7 rounded relative" role="alert">
    <strong class="font-bold">Error! </strong>
    <span class="block sm:inline">{{startError}}</span>
  </div>

  <button id="open" class="mx-auto mt-4 table rounded bg-gray-200 px-4 py-2 text-sm font-bold">Open</button>

<dialog id="dialog" class="mt-8 rounded-xl bg-white p-6 shadow-3xl backdrop:bg-black/50 backdrop:backdrop-blur-md">
  <p>Lorem ipsum dolor sit amet.</p>
  <button id="close" class="mx-auto mt-4 table rounded bg-gray-200 px-4 py-2 text-sm font-bold">Close</button>
</dialog>

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