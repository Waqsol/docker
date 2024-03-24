<template>
    <div>
        <h4>Список продуктов</h4>
        <!-- Определение ссылок -->
        <router-link class="item" to="/addProduct">Добавить продукт</router-link>
        <router-link class="item" to="/searchProducts">Поиск продукта</router-link>
        <ul>
            <!-- Вывод списка пользователей -->
            <li v-for="(product, index) in products" :key="index">
                <!-- name - Именованный маршрут: будет осуществляться переход на страницу с просмотром данных о пользователе -->
                <!-- Ссылка на user определена в файле router.js -->
                <!-- По маршруту user подгружается компонент User.vue -->
                <!-- в params указываются параметры, которые передаютс компоненту-->
                <!--Двоеточие перед to указыает, что значение атрибута изменяющееся (динамическое) -->
                <router-link :to="{
                        name: 'product-details',
                        params: { id: product.id }
                    }">
                    {{product.name}}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import http from "../../http-common"; // подключение объекта, который позволяет отправлять запросы серверу
    export default {
        name: "ListProduct", // Имя шаблона
        data() { // данные компонента (определение переменных)
            return {
                products: []
            };
        },
        methods: { // методы компонента
            getProductCategory() {
                http
                    .get("/Products") // обращаемся к серверу для получения списка пользователей
                    .then(response => { // запрос выполнен успешно
                        this.products = response.data;
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            }
        },
        mounted() { // загружаем данные пользователей. Обработчик mounted() вызывается после монтирования экземпляра шаблона
            this.getProductCategory();
        }
    }
</script>

<style>
    .item {
        margin-left: 5px;
    }
</style>