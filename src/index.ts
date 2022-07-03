#!/usr/bin/env node

import { ShipmentDetails } from "./models/types";
import { PackageService } from "./service/PackageService";
import { ShipmentService } from "./service/ShipmentService";
import { UserInputService } from "./service/UserInputService";

const userInputService = new UserInputService();
const packageService = new PackageService();
const shipmentService = new ShipmentService(packageService);

(async () => {
  const shipmentDetails: ShipmentDetails =
    await userInputService.getShipmentDetails();
  const shipment = shipmentService.createShipment(shipmentDetails);

  shipmentService.printPackageDetails(shipment);
})();
