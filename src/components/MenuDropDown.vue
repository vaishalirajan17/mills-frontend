<script setup>
  import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
  import { ChevronDownIcon } from '@heroicons/vue/20/solid'
  import { useRouter } from 'vue-router'
  import { ref } from "vue";
  import emitter from 'tiny-emitter/instance';
  import axios from "axios";

  var dropdwn = ref([]);
  var screens = ref([]);
  emitter.on('loadoptions', function () {
    loadoptions()
  });

  emitter.on('removeMenu', function () {
    removeMenu()
  });

  function removeMenu() {
    dropdwn = ref([]);
  }

  function loadoptions() {
    dropdwn = ref([]);
    console.log('loading options..')

    axios
    .get('http://localhost:8080/permissions',{
        params: {
        username: localStorage.getItem('login')
      }
            }).then(response => {
         response.data;
        console.log(response.data.permissions);
        // dropdwn.value = response.data.permissions;
        
            for(var dpdwn of response.data.permissions) {
            if(dpdwn.screenName == 'Rotor Reset' ) {
                dpdwn.href = "reset"
                dropdwn.value.push(dpdwn);
                screens.value.push(dpdwn);
            } else if(dpdwn.screenName == 'Mill Operations') {
                dpdwn.href = "mill"
                dropdwn.value.push(dpdwn);
                screens.value.push(dpdwn);
            } else if(dpdwn.screenName == 'Create Mapping') {
                dpdwn.href = "mapper"
                dropdwn.value.push(dpdwn);
                screens.value.push(dpdwn);
            } else if(dpdwn.screenName == 'Operation Remarks') {
                dpdwn.href = "operation"
                dropdwn.value.push(dpdwn);
                screens.value.push(dpdwn);
            } else if(dpdwn.screenName == 'Create User') {
                dpdwn.href = "registeration"
                dropdwn.value.push(dpdwn);
                screens.value.push(dpdwn);
            }
            // else if(dpdwn.screenName == 'View Details') {
            //     dpdwn.href = "/"
            //     //dropdwn.value.push(dpdwn);
            //     screens.value.push(dpdwn);
            // }
        }
        console.log(dropdwn.value);
    })

  }

  const router = useRouter();
  

  function route(href) {
    router.push(href);
  }

   
</script>

<template>
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-5 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Menu
          <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </MenuButton>
      </div>
  
      <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
        <MenuItems class="absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div class="py-1">
            <MenuItem v-slot="{ active }" v-for="menu in dropdwn">
              <a @click="route(menu.href)" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">{{ menu.screenName }}</a>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <a @click="route('/')" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">View Details </a>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <a @click="route('editrotor')" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Edit Rotor Details </a>
            </MenuItem>
            <!-- <MenuItem v-slot="{ active }">
              <a @click="route('operation')" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Add Operational Remarks </a>
            </MenuItem> -->
            <!-- <MenuItem v-slot="{ active }">
              <a @click="route('reset')" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Rotor Reset</a>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <a @click="route('mapper')" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Mill Mapping</a>
            </MenuItem> -->
            <!-- <form method="POST" action="#">
              <MenuItem v-slot="{ active }">
                <button type="submit" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block w-full px-4 py-2 text-left text-sm']">Sign out</button>
              </MenuItem>
            </form> -->
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </template>
  
  