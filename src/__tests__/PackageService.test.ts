import { Item } from "../models/Item";
import { Package } from "../models/Package";
import { PackageService } from "../service/PackageService";

describe("PackageService: passing correct offercode but distance out of range", () => {
  const pkg = new Package("p1", 100, new Item(5), 5);
  const packageService = new PackageService();
  pkg.actualDeliveryCost = packageService.calculateActualDeliveryCost(pkg);
  packageService.applyOffer(pkg, "OFR001");

  test("that discount applied is 0", () => {
    expect(pkg.discount).toBe(0);
    expect(pkg.actualDeliveryCost).toBe(175);
    expect(pkg.discountedDeliveryCost).toBe(175);
  });
});

describe("PackageService: passing correct offercode but weight out of range", () => {
  const pkg = new Package("p1", 100, new Item(50), 50);
  const packageService = new PackageService();
  pkg.actualDeliveryCost = packageService.calculateActualDeliveryCost(pkg);
  packageService.applyOffer(pkg, "OFR002");

  test("that discount applied is 0", () => {
    expect(pkg.discount).toBe(0);
    expect(pkg.actualDeliveryCost).toBe(850);
    expect(pkg.discountedDeliveryCost).toBe(850);
  });
});

describe("PackageService: passing correct offercode, weight and distance", () => {
  const pkg = new Package("p1", 100, new Item(10), 100);
  const packageService = new PackageService();
  pkg.actualDeliveryCost = packageService.calculateActualDeliveryCost(pkg);
  packageService.applyOffer(pkg, "OFR003");

  test("if correct actualDelivery cost and discountedDeliveryCost is applied", () => {
    expect(pkg.discount).toBe(35);
    expect(pkg.actualDeliveryCost).toBe(700);
    expect(pkg.discountedDeliveryCost).toBe(665);
  });
});

describe("PackageService: passing incorrect offercode", () => {
  const pkg = new Package("p1", 100, new Item(10), 100);
  const packageService = new PackageService();
  pkg.actualDeliveryCost = packageService.calculateActualDeliveryCost(pkg);
  packageService.applyOffer(pkg, "OFR005");

  test("if correct actualDelivery cost and discountedDeliveryCost is applied", () => {
    expect(pkg.discount).toBe(0);
    expect(pkg.actualDeliveryCost).toBe(700);
    expect(pkg.discountedDeliveryCost).toBe(700);
  });
});
