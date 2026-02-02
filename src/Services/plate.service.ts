import {Plate} from "@/types/plate";

const  STORAGE_KEY = "plates"; // table name as a constant  we can change the storage name later , we can do it from here!!

function load(): Plate[]{ // It loads by acting as a Gatekeeper by making sure it sdoes not access the browser's Storage while the code runs on server and it make sure the strings stored in localstorage into a usuable TS array.
  if(typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

}

function save(plates:Plate[]){  // packs" your array into a string format so the browser can store it.
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plates));
}


export function getPlates() : Plate[] { // works as a Read Operation and returns the entire list of donations on the dashboard
  return load();
}

export function createPlate(plate:Plate):Plate { // works as a create operation 
  const plates = load(); // pulls the exixting data 
  plates.push(plate); //adds the new item to the end of the array
  save(plates); // and overwrites the old storage with the updated list.
  return plate;
}

export function acceptPlate ( // It checks two things: Does the plate exist? And is it actually available (POSTED)? If someone else already grabbed it, it returns null to stop the action.


  plateId:string,
  volunteerId : string
): Plate | null {
  const plates = load();
  const plate = plates.find((p) => p.id === plateId);

  if (!plate || plate.status !== "POSTED") return null;

  plate.status = "ASSIGNED";
  plate.assignedTo = volunteerId; // /It updates the Status to ASSIGNED and records who took it (volunteerId).
  save(plates);
  return plate;
}

export function confirmDelivered( // You cannot mark a plate as delivered if it was never assigned to a volunteer. This maintains Data Integrity.
  plateId: string
): Plate | null {
  const plates = load();
  const plate = plates.find((p) => p.id === plateId);

  if (!plate || plate.status !== "ASSIGNED") {
    return null;
  }

  plate.status = "DELIVERED"; //It moves the plate to the final successful state: DELIVERED.
  save(plates);
  return plate;
}

