<template>
    <div id="app">
      <nav class="navbar navbar-expand-lg" style="background-color: #50F5F5;">
        <div  class="container-fluid">
              <router-link  onclick=""  class="navbar-brand" id="main" to="/main">Главная</router-link>
          </div>
          <div id="tov1" style="display:none;" class="container-fluid">
              <router-link onclick="" class="navbar-brand" id="tovv" to="/listProduct">Товары</router-link>
          </div>

          <div id="list1" style="display:none;"  class="container-fluid">
            <router-link onclick="" class="navbar-brand" id="listt" to="/listProductCategory">Категории товаров</router-link>
        </div>
          <div v-if="currentUser">
      <router-link to="/profile" class="navbar-brand text-light">
          <div class="enter-font" size="4">
          {{ currentUser.name }}
          </div>
      </router-link>
      <a href @click.prevent="logOut" onclick="localStorage.clear();" class="navbar-brand text-light">
          Выйти
      </a>
      </div>
  <div v-else>
      <router-link to="/login" class="navbar-brand text-light">
          Войти
      </router-link>
  </div>
      </nav>
    </div>
  </template>
  
  <script type="text/javascript">




     export default {
      name: "NavBar",
      data() {
          return {};
  
      },
      computed: { // вычисляемые свойства
          currentUser() {
            
           // console.log(this.$store.state.auth.user.name);
              return this.$store.state.auth.user;
          }
      },
      methods: {
        abc(){
            var x ='true';
            if(localStorage.getItem('admin')==x){
            document.getElementById('tov1').style.display = "";
            document.getElementById('list1').style.display ="";
            }

        },
          logOut() {
              this.$store.dispatch('auth/logout'); // обращаемся к методу logout, который определён в auth.service.js
              window.location.href = '/login'; // // Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
          }
      },
      mounted() { // загружаем данные пользователей. Обработчик mounted() вызывается после монтирования экземпляра шаблона
              this.abc();
          }
  };
  </script>
  
  <style>
    .item {
      margin-right: 5px;
    }
  </style>