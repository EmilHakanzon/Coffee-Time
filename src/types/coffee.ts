export interface CoffeeType {
  id: string;
  title: string;
  image: string;
  description: string;
  ingredients: string[];
}

export interface CoffeeLog {
  id: string;
  coffeeType: CoffeeType;
  timestamp: Date;
}