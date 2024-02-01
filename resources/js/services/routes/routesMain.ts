//import {useAuthentication} from "../store/authStore";


import Kalendar from '../../components/kalendar/Kalendar.vue'
import Arhiva from '../../components/arhiva/Arhiva.vue'

//import Auth from '../../components/body/auth/Auth.vue'


export default  [
   /* {
        path: "/auth",
        component: Auth,
        name: 'Auth',
        beforeEnter: (to, from, next) => {
            const store = useAuthentication();
            if (store.getToken ) {
                next('/');
            }else {
                next();
            }
        },
    },
*/
    {
        path: "/kalendar",
        name: "Kalendar",
        component: Kalendar,
    },
    {
        path: "/arhiva",
        name: "Arhiva",
        component: Arhiva,
    },

];
