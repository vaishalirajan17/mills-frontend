<script setup>

import { ref } from "vue";
import axios from "axios";
import { useRouter } from 'vue-router'
import emitter from 'tiny-emitter/instance';

var startError = ref("");
var isStartError = ref(false);
var isStartSuccess = ref(false);
var startSuccess = ref("");
var pswd = "";
var userName = "";
const router = useRouter();

    localStorage.removeItem('login');
    emitter.emit('chngBtn');
    function login() {

        isStartError.value = false;
        startError.value = "";
        isStartSuccess.value = false;
        startSuccess.value = "";

        var request = {
            username: userName,
            password: pswd
        };

        console.log(request);
        axios.post('http://localhost:8080/login', request)
        .then(function (response) {
        console.log(response);

      //validations for start date
        if(response.data.errorCode != null && response.data.errorCode != '') {
            startError.value = response.data.errorMsg;
            isStartError.value = true;
            return;
        }

        isStartSuccess.value = true;
        startSuccess.value = "Login Sucessful";
        localStorage.setItem('login',userName);
        emitter.emit('loadoptions');
        router.push('/');
        emitter.emit('chngBtn');
        
        })
        .catch(function (error) {
        startError.value = "Error Loggin in. Please try again ";
        isStartError.value = true;
        
        });
        
    }

    function route(href) {
    router.push(href);
  }
</script>
<template>
    <div class="flex min-h-full flex-col px-6 py-12 lg:px-8 w-screen items-center">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <!-- <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" /> -->
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Sign in to your account</h2>
      </div>
  
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
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
            <button @click="login"  class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"> Log In</button>
        </div>
        </div>
      </div>

      <!-- <p class="mt-10 text-center text-sm text-gray-500">
        Not a member?
        {{ ' ' }}
        <a @click="route('registeration')" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-default">Create an Account</a>
      </p> -->

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
  