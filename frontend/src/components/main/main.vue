<template class="bg-ex-animation">
    <div >
        <br>
      <nav class="navbar navbar-expand-lg">

          <!-- <div class="container-fluid">
            <router-link class="navbar-brand" to="/listProductCategory">Категории</router-link>
        </div> -->
        <div id="myLink" class="container-fluid" transition="top: 0px"></div>
        
 
      </nav>

      <div  id="myOrder" style="background: linear-gradient(45deg, #EECFBA, #C5DDE8); ">
       <div style=" margin: 0;height: 100%;overflow: hidden;font-family: 'Roboto' !important; color: black; font-size: 200%;"> Корзина заказа</div>
       <div id="myOrderProduct"></div>
      <div id="downPanelOrder">
        <div id="totalPrice"></div>
        <router-link class="navbar-brand" to="./Order_shop"><button id="bye" class="btn btn-outline-success" >Перейти к оплате</button></router-link>
      <!-- <router-link id="bye" :to="{
                        name: 'orderProd',
                        params: { mas: V }
                    }" >Перейти к оплате</router-link> -->
    </div>

      </div>
    </div>
    <div>
                <div id="app">
             <navbar/>
            <router-view />
             </div>
            

      <ul >
              <li v-for="(product_category, index) in product_categorys" :key="index" >

                  <a   :name=product_category.name :id=product_category.id style=" text-transform: uppercase;  border-top: 180px solid transparent; padding: 5%px; background-clip: padding-box;" >
                      {{product_category.name}}

                  </a>
              </li>
          </ul>
    </div>
  </template>
  
  <script type="text/javascript">
        let V = [];
        var check=0;
        var orderPrice = 0;
        var  bbonus=0;

        window.onscroll = function() {scrollFunction()};

            function scrollFunction() {
            if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
                document.getElementById("myLink").style.top = "0";
            } else {
                document.getElementById("myLink").style.top = "10%";
            }
            }

    
     
      import http from "../../http-common"; 

      export default {
        
        


        name: "MyMain",
          data() { // данные компонента (определение переменных)
              return {
                  product_categorys: [],
                  products: new Object,
                  orderedId: [],
                  user: null,
              };
          },
          
          methods: {
             // методы компонента

             
            getAllProductCategory(id_cat){
                http
                                .get("/Product/category_id/"+id_cat) // обращаемся к серверу для получения списка пользователей
                                .then(response => {
                               
                                    var ll = response.data.length
                             
                                    for(var j = 0;j<ll;j++){
                                        var div3 = document.getElementById(id_cat);
                                        div3.style.width="80%"
                                        var el3    = document.createElement('div');
                                        el3.name = response.data[j].name+"_div_prod";
                                        var aa=document.createElement('div');
                                        aa.style="color: #d54d7b; font-family: «Great Vibes», cursive; text-align: center; font-weight: 900;";
                                        aa.appendChild(document.createTextNode(response.data[j].name));
                                        //el3.title = ''+response.data[j].name;
                                        el3.appendChild(aa);
                                        
                                            var discription_prod = document.createElement('div');
                                            discription_prod.name = response.data[j].name+"_div_prod_discription";
                                            discription_prod.appendChild(document.createTextNode(response.data[j].discription));
                                            discription_prod.style="color: #d54d7b; font-family: «Great Vibes», cursive; font-size: 20px;   margin-bottom: 20px; margin-top: 50px; text-align: center; text-shadow: 0 10px 10px #fff; "

                                            var image = document.createElement('img');
                                            
                                            image.id = response.data[j].name+"_div_prod_img";
                                            image.src = this.globalVariables.serverUrl + response.data[j].link;
                                            image.style="display: block;margin: 0 auto;width: 50%;height: 50%;";
                                            if (response.data[j].category_id==3){
                                                image.style="display: block;margin: 0 auto;width: 20%;height: 20%;";

                                            }

                                            var price = document.createElement('div');
                                            price.name = response.data[j].name+"_div_prod_price";
                                            price.style="color: #111; font-family: ‘Open Sans’, sans-serif; font-size: 30px; font-weight: 300; line-height: 32px;  text-align: center;";
                                            price.appendChild(document.createTextNode(response.data[j].price+" руб."));

                                            var buttonz = document.createElement('button');
                                            buttonz.name = response.data[j].name+"_div_prod_button";
                                            buttonz.type="button";
                                            buttonz.style="color: #fff; border-radius: 25px;  font-family: 'Lato', sans-serif;margin-bottom: 100px;margin-top: 20px;    background: linear-gradient(to top left, powderblue, pink);    width: 100%;text-align: center;";
                                            buttonz.appendChild(document.createTextNode("Добавить в корзину"));

                                            buttonz.onclick = (function() {
                                         var currentname = response.data[j].name;
                                         var currentprice = response.data[j].price;
                                         var currentId = response.data[j].id;
                                         var bonuss=response.data[j].bonus_price;
                                    return function() { 
                                        bbonus=bbonus+bonuss;
                                        localStorage.setItem('bonus', bbonus);
                                        var totalPricee = document.getElementById("totalPrice");
                                                check=check+1;
                                                V.push(currentId);
                                                orderPrice = 0 + orderPrice + currentprice;
                                              
                                                totalPricee.textContent = orderPrice;

                                                var myOrderDiv = document.getElementById("myOrderProduct");
                                                myOrderDiv.style="background: linear-gradient(45deg, #EECFBA, #C5DDE8);";
                                                var orderProd = document.createElement('div');



                                                orderProd.id = currentId;
                                                orderProd.className = "ordered";
                                                orderProd.appendChild(document.createTextNode(currentname+" "+currentprice));

                                                var delOrderProd = document.createElement('button');
                                                delOrderProd.type="button";
                                                delOrderProd.className=" btn btn-outline-danger";
                                                delOrderProd.id=check;
                                                delOrderProd.onclick = function (){
                                                    localStorage.removeItem('order'+delOrderProd.id);

                                                    var needId = V.indexOf(currentId);
                                                    
                                                    V.splice(needId,1);
                                                    
                                                    orderPrice = 0 +  orderPrice - currentprice;
                                                    totalPricee.textContent = orderPrice;
                                                    localStorage.setItem('allmoney', totalPricee.textContent);
                                                    orderProd.remove();
                                                }
                                                delOrderProd.appendChild(document.createTextNode("удалить"));
                                                orderProd.appendChild(delOrderProd);
                                                myOrderDiv.appendChild(orderProd);
                                                localStorage.setItem('allmoney', totalPricee.textContent);
                                    }
                                    })();
                                        el3.appendChild(image);
                                        el3.appendChild(discription_prod);
                                        el3.appendChild(price);
                                        el3.appendChild(buttonz);

                                        div3.appendChild(el3);
                                    }
                                    

                                })
                                .catch(e => { console.log(e);});
              },
              getProductCategory() {
                  http
                      .get("/product_categorys") // обращаемся к серверу для получения списка пользователей
                      .then(response => { // запрос выполнен успешно
                          this.product_categorys = response.data;
                          
                          this.product_categorys.sort(function (a, b) {
                                    return a.priority - b.priority;
                                })
                           for(var i = 0, l = this.product_categorys.length;i<l;i++){
                                var div = document.getElementById('myLink');
                                var ee    = document.createElement('img');
                                var iakor    = document.createElement('a');

                                iakor.href = '#'+this.product_categorys[i].name;
                                
                                //console.log(this.product_categorys[i].link);
                                ee.src = this.globalVariables.serverUrl + this.product_categorys[i].link;
       

                                //ee.appendChild(document.createTextNode('ссылка'));
                                iakor.appendChild(ee);
                                div.appendChild(iakor);

                               this.getAllProductCategory(this.product_categorys[i].id);

                           }       
                      })
                      .catch(e => { // запрос выполнен с ошибкой
                          console.log(e);
                      });
                      document.getElementById("bye").addEventListener('click', function () {
                                        document.getElementById('totalPrice').textContent='';
                                        orderPrice = 0;
                                         //window.location.href = 'orderProd';    
                               
                                                 //   this.user = this.$store.state.auth.user;
                                               

                                        //localStorage.setItem('prod', JSON.stringify(myOrder));
                                        
                                        if(this.user == null){
                                            var dateNow =  new Date(Date.now());
                                            var year = dateNow.getFullYear();
                                            var month = dateNow.getMonth();
                                            var day = dateNow.getDate();
                                            var dataOrder = {
                                                    date: ""+year+"-"+month+"-"+day,
                                                    user_id: 1,
                                                };
                                            http
                                                .post("/addOrder", dataOrder)
                                                .then(response => { // запрос выполнился успешно
                                                    
                                                    for(var j = 0;j<V.length;j++){
                                                        var dataPO = {
                                                            product_id: V[j],
                                                            order_id: response.data.id
                                                        }
                                                    http
                                                            .post("/addOrderProduct", dataPO)
                                                            .then(response => { // запрос выполнился успешно
                                                               console.log(response);
                                                            })
                                                            .catch(e => { // при выполнении запроса возникли ошибки
                                                                console.log(e);
                                                            });



                                                        }
                                                })
                                                .catch(e => { // при выполнении запроса возникли ошибки
                                                    console.log(e);
                                                });


                                        }
                                         else{
                                            window.location.href = 'login-user'; 
                                         }
                                    })
                               
              }, 
              
                       
          },
         
          mounted() { // загружаем данные пользователей. Обработчик mounted() вызывается после монтирования экземпляра шаблона
              this.getProductCategory();
          }
      }
      
  </script>
  
<style>
#myLink{
    background-color: #333; /* Black background color */
    position: fixed; /* Make it stick/fixed */
    top: 12%; /* Hide the navbar 50 px outside of the top view */
    width: 100%; /* Full width */
    transition: top 0.3s; /* Transition effect when sliding down (and up) */
}
#myOrder{
    background-color: rgb(255, 255, 255); /* Black background color */
    position: fixed; /* Make it stick/fixed */
    top: 30%; /* Hide the navbar 50 px outside of the top view */
    left: 85%;
    width: 25%; /* Full width */
    transition: top 0.3s; /* Transition effect when sliding down (and up) */
}

ul{

top: 50%;

}
li a {
   display: inline-block;
   text-decoration: none;
   text-transform: uppercase;
   letter-spacing: 1px;
   margin: 15px 25px;
   padding: 15px 20px;
   font-size: 20px;
   font-weight: bold;
   font-family: 'Montserrat', sans-serif;
   transition: 0.4s ease-in-out;
}

li  a {
    border-radius: 10px;
   background: #E8CCB5;
   color: #B05151;
   padding: 15px 30px;
 
   box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.3);
}

 li  a:before, a:after {
    content: "";
   display: inline-block;
   position: absolute;
   top: calc(50% - 5px);
   /* width: 30%; */
   height: 10px;
   border-radius: 50%;
   background: #F58262;
   box-shadow: inset 0 -2px 0 #B05151;
   opacity: 0;
   transition: .5s ease-in-out;
}


body {
  background: url(snow.gif); /* Путь к картинке */

}


</style>