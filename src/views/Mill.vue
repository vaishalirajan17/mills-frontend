<script setup>
import MillStart from '../components/MillStart.vue';
import MillEnd from '../components/MillEnd.vue';
import { useRouter } from 'vue-router'

const router = useRouter();
if(localStorage.getItem('login') == null || localStorage.getItem('login') == '') {
        router.push('login');
}

</script>

<template>
  <MillStart></MillStart>
  <MillEnd></MillEnd>
</template>

<style scoped></style>
