<template>
    <div class="container">
        <header>
            <h3>
                Здраствуйте <strong>{{currentUser.name}}</strong>!
            </h3>
        </header>

        
        <!-- <p>
            <strong>Токен JWT:</strong>
            {{currentUser.accessToken}}
        </p>  -->


        <p>
            <strong>Адресс доставки:</strong>
            {{currentUser.address}}
        </p>
        <p>
            <strong>Накопленные бонусы:</strong>
            {{bonus}}
        </p>
    </div>
</template>
<script>
    export default {
        name: 'ProfileUser',
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
                
            },
            bonus(){
                return localStorage.getItem('bonus_money');
            }
        },
        mounted() {
            if (!this.currentUser) {
                this.$router.push('/login');
            }
        }
    };
</script>