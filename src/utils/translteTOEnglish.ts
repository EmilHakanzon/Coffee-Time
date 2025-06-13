type CoffeeTranslation = {
  description: string;
  ingredients: string;
};

const coffeeTranslations: Record<string, CoffeeTranslation> = {
  "black coffee": {
    description:
      "Black coffee is as simple as it gets with ground coffee beans steeped in hot water, served warm. And if you want to sound fancy, you can call black coffee by its proper name: café noir.",
    ingredients: "Coffee",
  },
  latte: {
    description:
      "As the most popular coffee drink out there, a latte consists of a shot of espresso and steamed milk with just a hint of foam. It can be ordered plain or flavored with anything from vanilla to pumpkin spices.",
    ingredients: "Espresso, Steamed milk",
  },
  "caramel latte": {
    description:
      "If you like lattes with a special flavor, caramel latte might be the best option to give you an experience of the natural sweetness and creaminess of steamed milk and caramel.",
    ingredients: "Espresso, Steamed milk, Caramel syrup",
  },
  cappuccino: {
    description:
      "Cappuccino is a latte made with more foam than steamed milk, often with a sprinkle of cocoa powder or cinnamon on top. Sometimes you can find variations that use cream instead of milk or those that add flavors as well.",
    ingredients: "Espresso, Steamed milk, Foam",
  },
  americano: {
    description:
      "With a similar taste to black coffee, an Americano consists of an espresso shot diluted with hot water.",
    ingredients: "Espresso, Hot water",
  },
  espresso: {
    description:
      "An espresso shot can be served on its own or used as the base for most coffee drinks, like latte and macchiato.",
    ingredients: "Espresso",
  },
  macchiato: {
    description:
      "The macchiato is another espresso-based drink that has a small amount of foam on top. It’s the happy middle ground between a cappuccino and a doppio.",
    ingredients: "Espresso, Foam",
  },
  mocha: {
    description:
      "For all the chocolate lovers out there, you’ll fall in love with a mocha. Mocha is a chocolate-espresso drink with steamed milk and foam.",
    ingredients: "Espresso, Steamed milk, Chocolate",
  },
  "hot chocolate": {
    description:
      "On cold winter days, a cup of hot chocolate makes you feel cozy and happy. It also makes you feel good because it contains energy-boosting caffeine.",
    ingredients: "Chocolate, Milk",
  },
  "chai latte": {
    description:
      "If you’re looking for a flavorful hot drink in the middle of winter, go for a chai latte. The combination of cardamom and cinnamon gives a wonderful taste.",
    ingredients: "Tea, Milk, Ginger, Cardamom, Cinnamon",
  },
  "matcha latte": {
    description:
      "Matcha latte is a green, healthy coffee drink with finely ground matcha tea and milk, offering mild sweetness, a unique taste, and a gentle caffeine kick.",
    ingredients: "Matcha powder, Milk, Sugar*",
  },
  "seasonal brew": {
    description:
      "Seasonal coffee with various flavor notes like caramel, fruit, and chocolate.",
    ingredients: "Coffee",
  },
  islatte: {
    description:
      "Iced latte is a refreshing coffee drink made with espresso and cold milk, served over ice. Perfect for warm days!",
    ingredients: "Espresso, Cold milk, Ice",
  },
  "islatte mocha": {
    description:
      "Iced mocha latte is a delicious blend of espresso, cold milk, chocolate, and ice. A perfect treat for chocolate and coffee lovers.",
    ingredients: "Espresso, Cold milk, Chocolate, Ice",
  },
  "frapino caramel": {
    description:
      "Frapino caramel is a sweet and creamy blended iced coffee drink with caramel flavor, perfect for a cool treat.",
    ingredients: "Coffee, Milk, Caramel syrup, Ice",
  },
};

// översätter titlar för att matcha rätt i objektet
function normalizeTitle(title: string) {
  return title.trim().toLowerCase().replace(/\s+/g, " ");
}
// Hämtar engelsk beskrivning för en kaffetyp, annars fallback

export function getEnglishDescription(title: string, fallback: string) {
  return coffeeTranslations[normalizeTitle(title)]?.description || fallback;
}
// Hämtar engelska ingredienser för en kaffetyp, annars fallback

export function getEnglishIngredients(title: string, fallback: string) {
  return coffeeTranslations[normalizeTitle(title)]?.ingredients || fallback;
}
