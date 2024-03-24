import Register from "./components/authorization/Register";
import { createWebHistory, createRouter } from "vue-router";
// импорт компонентов

import AddProduct from "./components/product/AddProduct";
import Product from "./components/product/Product";
import SearchProducts from "./components/product/SearchProducts";
import Login from "./components/authorization/Login";
import Profile from "./components/authorization/Profile";
import ProductCategory from "./components/product_category/ProductCategory";
import ListProductCategory from "./components/product_category/ListProductCategory";
import AddProductCategory from "./components/product_category/AddProductCategory";
import ListProducts from "./components/product/ListProduct";
import Main from "./components/main/main";
import Order_shop from "./components/main/Order_shop";


// определяем маршруты
const routes = [
    {
        
        path: "/Order_shop",
        name: "Order_shop",
        component: Order_shop,
        meta: {
            title: "Реквизиты"
        }
    },
    {
        
        path: "/register",
        name: "register-user",
        component: Register,
        meta: {
            title: "Регистрация"
        }
    },
    {
        path: "/product_category/:id",
        name: "product_category",
        component: ProductCategory,
        props: true, // указываем, что компонент User.vue может принимать параметры в адресной строке, например, в path указан id
        meta: {
            title: "Данные по категории"
        }
    },
    {
        path: "/addProductCategory",
        name: "add-product_category",
        component: AddProductCategory,
        meta: {
            title: "Добавление пользователя"
        }
    },
    {
        path: "/listProductCategory",
        name: "product_categorys",
        alias: "/product_categorys", // указание дополнительного маршрута
        component: ListProductCategory,
        props: true, // указываем, что компонент User.vue может принимать параметры в адресной строке, например, в path указан id
        meta: {
            title: "Данные по категории"
        }
    },
    {
        path: "/main",
        name: "my_main",
        component: Main,
        props: true, // указываем, что компонент User.vue может принимать параметры в адресной строке, например, в path указан id
        meta: {
            title: "Pizza"  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        }
    },
    {
        path: "/listProduct", // указание маршрута, по которому будем переходить к списку пользователей
        name: "products", // имя маршрута
        alias: "/products", // указание дополнительного маршрута
        component: ListProducts, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Список пользователей"
        }
    },
    {
        path: "/product/:id",
        name: "product-details",
        component: Product,
        props: true, // указываем, что компонент User.vue может принимать параметры в адресной строке, например, в path указан id
        meta: {
            title: "Данные пользователя"
        }
    },
    {
        path: "/addProduct",
        name: "add-product",
        component: AddProduct,
        meta: {
            title: "Добавление пользователя"
        }
    },
    {
        path: "/searchProducts",
        name: "search-products",
        component: SearchProducts,
        meta: {
            title: "Поиск пользователей"
        }
    },
    {
        path: "/login",
        name: "login-user",
        component: Login,
        meta: {
            title: "Вход в систему"
        }
    },
  
    {
        path: "/profile",
        name: "profile-user",
        component: Profile,
        meta: {
            title: "Профиль пользователя"
        }
    }
];

const router = createRouter({
    history: createWebHistory(), // указываем, что будет создаваться история посещений веб-страниц
    routes, // подключаем маршрутизацию
});

// указание заголовка компонентам (тега title), заголовки определены в meta
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title}`;
    next();
});

export default router;