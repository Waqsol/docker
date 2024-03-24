<template>
    <div>
        <h4>Добавление категории</h4>
        <div v-if="!submitted">
            <!--В @submit указывается обработчик, который выполнится после нажатия на кнопку "Добавить"
            Обработчик addProductCategory определён в script-->
            <form @submit="addProductCategory">
                <!--v-model - директива для связывания данных с элементами.
                Связь происходит при помощи переменных, которые определены в data()-->
                <input type="text" name="name" id="name" placeholder="Название" required v-model="product_category.name">
                <input type="text" name="priority" id="priority" placeholder="Позиция" required v-model="product_category.priority">
                
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
                Обработчик newProductCategory определён в script-->
                <button v-on:click="newProductCategory">Добавить нового пользователя</button>
            </div>
            <div>
                <router-link to="/listProductCategory">Вернуться к списку пользователей</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "addProductCategory",
        data() {
            return {
                product_category: {
                    name: "",
                    priority: 0,
                    link: "",
                },
                submitted: false
            };
        },
        methods: {
            addProductCategory(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                let formData = new FormData();
                formData.append('name', this.product_category.name);
                formData.append('priority', this.product_category.category_id);
                formData.append('link', this.product_category.link);

                http
                    .post("/addProductCategory", formData, {
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
                this.product_category.link = this.$refs.file.files[0];
            }
        }
    }





</script>