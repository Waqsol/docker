<template>
    <div v-if="this.product">
        <h4>Продукт</h4>
        <div v-if="!submitted">
            <form @submit="updateProduct">
                <input type="text" name="name" id="name" placeholder="Название" required v-model="product.name">

                <input type="submit" value="Обновить">
            </form>
            <button v-on:click="deleteProduct()">Удалить</button>
        </div>
        <div v-else>
            <h4>Вы успешно обновили запись</h4>
            <router-link to="/listProducts">Вернуться к списку продуктов</router-link>
        </div>
    </div>
    <div v-else>
        <br>
        <p>Выберите продукт</p>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "product-details",
        props: ['id'],
        data() {
            return {
                product: null,
                submitted: false
            };
        },
        methods: {
            getProduct() {
                http
                    .get("/Product/" + this.id) // обращаемся к серверу для получения списка пользователей, id взят из входных параметров (props)
                    .then(response => { // запрос выполнен успешно
                        this.product = response.data;
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            updateProduct(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {

                    name: this.product.name,
                    category_id: this.product.category_id,
                    bonus_price: this.product.bonus_price,
                    price: this.product.price,
                    discription: this.product.discription,
                    link: this.product.link,

                };

                http
                    .post("/updateProduct/" + this.product.id, data)
                    .then(() => {
                        this.$router.push('/listProduct'); // переходим к списку пользователей
                    })
                    .catch(e => {
                        console.log(e);
                    });
                this.submitted = true;
            },
            deleteProduct() {
                http
                    .post("/deleteProduct/" + this.product.id)
                    .then(() => {
                        // переходим к списку пользователей (переход по ссылкам программно)
                        this.$router.push('/listProduct');
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        mounted() { // загружаем данные пользователя
            this.getProduct();
        }
    }
</script>