<template>
    <div>
        <h4>Добавление пользователя</h4>
        <div v-if="!submitted">
            <!--В @submit указывается обработчик, который выполнится после нажатия на кнопку "Добавить"
            Обработчик addProduct определён в script-->
            <form @submit="addProduct">
                <!--v-model - директива для связывания данных с элементами.
                Связь происходит при помощи переменных, которые определены в data()-->
                <input type="text" name="name" id="name" placeholder="Название" required v-model="product.name">
                <input type="text" name="category_id" id="category_id" placeholder="Категория" required v-model="product.category_id">
                <input type="text" name="bonus_price" id="bonus_price" placeholder="Бонусная цена" required v-model="product.bonus_price">
                <input type="text" name="price" id="price" placeholder="Цена" required v-model="product.price">
                <input type="text" name="discription" id="discription" placeholder="Описание" required v-model="product.discription">
                <div class="form-group mb-3">
                    <input type="file" id="link" ref="file" class="form-control" accept=".png" required v-on:change="handleFileUpload()"/>
                </div>
                <input type="submit" value="Добавить">
            </form>
        </div>
        <div v-else>
            <h4>Вы успешно добавили запись</h4>
            <div>
                <!--В v-on:click указывается обработчик, который выполниться после нажатия на кнопку "Добавить нового пользователя"
                Обработчик newProduct определён в script-->
                <button v-on:click="newProduct">Добавить нового пользователя</button>
            </div>
            <div>
                <router-link to="/listProduct">Вернуться к списку пользователей</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "addProduct",
        data() {
            return {
                product: {
                    name: "",
                    category_id: 1,
                    bonus_price: 0,
                    price: 0,
                    discription: "",
                    link: "",
                },
                submitted: false
            };
        },
        methods: {
            addProduct(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                let formData = new FormData();
                formData.append('name', this.product.name);
                formData.append('category_id', this.product.category_id);
                formData.append('bonus_price', this.product.bonus_price);
                formData.append('price', this.product.price);
                formData.append('discription', this.product.discription);
                formData.append('link', this.product.link);

                http
                    .post("/addProduct", formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then(() => { // запрос выполнился успешно
                        this.message = "Добавление записи выполнено успешно"
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                       // this.message = "Запись не добавлена в базу данных, повторите попытку или обратитесь к администратору для выяснения причины ошибки";
                    });
                this.submitted = true;
            },
            handleFileUpload(){
                this.product.link = this.$refs.file.files[0];
            }
        }
    }





</script>