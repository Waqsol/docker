import http from "../http-common";

function login(user) {
    var data = {
        name: user.name,
        password: user.password,
        address:user.address,
        bonus_money:user.bonus_money
        
    };
    return http
            .post("/login", data)
            .then(response => {
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data)); // записываем данные пользователя в локальное хранилище, которое хранится в браузере
            }
            return response.data;
        });

}

function logout() {
    localStorage.removeItem('user'); // при нажатии кнопки "Выйти" удаляем данные пользователя из локального хранилища
}

function register(user) {
    //console.log(user);
    var data = {
        name: user.name,
        address: "0",
        bonus_money: 0,
        password: user.password,

    };
    //console.log(data);
    return http.post("/register", data);
}

export default {
    login: login,
    logout: logout,
    register: register
};