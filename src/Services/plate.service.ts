import { Plate } from "@/types/plate";

const STORAGE_KEY = "plates";

function load(): Plate[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

function save(plates: Plate[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plates));
}

export function getPlates(): Plate[] {
  return load();
}

export function createPlate(plate: Plate): Plate {
  const plates = load();
  plates.push(plate);
  save(plates);
  return plate;
}

export function acceptPlate(
  plateId: string,
  volunteerId: string
): Plate | null {
  const plates = load();
  const plate = plates.find((p) => p.id === plateId);

  if (!plate || plate.status !== "POSTED") return null;

  plate.status = "ASSIGNED";
  plate.assignedTo = volunteerId;
  save(plates);
  return plate;
}

export function confirmDelivered(
  plateId: string
): Plate | null {
  const plates = load();
  const plate = plates.find((p) => p.id === plateId);

  if (!plate || plate.status !== "ASSIGNED") {
    return null;
  }

  plate.status = "DELIVERED";
  save(plates);
  return plate;
}

