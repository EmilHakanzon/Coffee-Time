import { useEffect, useState } from "react";
import { CoffeeType } from "../types/coffee";

export function useCoffeeTypes() {
  const [hotCoffees, setHotCoffees] = useState<CoffeeType[]>([]);
  const [icedCoffees, setIcedCoffees] = useState<CoffeeType[]>([]);
  const [loading, setLoading] = useState(true);

  // hot kaffe-typer

  const HOT_COFFEES: CoffeeType[] = [
    {
      id: 0,
      title: "Black Coffee",
      description:
        "Black coffee is as simple as it gets with ground coffee beans steeped in hot water, served warm. Also called café noir.",
      image:
        "https://github.com/EmilHakanzon/Coffee-Time/raw/master/assets/coffeeblack.png",
      ingredients: ["Coffee", "Hot water"],
    },
    {
      id: 1,
      title: "Espresso",
      description:
        "A strong, concentrated coffee made by forcing hot water through finely ground coffee beans.",
      image:
        "https://github.com/EmilHakanzon/Coffee-Time/raw/master/assets/coffeeblack.png",
      ingredients: ["Espresso"],
    },
    {
      id: 2,
      title: "Cappuccino",
      description:
        "Espresso with steamed milk and a thick layer of milk foam on top.",
      image:
        "https://github.com/EmilHakanzon/Coffee-Time/raw/master/assets/coffeeblack.png",
      ingredients: ["Espresso", "Steamed milk", "Foamed milk"],
    },
    {
      id: 3,
      title: "Americano",
      description:
        "Espresso diluted with hot water for a lighter, larger coffee.",
      image:
        "https://github.com/EmilHakanzon/Coffee-Time/raw/master/assets/coffeeblack.png",
      ingredients: ["Espresso", "Hot water"],
    },
    {
      id: 4,
      title: "Latte",
      description:
        "Espresso with lots of steamed milk and a small amount of foam.",
      image:
        "https://github.com/EmilHakanzon/Coffee-Time/raw/master/assets/coffeeblack.png",
      ingredients: ["Espresso", "Steamed milk", "Foamed milk"],
    },
    {
      id: 5,
      title: "Macchiato",
      description: "Espresso topped with a small amount of foamed milk.",
      image:
        "https://github.com/EmilHakanzon/Coffee-Time/raw/master/assets/coffeeblack.png",
      ingredients: ["Espresso", "Foamed milk"],
    },
    {
      id: 6,
      title: "Mocha",
      description:
        "Espresso with chocolate syrup, steamed milk, and whipped cream.",
      image:
        "https://github.com/EmilHakanzon/Coffee-Time/raw/master/assets/coffeeblack.png",
      ingredients: [
        "Espresso",
        "Chocolate syrup",
        "Steamed milk",
        "Whipped cream",
      ],
    },
    {
      id: 7,
      title: "Caramel Latte",
      description: "Latte with caramel syrup for a sweet, rich flavor.",
      image:
        "https://github.com/EmilHakanzon/Coffee-Time/raw/master/assets/coffeeblack.png",
      ingredients: ["Espresso", "Steamed milk", "Caramel syrup"],
    },
    {
      id: 8,
      title: "Chai Latte",
      description:
        "Spiced tea concentrate with steamed milk, a cozy alternative to coffee.",
      image:
        "https://github.com/EmilHakanzon/Coffee-Time/raw/master/assets/coffeeblack.png",
      ingredients: ["Chai tea concentrate", "Steamed milk"],
    },
    {
      id: 9,
      title: "Matcha Latte",
      description: "Japanese green tea powder whisked with steamed milk.",
      image:
        "https://github.com/EmilHakanzon/Coffee-Time/raw/master/assets/coffeeblack.png",
      ingredients: ["Matcha powder", "Steamed milk"],
    },
  ];

  const ICED_COFFEES: CoffeeType[] = [
    {
      id: 10,
      title: "Iced Coffee",
      description: "Regular brewed coffee served cold over ice.",
      image:
        "https://github.com/EmilHakanzon/Coffee-Time/raw/master/assets/coffeeblack.png",
      ingredients: ["Coffee", "Ice"],
    },
    {
      id: 11,
      title: "Iced Espresso",
      description: "Espresso poured over ice, sometimes with a splash of milk.",
      image:
        "https://github.com/EmilHakanzon/Coffee-Time/raw/master/assets/coffeeblack.png",
      ingredients: ["Espresso", "Ice", "(Optional) Milk"],
    },
    {
      id: 12,
      title: "Cold Brew",
      description:
        "Coffee brewed slowly with cold water for a smooth, less acidic taste.",
      image:
        "https://github.com/EmilHakanzon/Coffee-Time/raw/master/assets/coffeeblack.png",
      ingredients: ["Coffee grounds", "Cold water", "Ice"],
    },
    {
      id: 13,
      title: "Frappuccino",
      description:
        "Blended iced coffee drink, often with milk, sugar, and flavorings.",
      image:
        "https://github.com/EmilHakanzon/Coffee-Time/raw/master/assets/coffeeblack.png",
      ingredients: ["Coffee", "Milk", "Ice", "Sugar", "Flavorings"],
    },
    {
      id: 14,
      title: "Ice Latte",
      description: "Espresso with cold milk and ice.",
      image:
        "https://github.com/EmilHakanzon/Coffee-Time/raw/master/assets/coffeeblack.png",
      ingredients: ["Espresso", "Cold milk", "Ice"],
    },
    {
      id: 15,
      title: "Ice Mocha",
      description: "Espresso, chocolate syrup, cold milk, and ice.",
      image:
        "https://github.com/EmilHakanzon/Coffee-Time/raw/master/assets/coffeeblack.png",
      ingredients: ["Espresso", "Chocolate syrup", "Cold milk", "Ice"],
    },
    {
      id: 16,
      title: "Frapino Caramel",
      description: "Blended iced coffee with caramel flavor.",
      image:
        "https://github.com/EmilHakanzon/Coffee-Time/raw/master/assets/coffeeblack.png",
      ingredients: ["Coffee", "Milk", "Ice", "Caramel syrup"],
    },
    {
      id: 17,
      title: "Mazagran",
      description: "Iced coffee with lemon, sometimes sweetened.",
      image:
        "https://github.com/EmilHakanzon/Coffee-Time/raw/master/assets/coffeeblack.png",
      ingredients: ["Coffee", "Ice", "Lemon", "(Optional) Sugar"],
    },
  ];

  useEffect(() => {
    // Simulera laddning
    setTimeout(() => {
      setHotCoffees(HOT_COFFEES);
      setIcedCoffees(ICED_COFFEES);
      setLoading(false);
    }, 300);
  }, []);

  return { hotCoffees, icedCoffees, loading };
}
