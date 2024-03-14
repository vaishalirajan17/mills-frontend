<script setup>
import { BsCalendar4Range } from '@kalimahapps/vue-icons';
</script>

<template>
  
  <div class="flex flex-row justify-around text-white ">
    <div class="bg-slate-900 h-screen w-1/6 flex flex-col justify-center align-middle text-center border-r-2 border-r-slate-800">
        <router-link tag="li" to="/" class="py-5 flex justify-center m-4 rounded-lg" ><span class="material-symbols-outlined px-2">
          home
          </span> HOME</router-link>
        <router-link tag="li" to="/history" class="py-5 flex justify-center m-4 rounded-lg"> <span class="material-symbols-outlined px-2">
          history
          </span>VIEW DETAILS</router-link>
          <router-link tag="li" to="/reset" class="py-5 flex justify-center m-4 rounded-lg"> <span class="material-symbols-outlined px-2">
          view_list
          </span> ROTOR RESET</router-link>
          <router-link tag="li" to="/mapper" class="py-5 flex justify-center m-4 rounded-lg"> <span class="material-symbols-outlined px-2">
          view_list
          </span> MAPPER</router-link>
    </div>
    
    <div class="bg-slate-900  h-screen w-5/6 flex flex-col items-center">
      <router-view></router-view>
    </div>
  </div>
  
</template>

<style scoped>
  a:hover {
    background-color: rgba(51, 65, 85, 0.237);
  }

  a.router-link-active,
  a.router-link-exact-active {
    background-color: rgb(51 65 85);
    cursor: pointer;
  }
</style>
