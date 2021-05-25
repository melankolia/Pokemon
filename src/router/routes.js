const Home = () => import('@/views/Home.vue');
const About = () => import('@/views/About.vue');
const Detail = () => import('@/views/PokemonDetail');

import { HOME, ABOUT, DETAIL } from "./name.types";

export const configRoutes = () => {
    return [
        {
          path: '/',
          name: HOME.ROOT,
          component: Home
        },
        {
          path: '/about',
          name: ABOUT.ROOT,
          component: About
        },
        {
          path: '/pokemon',
          component: {
            render(c) {
              return c("router-view")
            },
          },
          children: [
            {
              path: ':id',
              name: DETAIL.ROOT,
              component: Detail
            }
          ]
        }
      ]
}