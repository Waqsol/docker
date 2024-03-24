<template>
    <div v-if="this.product_category">
        <h4>Пользователь</h4>
        <div v-if="!submitted">
            <form @submit="updateProductCategory">
                <input type="text" name="name" id="name" placeholder="Название категории" required v-model="product_category.name">
                <input type="text" name="priority" id="priority" placeholder="Приоритет категории" required v-model="product_category.priority">
                <input type="submit" value="Обновить">
            </form>
            <button v-on:click="deleteProductCategory()">Удалить</button>
        </div>
        <div v-else>
            <h4>Вы успешно обновили запись</h4>
            <router-link to="/listProductCategory">Вернуться к списку категорий</router-link>
        </div>
    </div>
    <div v-else>
        <br>
        <p>Выберите категорию</p>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "ProductCategory-details",
        props: ['id'],
        data() {
            return {
                product_category: null,
                submitted: false
            };
        },
        methods: {
            getProductCategory() {
                http
                    .get("/product_category/" + this.id) // обращаемся к серверу для получения списка пользователей, id взят из входных параметров (props)
                    .then(response => { // запрос выполнен успешно
                        this.product_category = response.data;
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            updateProductCategory(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {

                    name: this.product_category.name,
                    priority: this.product_category.priority

                };

                http
                    .post("/updateProductCategory/" + this.product_category.id, data)
                    .then(() => {
                        this.$router.push('/listProductCategory'); // переходим к списку пользователей
                    })
                    .catch(e => {
                        console.log(e);
                    });
                this.submitted = true;
            },
            deleteProductCategory() {
                http
                    .post("/deleteProductCategory/" + this.product_category.id)
                    .then(() => {
                        // переходим к списку пользователей (переход по ссылкам программно)
                        this.$router.push('/listProductCategory');
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        mounted() { // загружаем данные пользователя
            this.getProductCategory();
        }
    }
</script>