<template>
  <button @click="$emit('clickEvent')" class="bg-[#C87664] text-[#FEFBF5] text-2xl px-10 py-2 
  rounded-lg hover:bg-[#FEFBF5] hover:text-[#C87664] border-2 border-[#C87664]">
  {{ buttontxt }}</button>
</template>
<script>
  export default{
      props: ['buttontxt']
  }
</script>



