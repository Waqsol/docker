<template class="bg-ex-animation">
    <div>
        <br>
      <nav class="navbar navbar-expand-lg">

        <div id="myLink" class="container-fluid" transition="top: 0px"></div>
        
      </nav>

    </div>

 <div style="text-align: center; font-size:50px;">Ваш заказ</div>
 
 <div  id="allprod"> </div> 

 <input class="form-control" style="text-align: center; font-size:20px; box-sizing: border-box;  " id="checkFIO" value="" placeholder="Введите ФИО" required >
 <br> <br> <br>
 <input class="form-control" style="text-align: center; font-size:20px; box-sizing: border-box;  " id="checkADR" value="" placeholder="Введите ваш адрес"  required>
 <br> <br> <br>
 <input class="form-control" style="text-align: center; font-size:20px; box-sizing: border-box;  " id="checkphone" value="" placeholder="Введите ваш телефон" required>
 <br> <br> <br>
 <input class="form-control" style="text-align: center; font-size:20px; box-sizing: border-box; " id="checkMoney" value="Сумма доставки составляет" >
 <br> <br> <br>
 <input class="form-control" style=" text-align: center; font-size:20px; box-sizing: border-box; " id="BONUS" value="Сумма имеющихся бонусов" >
 <br> <br> <br>
 <input class="form-control" style=" text-align: center; font-size:20px; box-sizing: border-box; " id="BONUS_SPIS" value=""  placeholder="Напиши, сколько вы бонусов хотите списать">
 <br> <br> <br>
 <button class="btn btn-success" style=" font-size:50px;" id="dostavka" >Принять</button>
  </template>
  
  <script type="text/javascript">
import http from "../../http-common";


      // function append_to_div(){
      //  let i=0;
       // while(i<localStorage.length){
       //    document.getElementById('allprod').appendChild(localStorage.key(i)); 
        //    i=i+1;
       //     console.log(localStorage.key(i));
       // }
        
      // }




      export default {
        
        


        name: "OrderShop",
          data() { // данные компонента (определение переменных)
              return {
                
              };
          },
          
          methods: {
            currentUser() {
           document.getElementById('checkMoney').value="Сумма заказа составляет "+localStorage.getItem('allmoney');
           document.getElementById('checkFIO').value="Ваше имя "+localStorage.getItem('name');
           document.getElementById('BONUS').value="Сумма имеющихся бонусов "+localStorage.getItem('bonus_money');
           document.getElementById("checkMoney").readOnly = true;
           document.getElementById("BONUS").readOnly = true;
           document.querySelector("#dostavka").onclick = function(){
              localStorage.setItem('bonus_money',parseInt(localStorage.getItem('bonus_money'))+parseInt(localStorage.getItem('bonus')))
                var data = {
                   bonus_money: parseInt(localStorage.getItem('bonus_money'))+parseInt(localStorage.getItem('bonus')),
                };
               http
                   .post("/updateUser/" + localStorage.getItem('id'), data)
                   .then(() => {
                    window.location.href = '/main';
                  })
                   .catch(e => {
                       console.log(e);
                  });
                this.submitted = true;

    }

                      }         
                    },

             // методы компонента
            
         
          mounted() { // загружаем данные пользователей. Обработчик mounted() вызывается после монтирования экземпляра шаблона
            this.currentUser();
          }
      }
      
      
  </script>
  
