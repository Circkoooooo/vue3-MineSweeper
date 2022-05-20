<script setup lang="ts">
import { useTitle } from '@vueuse/core'
import Footer from '@/components/Footer.vue'
useTitle('Vue-Sweeper')

</script>
<template>
  <main font-sans class="text-center" mt-5 p-5>
    <RouterView></RouterView>
    <Footer></Footer>
  </main>
</template>