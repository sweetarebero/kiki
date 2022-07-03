export interface ShipmentDetails {
  baseDeliveryCost: number;
  packageDetails: PackageDetails[];
}

export interface PackageDetails {
  id: string;
  weight: number;
  distance: number;
  offerCode: string;
}

export interface PackageDeliveryCost {
  discount: number;
  discountedDeliveryCost: number;
}
