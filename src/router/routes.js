const Home = () => import('@/views/Home.vue');
const Pokedex = () => import('@/views/Pokedex');
const Detail = () => import('@/views/PokemonDetail');

import { HOME, POKEDEX, DETAIL } from "./name.types";

export const configRoutes = () => {
  return [
    {
      path: '/',
      name: HOME.ROOT,
      component: Home,
      meta: {
        index: 0
      }
    },
    {
      path: '/pokedex',
      name: POKEDEX.ROOT,
      component: Pokedex,
      meta: {
        index: 1
      }
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
          component: Detail,
          meta: {
            index: 1
          }
        }
      ]
    }
  ]
}