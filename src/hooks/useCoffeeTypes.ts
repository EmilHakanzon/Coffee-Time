import { useEffect, useState } from "react";
import { CoffeeType } from "../types/coffee";

export function useCoffeeTypes() {
  const [hotCoffees, setHotCoffees] = useState<CoffeeType[]>([]);
  const [icedCoffees, setIcedCoffees] = useState<CoffeeType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch("https://api.sampleapis.com/coffee/hot").then((res) => res.json()),
      fetch("https://api.sampleapis.com/coffee/iced").then((res) => res.json()),
    ]).then(([hotData, icedData]) => {
      // filtera ut id som jag inte vill ha med,
      const filterIds = [17, 18, 19, 20, 28, 26, 25];
      const filteredHot = hotData.filter(
        (item: CoffeeType) => !filterIds.includes(Number(item.id)),
      );
      const filteredIced = icedData.filter(
        (item: CoffeeType) => !filterIds.includes(Number(item.id)),
      );
      setHotCoffees(filteredHot);
      setIcedCoffees(filteredIced);
      setLoading(false);
    });
  }, []);

  return { hotCoffees, icedCoffees, loading };
}
