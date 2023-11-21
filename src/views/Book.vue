<template>
  <main class="w-full">
    <div class="flex flex-col-reverse items-center p-10 sm:p-14 justify-center md:items-start md:flex-row">
      <div class="md:w-1/2 w-full mx-12 flex flex-col items-center p-5">
        <h2 class="text-4xl sm:text-5xl text-center">{{ $route.params.book }}</h2>
        <h3 class="text-xl sm:text-2xl my-5 sm:my-10">{{ returnedBook.Author }}</h3>
        <p class="text-base sm:text-xl text-center">{{ returnedBook.Description }}</p>
      </div>
      <img :src="returnedBook.img">
    </div>
    <div class="w-full flex items-center justify-center">
        <div ref="scroll" class="w-5/6 grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3">
          <Books
            :filteredSection="this.returnedBook.Section"
            :booksArray="sections"
            :limit = "false"
            :exclude= "this.returnedBook.Title"
            @choose-book="bookTitle => $router.push(`${bookTitle}`)"
          />
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