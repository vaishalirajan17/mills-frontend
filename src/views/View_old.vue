<script setup>

import {ref} from "vue";

var examp = ref([]);
    var limit = 4;
    var count = 0 ;
    var previousBtn = ref(false);
    var nextBtn = ref(false);


var response = [
    {
        "millId": "M2",
        "rotorId": "R1",
        "componentName": "CompA",
        "startTime": "11-03-2024",
        "endTime" :"11-03-2024",
        "runningHours": 110,
        "passed": false
    },
    {
        "millId": "M2",
        "rotorId": "R1",
        "componentName": "CompB",
        "startTime": "11-03-2024",
        "endTime" :"11-03-2024",
        "runningHours": 148,
        "passed": false
    },
    {
        "millId": "M2",
        "rotorId": "R1",
        "componentName": "CompC",
        "startTime": "11-03-2024",
        "endTime" :"11-03-2024",
        "runningHours": 148,
        "passed": true
    },
    {
        "millId": "M3",
        "rotorId": "R2",
        "componentName": "CompA",
        "startTime": "11-03-2024",
        "endTime" :"11-03-2024",
        "runningHours": 90,
        "passed": false
    },
    {
        "millId": "M3",
        "rotorId": "R2",
        "componentName": "CompB",
        "startTime": "11-03-2024",
        "endTime" :"11-03-2024",
        "runningHours": 90,
        "passed": false
    },
    {
        "millId": "M3",
        "rotorId": "R2",
        "componentName": "CompC",
        "startTime": "11-03-2024",
        "endTime" :"11-03-2024",
        "runningHours": 90,
        "passed": true
    }
];

    pageData();
    function pageData() {
        examp.value = [];
        for(var e = count ; e < count + limit ; e++) {
            if(e >= response.length) {
                break;
            }
            examp.value.push(response[e]);
        }
        if(e >= response.length) {
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
        pageData();
    }
    function next() {
        count = count + limit;
        pageData();
    }

</script>

<template>
    <div class="overflow-x-auto mt-20">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 text-gray-400">
        <thead class="text-xs text-white uppercase bg-gray-700 text-gray-400">
            <tr>
                <th scope="col" class="px-7 py-3">
                    MILL
                </th>
                <th scope="col" class="px-7 py-3">
                    ROTOR
                </th>
                <th scope="col" class="px-7 py-3">
                    COMPONENT
                </th>
                <th scope="col" class="px-7 py-3">
                    START TIME
                </th>
                <th scope="col" class="px-7 py-3">
                    END TIME
                </th>
                <th scope="col" class="px-7 py-3">
                    RUNNING HOURS
                </th>
                <th scope="col" class="px-7 py-3">
                    STATUS
                </th>
            </tr>
        </thead>
        <tbody>
           <tr v-for = "one in examp" class="bg-slate-900 border-b bg-gray-800 border-gray-700 text-white">
              <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap text-white">
                  {{one.millId}}
              </th>
              <td class="px-7 py-4">
                {{one.rotorId}}
              </td>
              <td class="px-7 py-4">
                {{one.componentName}}
              </td>
              <td class="px-7 py-4">
                {{one.startTime}}
              </td>
              <td class="px-7 py-4">
                {{one.endTime}}
              </td>
              <td class="px-7 py-4">
                {{one.runningHours}}
              </td>
              <td class="px-7 py-4">
                {{one.passed}}
              </td>
              
          </tr> 
         
        </tbody>
        </table>

        <div class="py-10 flex flex-row justify-center">
            <button :disabled="previousBtn" class="bg-rose-700 bg-gray-700 py-2 shadow-xl rounded-md min-w-24 mx-5 disabled:bg-gray-300 disabled:text-slate-700 disabled:shadow-none" @click="previous">Previous</button>
            <button :disabled="nextBtn" class="bg-rose-700 bg-gray-700 py-2 shadow-xl rounded-md min-w-24 mx-5 disabled:bg-gray-300 disabled:text-slate-700 disabled:shadow-none" @click="next">Next</button>
        </div>
        

    </div>
</template> 



