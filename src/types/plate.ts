export type PlateStatus =
  | "POSTED"
  | "ASSIGNED"
  | "PICKED_UP"
  | "DELIVERED"
  | "EXPIRED";

export interface Plate {
  id: string;
  foodName: string;
  quantity: string;
  pickupBy: string;
  status: PlateStatus;
}
