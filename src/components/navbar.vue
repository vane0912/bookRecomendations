<template>
    <nav class="w-full p-8 bg-[#ECA085] flex justify-evenly">
        <RouterLink :to="{name: 'home'}">Homepage</RouterLink>
        <RouterLink :to="{name: 'allBooks'}">All Books</RouterLink>
        <RouterLink :to="{name: 'LogPage'}">Log in</RouterLink>
    </nav>
</template>