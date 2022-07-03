import { Item } from "../models/Item";
import { Package } from "../models/Package";
import { Shipment } from "../models/Shipment";
import { ShipmentDetails } from "../models/types";
import { PackageService } from "./PackageService";

export class ShipmentService {
  private packageService: PackageService;

  public constructor(packageService: PackageService) {
    this.packageService = packageService;
  }

  public createShipment(shipmentDetails: ShipmentDetails): Shipment {
    const packages: Package[] = [];

    shipmentDetails.packageDetails.forEach((individualPackageDetails) => {
      const item = new Item(individualPackageDetails.weight);

      const pkg = new Package(
        individualPackageDetails.id,
        shipmentDetails.baseDeliveryCost,
        item,
        individualPackageDetails.distance
      );
      pkg.actualDeliveryCost =
        this.packageService.calculateActualDeliveryCost(pkg);
      this.packageService.applyOffer(pkg, individualPackageDetails.offerCode);

      packages.push(pkg);
    });

    return new Shipment(packages);
  }

  public printPackageDetails(shipment: Shipment) {
    shipment.packages.forEach((pkg) => {
      console.log(`${pkg.id} ${pkg.discount} ${pkg.discountedDeliveryCost}`);
    });
  }
}
