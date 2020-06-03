declare module 'resources/menu.json' {
  export interface MenuItem {
    type: 'entree' | 'main' | 'dessert';
    name: string;
    price: number;
    description: string;
  }

  export const menu: [MenuItem];
}
