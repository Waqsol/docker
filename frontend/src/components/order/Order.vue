<template>
    <div v-if="this.product">
        <h4>Корзина</h4>
        <div v-if="!submitted">

            <button v-on:click="deleteProduct()">Удалить</button>
        </div>
        
            
            <router-link to="/main">Вернуться в магазин</router-link>
            <ul>
            <!-- Вывод списка пользователей -->
            <li v-for="(prod, index) in mas" :key="index">
                
                    {{prod}}
                
            </li>
        </ul>
    </div>
123123213
</template>

<script>
    //import http from "../../http-common";
    export default {
        name: "orderProd",
        props: ['mas'],
        data() {
            return {
                user: null,
                submitted: false
            };
        },
        methods: {
            
        },
        mounted() { // загружаем данные пользователя
           
        }
    }
</script>