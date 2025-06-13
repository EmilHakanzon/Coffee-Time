import type { CoffeeType } from "@/src/types/coffee";
// Funktion som filtrerar bort vissa id från hot och iced coffee, samt hanterar specialfall för iced coffee
// för att lägga några id från hot till iced coffee
export function getFilteredCoffeeTypes(
  hotCoffees: CoffeeType[],
  icedCoffees: CoffeeType[],
  category: "hot" | "iced",
) {
  // tar bort id:n samt hanterar ett dubbelId på apple iced coffee
  const excludedIds = [13, 14, 15, 16, 17, 300];
  const appleIcedCoffeeId = 9;

  // Plockar ut extra iced-kaffe från hot, men tar bort id 13 på båda
  const extraIced = hotCoffees.filter(
    (coffee) =>
      excludedIds.includes(Number(coffee.id)) && Number(coffee.id) !== 13,
  );

  // Skapar iced-listan tar bort vissa id och dubbletter, lägger till extra iced
  const icedTypes = [
    ...icedCoffees.filter(
      (coffee) =>
        Number(coffee.id) !== appleIcedCoffeeId &&
        !excludedIds.includes(Number(coffee.id)),
    ),
    ...extraIced,
  ];

  // Returnerar rätt lista beroende på kategori
  return category === "hot"
    ? hotCoffees.filter((coffee) => !excludedIds.includes(Number(coffee.id)))
    : icedTypes;
}
