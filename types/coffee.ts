export interface CoffeeType {
  id: string;
  name: string;
  emoji: string;
}

export interface CoffeeLog {
  id: string;
  coffeeType: CoffeeType;
  timestamp: Date;
}