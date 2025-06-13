import { useEffect, useState } from "react";
import { CoffeeType } from "../types/coffee";

export function useCoffeeTypes() {
  const [hotCoffees, setHotCoffees] = useState<CoffeeType[]>([]);
  const [icedCoffees, setIcedCoffees] = useState<CoffeeType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoffees = async () => {
      try {
        setLoading(true);
        const [hotRes, icedRes] = await Promise.all([
          fetch("https://api.sampleapis.com/coffee/hot"),
          fetch("https://api.sampleapis.com/coffee/iced"),
        ]);

        if (!hotRes.ok || !icedRes.ok) {
          throw new Error("Failed to fetch coffee data.");
        }

        const hotData = await hotRes.json();
        const icedData = await icedRes.json();

        const filterIds = [9,13,17, 18, 19, 20, 28, 26, 25 ,300];
        const filteredHot = hotData.filter(
          (item: CoffeeType) => !filterIds.includes(Number(item.id)),
        );
        const filteredIced = icedData.filter(
          (item: CoffeeType) => !filterIds.includes(Number(item.id)),
        );

        setHotCoffees(filteredHot);
        setIcedCoffees(filteredIced);
      } catch (error) {
        console.error("Error fetching coffee types:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoffees();
  }, []);

  return { hotCoffees, icedCoffees, loading };
}
