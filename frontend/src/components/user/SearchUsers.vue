<template>
    <div>
        <h4>Поиск пользователей по имени</h4>
        <form @submit="searchUsersByName">
            <input type="text" name="name" id="name" placeholder="Введите название продукта" required v-model="name">
            <input type="submit" value="Поиск">
        </form>

        <ul class="search-result">
            <li v-for="(user, index) in users" :key="index">
                {{user.name}}
            </li>
        </ul>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "SearchUsers.vue",
        data() {
            return {
                name: "",
                users: []
            };
        },
        methods: {
            searchUsersByName(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                http
                    .get("/user/name/" + this.name)
                    .then(response => {
                        this.users = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        }
    };
</script>