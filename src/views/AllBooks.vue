<template>
        <header class="w-full h-[50vh] flex justify-end items-center bg-right sm:bg-center bg-cover bg-no-repeat bg-[url('../assets/images/All-Books/header.png')]">
            <div class="flex flex-col w-full sm:w-5/12 m-24">
                <h1 class="font-extrabold text-center mb-7 text-4xl lg:text-6xl">Find books based on your interests</h1>
                <h3 class="font-medium text-center text-xl lg:text-3xl ">Filter Books by type, Author or Search any Title!</h3>
            </div>     
        </header>
        <main class="w-full h-full p-5">
            <div class="flex my-12 justify-evenly flex-col md:flex-row">
                <input v-model="Filter" class="w-full mb-3 md:mb-0 md:w-3/5 bg-[#FEFBF5] text-[#3F3A37] py-1 text-xl rounded-sm border-solid border-[#C87664] border-2">
                <select v-model="SectionSelect" class="bg-[#C87664] text-[#FEFBF5] px-5 py-3 cursor-pointer">
                    <option value="">All</option>
                    <option v-for="section in sections" :key="section">{{ section }}</option>
                </select>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center">
                <Books
                    filteredSection=""
                    :booksArray="filterBy(this.Filter)"
                    :limit="false"
                    exclude=""
                    @choose-book="bookTitle => $router.push(`/${bookTitle}`)">
                </Books>
            </div>
        </main>
</template>

<script>
import Books from '@/components/books.vue';

export default{
    components:{Books},
    data(){
        return{
            BooksArray:[],
            sections: [],  
            Filter: "",
            SectionSelect: "",
            show: false
        }
    },
    watch:{
        SectionSelect(){
            this.Filter = ""
        }
    },
    async beforeMount(){
        const getBook = await fetch('http://localhost:3000/books');
        const tojson = await getBook.json();
        const titleMap = new Map();
        tojson.forEach(element => {
            titleMap.set(element.Title, element);
        })
        const deduplicatedArray = Array.from(titleMap.values());
        this.BooksArray = deduplicatedArray;

        const categories = new Set();
        this.BooksArray.forEach((element) => categories.add(element.Section));
        let secArray = Array.from(categories);
        this.sections = secArray;
    },
    methods:{
        filterBy(text){
            if(text && !this.SectionSelect){
                return this.BooksArray.filter(value => value.Title.toLowerCase().startsWith(text.toLowerCase()) || value.Author.toLowerCase().includes(text.toLowerCase()))
            }
            if(this.SectionSelect){
                return this.BooksArray.filter(
                    (value) =>
                        (value.Title.toLowerCase().includes(text.toLowerCase()) ||
                            value.Author.toLowerCase().includes(text.toLowerCase())) &&
                        value.Section === this.SectionSelect)
            }
            return this.BooksArray
        }
    }
}


</script>