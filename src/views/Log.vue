<template>
    <main class="w-11/12 h-full bg-[#FFFFFF] flex items-center justify-center flex-col">
        <div class="w-1/2 max-w-sm  flex flex-col py-12 px-8 bg-[#FEFBF5] border-solid border-[#ECA085] border-4 drop-shadow-2xl">
            <h1 class="text-center text-5xl my-7">Log in</h1>
            <div>
                <form @submit.prevent="registerUser" class="flex flex-col">
                    <span>Email</span>
                    <input v-model="email" class="border-solid border-[#ECA085] p-1 border-[1px] focus:outline-none text-[#3F3A37]">
                    <span class="mt-5">Password</span>
                    <input v-model="password" class="border-solid p-1 border-[#ECA085] border-[1px] focus:outline-none text-[#3F3A37]">
                    <Gbutton buttontxt="Log in" class="my-6"></Gbutton>
                    <p class="text-center cursor-pointer">Don’t have an account? Sing in here</p>
                </form>
            </div>
        </div>
    </main>
</template>
<script>
import Gbutton from '@/components/gbutton.vue';
export default{
    components: {Gbutton},
    data(){
        return{
            email: '',
            password: ''
        }
    },
    methods:{
    
    }
}

</script>