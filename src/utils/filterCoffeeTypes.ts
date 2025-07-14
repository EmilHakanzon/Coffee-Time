import type { CoffeeType } from "@/src/types/coffee";
// Enkel version: returnerar alla kaffe-typer utan att filtrera bort några iced coffee
export function getFilteredCoffeeTypes(
  hotCoffees: CoffeeType[],
  icedCoffees: CoffeeType[],
  category: "hot" | "iced",
) {
  return category === "hot" ? hotCoffees : icedCoffees;
}
