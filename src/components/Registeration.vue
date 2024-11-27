<script setup>

import axios from "axios";
import { ref } from "vue";

var selectedRole = ref("");
var roles = ref([]);
var userName = ref("");
var pswd = ref("");
var conpswd = ref("");
var selectedRole = ref("");

var startError = ref("");
var isStartError = ref(false);
var isStartSuccess = ref(false);
var startSuccess = ref("");

var data = [
    {roleName : "Maintennance",roleId:"1"},
    {roleName : "Operations",roleId:"2"},
    {roleName : "Admin",roleId:"3"}
];

roles.value = data;

function createUser() {

    isStartError.value = false;
    startError.value = "";
    isStartSuccess.value = false;
    startSuccess.value = "";
   
    if(pswd.value != conpswd.value) {
        isStartError.value = true;
        startError.value = "Passwords do not match.";
        return;
    }

    if(!userName.value) {
        isStartError.value = false;
        startError.value = "";
        isStartError.value = true;
        startError.value = "Please enter user name.";
        return;
    }

    if(!pswd.value) {
        isStartError.value = false;
        startError.value = "";
        isStartError.value = true;
        startError.value = "Please enter password.";
        return;
    }

    if(!conpswd.value) {
        isStartError.value = false;
        startError.value = "";
        isStartError.value = true;
        startError.value = "Please confirm the password.";
        return;
    }

    if(!selectedRole.value) {
        isStartError.value = false;
        startError.value = "";
        isStartError.value = true;
        startError.value = "Select role for the user";
        return;
    }

    isStartError.value = false;
    startError.value = "";

        var request = {
            userName: userName.value,
            password: pswd.value,
            roleId: selectedRole.value
        }

        console.log(request);

        axios.post('http://localhost:8080/user', request)
         .then(function (response) {
                console.log(response);
                if(response.data.errorCode != null && response.data.errorCode != '') {
                    startError.value = response.data.errorMsg;
                    isStartError.value = true;
                    return;
                }
                isStartSuccess.value = true;
                startSuccess.value = "User Created.";
            })
            .catch(function (error) {
                startError.value = "Error in creating user. Please try again";
                isStartError.value = true;
            });
}
</script>

<template>
    <div class="flex min-h-full flex-col px-6 lg:px-8 w-screen items-center">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <!-- <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" /> -->
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Create User</h2>
      </div>
  
      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <div class="space-y-6">
          <div>
            <label for="username" class="block text-sm font-medium leading-6 text-white">User Name</label>
            <div class="mt-2">
              <input id="username" name="username" type="text" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="userName"/>
            </div>
          </div>
  
          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6 text-white" >Password</label>
              <!-- <div class="text-sm">
                <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
              </div> -->
            </div>
            <div class="mt-2">
              <input id="password" name="password" type="password" autocomplete="current-password" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="pswd"/>
            </div>
          </div>
          <div>
            <div class="flex items-center justify-between">
                <label for="conpassword" class="block text-sm font-medium leading-6 text-white" >Confirm Password</label>
            </div>
            <div class="mt-2">
                <input id="conpassword" name="conpassword" type="password" autocomplete="current-password" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="conpswd"/>
            </div>
           </div>
           <div>
            <div class="flex items-center justify-between">
                <label for="conpassword" class="block text-sm font-medium leading-6 text-white" >Role</label>
            </div>
                <div class="mt-2">
                    <select class="block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" name="role" id="role" v-model="selectedRole">
                        <option class="text-slate-500" value="">Select Role</option>
                        <option v-for="role in roles" :value="role.roleId">{{ role.roleName }}</option>
                    </select>
                </div>
            </div>
  
          <div class="mt-2">
            <button @click="createUser(selectedRole)"  class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create</button>
        </div>
        </div>
      </div>
      <div v-if="isStartError" class="bg-red-100 border border-red-400 text-red-700 py-3 px-10  mt-10 w-1/8 rounded relative" role="alert">
        <strong class="font-bold">Error! </strong>
        <span class="block sm:inline">{{ startError }}</span>
     </div>

    <div v-if="isStartSuccess" class="bg-green-100 border border-green-400 text-green-700  py-3 px-10 mt-10 mw-1/2 rounded relative"
        role="alert">
        <strong class="font-bold">Success! </strong>
        <span class="block sm:inline">{{ startSuccess }}</span>
    </div>
    </div>  
</template>