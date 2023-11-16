<template>
        <header class="w-full h-[50vh] flex justify-end items-center bg-right sm:bg-center bg-cover bg-no-repeat bg-[url('../assets/images/All-Books/header.png')]">
            <div class="flex flex-col w-full sm:w-5/12 m-24">
                <h1 class="font-extrabold text-center mb-7 text-4xl lg:text-6xl">Find books based on your interests</h1>
                <h3 class="font-medium text-center text-xl lg:text-3xl ">Filter Books by type, Author or Search any Title!</h3>
            </div>     
        </header>
        <main class="bg-gradient-to-t from-[#d5e4db] via-[#eaf0e9] to-[#e5d7bc] w-full h-full p-5 ">
            <div class="flex justify-center my-12 w-3/4">
                <input v-model="Filter" class="bg-[#ECA085] text-[#FEFBF5] py-2 text-xl rounded-md">
                <select v-model="SectionSelect" class="h-full">
                    <option value="">All</option>
                    <option v-for="section in sections" :key="section">{{ section }}</option>
                </select>
                <button v-if="show" class="bg-[#3F3A37] text-[#FEFBF5] py-2 px-10 text-xl rounded-md w-1/5">Clear Filter</button>
            </div>
            <div class="grid grid-cols-3 place-items-center">
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