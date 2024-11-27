<script setup>
  import { BsCalendar4Range } from '@kalimahapps/vue-icons';
  import MenuDropDown from './components/MenuDropDown.vue';
  import { useRouter } from 'vue-router'
  import emitter from 'tiny-emitter/instance';
  import { ref } from "vue";
    
  const router = useRouter();
  var buttonText = ref("Login");
  function route(href) {
    console.log(href)
    router.push(href);
  }
  buttonText.value = "Login";

  // Listen for event to change login button text
    emitter.on('chngBtn', function () {
      chngBtn();
    });

  function chngBtn() {
    if(localStorage.getItem('login') != null && localStorage.getItem('login') != '') {
        buttonText.value = "Logout";
    } else  {
        emitter.emit('removeMenu');
        buttonText.value = "Login";
    }
  }
  chngBtn();
  
</script>


<template>
  
  
  <div class="flex flex-col justify-around text-white bg-slate-900 w-screen">
    
    <div class="flex flex-row  mx-10 my-5">  
      <MenuDropDown class="w-100"></MenuDropDown>
      <div class="text-center w-screen">
        <h3 class="text-center font-black text-xl">TPS - I EXPANSION</h3> 
        <h3 class="text-center font-black text-xl mt-2">BEATER WHEEL MANAGEMENT SYSTEM</h3> 
      </div>
      <button @click="route('login')" class="w-50 max-h-10 bg-white text-slate-900 px-10 py-2 text-sm font-semibold rounded-md">{{ buttonText}}</button>
    </div>
    <!-- <span class="material-symbols-outlined mx-10 my">
      menu
    </span> -->
    <!-- <div class="bg-slate-900 h-screen w-1/12 flex flex-col justify-center align-middle text-center border-r-2 border-r-slate-800">
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
    </div> -->
    
    <div class="bg-slate-900  h-screen w-screen flex flex-col items-center">
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
