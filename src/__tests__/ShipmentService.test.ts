import { PackageService } from "../service/PackageService";
import { ShipmentService } from "../service/ShipmentService";

describe("ShipmentService: check if correct shipment is created", () => {
  const sampleShipmentDetails = {
    baseDeliveryCost: 100,
    packageDetails: [
      { id: "p1", weight: 5, distance: 5, offerCode: "OFR001" },
      { id: "p2", weight: 10, distance: 100, offerCode: "OFR003" },
      { id: "p3", weight: 5, distance: 5, offerCode: "OFR005" },
    ],
  };

  const packageService = new PackageService();
  const shipmentService = new ShipmentService(packageService);
  const shipment = shipmentService.createShipment(sampleShipmentDetails);

  test("if package 1 gets no discount applied when offer criteria not met", () => {
    expect(shipment.packages[0].id).toBe("p1");
    expect(shipment.packages[0].discount).toBe(0);
    expect(shipment.packages[0].discountedDeliveryCost).toBe(175);
  });

  test("if package 2 has the correct discount applied when offer criteria met", () => {
    expect(shipment.packages[1].id).toBe("p2");
    expect(shipment.packages[1].discount).toBe(35);
    expect(shipment.packages[1].discountedDeliveryCost).toBe(665);
  });

  test("if package 3 has no discount applied when invalid offer code", () => {
    expect(shipment.packages[2].id).toBe("p3");
    expect(shipment.packages[2].discount).toBe(0);
    expect(shipment.packages[2].discountedDeliveryCost).toBe(175);
  });
});
