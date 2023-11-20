<template>
    <div class="flex flex-col justify-center items-center w-full">
        <h1 class="text-4xl md:text-6xl text-center my-9">{{ $route.params.type }}</h1>
        <div class="grid grid-cols-1 grid-flow-row m-auto max-w-fit sm:grid-cols-2 md:grid-cols-3">
            <books
            :filteredSection="this.$route.params.type"
            :booksArray="this.BooksArray"
            :limit="false"
            exclude=""
            @choose-book="bookTitle => $router.push(`/${bookTitle}`)">
            >
            </books>
        </div>
    </div>
</template>
<script>
    import books from '../components/books.vue'
    export default{
        components: {books},
        data(){
            return{
                BooksArray:[]
            }
        },
        watch:{
            '$route'(){
                this.getSections()
            }
        },
        beforeMount(){
            this.getSections()
        },
        methods:{
            async getSections(){
                try{
                    const getBook = await fetch('http://localhost:3000/books');
                    const tojson = await getBook.json();
                    this.BooksArray = tojson;
                    console.log(this.filteredSection)
                }catch(error){
                    console.log(error)
                }
            }
        }
    }
</script>