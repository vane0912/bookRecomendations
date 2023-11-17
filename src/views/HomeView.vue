<template>
    <header class="w-full bg-center bg-cover bg-no-repeat flex items-center 
    justify-center bg-[url('../assets/images/homepage/homepage-header.png')] py-12 md:py-40">
        <div class="flex flex-col justify-center items-center w-3/5">
          <h1 class="text-4xl md:text-6xl text-center font-extrabold my-3">
            Discover Your Next Literary Adventure: Explore Book Categories
          </h1>
          <h3 class="text-2xl md:text-3xl text-center font-normal my-5 text-[#3F3A37]">
            Explore all New York times best sellers
          </h3>
          <gbutton @clickEvent="$router.push('AllBooks')" buttontxt="Let’s Go!"/>
        </div>
    </header>
    <main class="w-full flex flex-col items-center justify-center p-7">
      <h1 class="m-10 text-center text-4xl font-bold text-[#3F3A37]">
        This month Best sellers
      </h1>
      <div class="flex flex-col lg:flex-row justify-center">
        <div class="flex flex-col justify-evenly h-fit">
          <div v-for="type in sections" :key="type" 
          @click="showSections(type)"
          class="flex justify-between items-center border-solid border-2 border-[#C87664] hover:bg-[#FEFBF5] hover:text-[#C87664] cursor-pointer lg:block"
          :class="[type === this.selectedSec ? 'bg-[#FEFBF5] text-[#C87664]' : 'bg-[#C87664] text-[#FEFBF5]',type === this.selectedSec || show ? 'block' : 'hidden']">
            <h3 class="text-xl p-4 text-center">
              {{ type }}
            </h3>
            <div class="lg:hidden text-lg text-[#C87664] w-14 h-full flex items-center justify-center" >
              <img src="../assets/images/homepage/down-arrow.png">
            </div>
          </div>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-flow-row w-full lg:w-4/6">
          <books
            :filteredSection="this.selectedSec"
            :booksArray="BooksArray"
            :limit="true"
            exclude=""
            @choose-book="bookTitle => $router.push(`/${bookTitle}`)">
          </books>
          <button @click="$router.push(`/section/${this.selectedSec}`)" class="lg:col-end-3 justify-self-end w-8 h-8 p-2 rounded-md bg-[#C87664]">
            <img src="../assets/images/homepage/flecha.png">
          </button>
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
        selectedSec: "",
        show: false
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
    methods:{
      showSections(type){
        this.selectedSec = type;
        return this.show ? this.show = false : this.show = true
      }
    }
  }
</script>
