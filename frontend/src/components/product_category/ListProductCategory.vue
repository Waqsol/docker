<template>
    <div>
        <h4>Список категорий</h4>
        <!-- Определение ссылок -->
        <router-link class="item" to="/addProductCategory">Добавить категорию</router-link>
        <ul>
            <!-- Вывод списка пользователей -->
            <li v-for="(product_category, index) in product_categorys" :key="index">
                <!-- name - Именованный маршрут: будет осуществляться переход на страницу с просмотром данных о пользователе -->
                <!-- Ссылка на user определена в файле router.js -->
                <!-- По маршруту user подгружается компонент User.vue -->
                <!-- в params указываются параметры, которые передаютс компоненту-->
                <!--Двоеточие перед to указыает, что значение атрибута изменяющееся (динамическое) -->
                <router-link :to="{
                        name: 'product_category',
                        params: { id: product_category.id }
                    }">
                    {{product_category.name}}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import http from "../../http-common"; // подключение объекта, который позволяет отправлять запросы серверу
    export default {
        name: "ListProductCategory", // Имя шаблона
        data() { // данные компонента (определение переменных)
            return {
                product_categorys: []
            };
        },
        methods: { // методы компонента
            getProductCategory() {
                http
                    .get("/product_categorys") // обращаемся к серверу для получения списка пользователей
                    .then(response => { // запрос выполнен успешно
                        this.product_categorys = response.data;
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