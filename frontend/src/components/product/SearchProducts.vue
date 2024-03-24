<template>
    <div>
        <h4>Поиск пользователей по имени</h4>
        <form @submit="searchProductsByName">
            <input type="text" name="name" id="name" placeholder="ФИО" required v-model="name">
            <input type="submit" value="Поиск">
        </form>

        <ul class="search-result">
            <li v-for="(product, index) in products" :key="index">
                {{product.name}}
            </li>
        </ul>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "SearchProducts.vue",
        data() {
            return {
                name: "",
                products: []
            };
        },
        methods: {
            searchProductsByName(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                http
                    .get("/product/name/" + this.name)
                    .then(response => {
                        this.products = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        }
    };
</script>