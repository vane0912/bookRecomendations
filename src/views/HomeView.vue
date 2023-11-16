<template>
    <header class="w-ful bg-center bg-cover bg-no-repeat flex items-center justify-center bg-[url('../assets/images/homepage/homepage-header.png')] py-40">
        <div class="flex flex-col justify-center items-center w-4/5 md:w-3/5 h-3/5">
          <h1 class="text-4xl md:text-6xl text-center font-extrabold my-3">Discover Your Next Literary Adventure: Explore Book Categories</h1>
          <h3 class="text-2xl md:text-3xl text-center font-normal my-5 text-[#3F3A37]">Explore all New York times best sellers</h3>
          <gbutton @clickEvent="$router.push('AllBooks')" buttontxt="Let’s Go!"/>
        </div>
    </header>
    <main class="bg-gradient-to-t from-[#d5e4db] via-[#eaf0e9] to-[#FEFBF5] w-full flex flex-col items-center">
      <h1 class="m-10 text-center text-4xl font-bold text-[#3F3A37]">This month Best sellers</h1>
      <div class="flex w-5/6">
        <div class="flex flex-col justify-evenly h-fit">
          <div ref="sectionDiv" v-for="types in sections" :key="types" @click="this.selectedSec = types" 
          :class="{ 'bg-[#FEFBF5]': this.selectedSec === types, 'text-[#C87664]':  this.selectedSec === types}" 
          class="flex flex-col bg-[#C87664] text-[#FEFBF5] border-solid border-2 border-[#C87664] hover:bg-[#FEFBF5] hover:text-[#C87664]">
            <h3 class="text-xl p-4 text-center ">{{ types }}</h3>
          </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 lg:grid-flow-row w-4/6">
          <books
            :filteredSection="this.selectedSec"
            :booksArray="BooksArray"
            :limit="true"
            exclude=""
            @choose-book="bookTitle => $router.push(`/${bookTitle}`)">
          </books>
          <gbutton class="col-end-3 w-1/2 justify-self-end" @clickEvent="$router.push(`/section/${this.selectedSec}`)" buttontxt="See All"></gbutton>
        </div>
      </div>
    </main>
</template>

<script>
  import gbutton from '@/components/gbutton.vue';
  import books from '@/components/books.vue'
  export default{
    data(){
      return{
        BooksArray: [],
        sections: [],
        selectedSec: ""
      }
    },
    components: {gbutton, books},
    async beforeMount(){
        const getBook = await fetch('http://localhost:3000/books');
        const tojson = await getBook.json();
        this.BooksArray = tojson;
        const categories = new Set();
        this.BooksArray.forEach((element) => categories.add(element.Section));
        let secArray = Array.from(categories);
        this.sections = secArray;
        this.selectedSec = this.sections[0]
    },
  }
</script>
