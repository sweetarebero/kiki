export class Offer {
  private _discount: number;

  private minDistance: number;
  private maxDistance: number;
  private minWeight: number;
  private maxWeight: number;

  private static AVAILABLE_OFFERS: Map<string, Offer> = new Map([
    ["OFR001", new Offer(10, 0, 200, 70, 200)],
    ["OFR002", new Offer(7, 50, 150, 100, 250)],
    ["OFR003", new Offer(5, 50, 250, 10, 150)],
  ]);

  private constructor(
    discount: number,
    minDistance: number,
    maxDistance: number,
    minWeight: number,
    maxWeight: number
  ) {
    this._discount = discount;
    this.minDistance = minDistance;
    this.maxDistance = maxDistance;
    this.minWeight = minWeight;
    this.maxWeight = maxWeight;
  }

  public get discount(): number {
    return this._discount;
  }

  public static fetchOfferByOfferCode(offerCode: string): Offer {
    const offer = this.AVAILABLE_OFFERS.get(offerCode);

    if (!offer) {
      throw new Error("Invalid offer code");
    }
    return offer;
  }

  public canBeApplied(distance: number, weight: number): boolean {
    return (
      distance >= this.minDistance &&
      distance <= this.maxDistance &&
      weight >= this.minWeight &&
      weight <= this.maxWeight
    );
  }
}
