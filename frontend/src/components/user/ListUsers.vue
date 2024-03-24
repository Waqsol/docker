<template>
    <div>
        <h4>Список пользователей</h4>
        <!-- Определение ссылок -->
        <router-link class="item" to="/addUser">Добавить пользователя</router-link>
        <router-link class="item" to="/searchUsers">Поиск пользователя</router-link>
        <ul>
            <!-- Вывод списка пользователей -->
            <li v-for="(user, index) in users" :key="index">
                <!-- name - Именованный маршрут: будет осуществляться переход на страницу с просмотром данных о пользователе -->
                <!-- Ссылка на user определена в файле router.js -->
                <!-- По маршруту user подгружается компонент User.vue -->
                <!-- в params указываются параметры, которые передаютс компоненту-->
                <!--Двоеточие перед to указыает, что значение атрибута изменяющееся (динамическое) -->
                <router-link :to="{
                        name: 'user-details',
                        params: { id: user.id }
                    }">
                    {{user.name}}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import http from "../../http-common"; // подключение объекта, который позволяет отправлять запросы серверу
    export default {
        name: "ListUsers", // Имя шаблона
        data() { // данные компонента (определение переменных)
            return {
                users: []
            };
        },
        methods: { // методы компонента
            getUsers() {
                http
                    .get("/users") // обращаемся к серверу для получения списка пользователей
                    .then(response => { // запрос выполнен успешно
                        this.users = response.data;
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            }
        },
        mounted() { // загружаем данные пользователей. Обработчик mounted() вызывается после монтирования экземпляра шаблона
            this.getUsers();
        }
    }
</script>

<style>
    .item {
        margin-left: 5px;
    }
</style>