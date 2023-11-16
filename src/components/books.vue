<template>
    <div ref="turnToCol" class="flex my-6 justify-center h-fit" v-for="book in booksToDisplay" :key="book.id">
        <div class="h-fit">
            <img class="w-24" v-bind:src="book.img" alt="book front page">
        </div>
        <div class="pl-8 w-1/2 h-fit">
            <h4 class="my-2 font-bold">{{ book.Title }}</h4>
            <p>{{ book.Author }}</p>
            <button @click="$emit('choose-book', book.Title)" class="w-fit bg-[#C87664] text-[#FEFBF5] py-1 px-2 rounded-sm my-3">See Book</button>
        </div>
    </div>
</template>

<script>
export default{
    props: {
        filteredSection: String,
        booksArray: Array,
        limit: Boolean,
        exclude: String,
    },
    emits:['choose-book'],
    computed: {
        filteredBooks() {
            return this.booksArray.filter((book) => book.Section === this.filteredSection)
        },
        booksToDisplay(){
            if(this.filteredSection){
                if(this.limit === true){
                    return this.filteredBooks.slice(0, 6)
                }
                return this.filteredBooks.filter((value) => value.Title !== this.exclude);
            }
            return this.booksArray
        }
    }
}
</script>