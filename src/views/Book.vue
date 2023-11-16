<template>
  <main class="w-3/4">
    <div class="flex items-start p-14 justify-center">
      <div>
        <img :src="returnedBook.img">
      </div>
      <div class="w-1/2 mx-12 flex flex-col ">
        <h2 class="text-5xl">{{ $route.params.book }}</h2>
        <h3 class="text-2xl my-10">{{ returnedBook.Author }}</h3>
        <p class="text-xl">{{ returnedBook.Description }}</p>
      </div>
    </div>
    <h3 class="text-3xl font-semibold">Same category Books</h3>
    <div class="flex items-center justify-center">
      <div>
        <p @click="this.$refs.scroll.scrollLeft -= 200" class="text-4xl cursor-pointer" >s</p>
      </div>
      <div ref="scroll" class="w-full max-w-7xl overflow-hidden grid grid-flow-col-dense auto-cols-max grid-rows-1">
        <Books
          :filteredSection="this.returnedBook.Section"
          :booksArray="sections"
          :limit = "false"
          :exclude= "this.returnedBook.Title"
          @choose-book="bookTitle => $router.push(`${bookTitle}`)"
        />
      </div>
      <div>
        <p @click="this.$refs.scroll.scrollLeft += 200" class="text-4xl cursor-pointer" >></p>
      </div>
    </div>
  </main>
</template>
<script>
    import Books from '@/components/books.vue';
    export default{
    components: { Books },
    data() {
        return {
            returnedBook: {},
            sections: []
        };
    },
    watch:{
      '$route'(){
        this.getBook()
      }
    },
    beforeMount() {
        this.getBook();
    },
    methods: {
        async getBook() {
            try {
                const getBook = await fetch('http://localhost:3000/books');
                const tojson = await getBook.json();
                this.sections = tojson;
                this.returnedBook = this.sections.find((value) => value.Title === this.$route.params.book);
            }
            catch (err) {
                return console.log(err);
            }
        }
    },
}
</script>