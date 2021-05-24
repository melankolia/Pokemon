const Home = () => import('@/views/Home.vue');
const About = () => import('@/views/About.vue');

import { HOME, ABOUT } from "./name.types";

export const configRoutes = () => {
    return [
        {
          path: '/',
          name: HOME,
          component: Home
        },
        {
          path: '/about',
          name: ABOUT,
          component: About
        }
      ]
}