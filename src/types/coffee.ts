export interface CoffeeType {
  id: number;
  title: string;
  image: string;
  description: string;
  ingredients: string[];
  size?: string; // tillagt för att stödja mängd
  iced?: boolean; // tillagt för att särskilja iced/hot på custom
}

export interface CoffeeLog {
  id: string;
  coffeeType: CoffeeType;
  timestamp: Date;
}
