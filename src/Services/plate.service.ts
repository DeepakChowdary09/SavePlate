import { Plate } from "@/types/plate";

const plates: Plate[] = [];

export function createPlate(plate: Plate): Plate {
  plates.push(plate);
  return plate;
}

export function getPlates(): Plate[] {
  return plates;
}
