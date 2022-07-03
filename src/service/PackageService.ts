import { Offer } from "../models/Offer";
import { Package } from "../models/Package";

export class PackageService {
  private static readonly WEIGHT_FEES = 10;
  private static readonly DISTANCE_FEES = 5;

  public calculateActualDeliveryCost(pkg: Package): number {
    return (
      pkg.baseDeliveryCost +
      pkg.item.weight * PackageService.WEIGHT_FEES +
      pkg.distance * PackageService.DISTANCE_FEES
    );
  }

  public applyOffer(pkg: Package, offerCode: string) {
    try {
      console.log("Getting offer by offerCode = ", offerCode);
      const offer: Offer = Offer.fetchOfferByOfferCode(offerCode);
      this.setOffer(pkg, offer);
    } catch (error) {
      console.warn("Invalid offer code: ", offerCode);
    }

    // Calculate discount and discounted delivery cost
    pkg.discount = this.calculateDiscount(pkg);
    pkg.discountedDeliveryCost = this.calculateDiscountedDeliveryCost(pkg);
  }

  private setOffer(pkg: Package, offer: Offer) {
    pkg.offers.length = 0;
    pkg.offers.push(offer);
  }

  private calculateDiscount(pkg: Package): number {
    let discount: number = 0;

    pkg.offers.forEach((offer) => {
      if (offer.canBeApplied(pkg.distance, pkg.item.weight)) {
        discount += pkg.actualDeliveryCost * (offer.discount / 100);
      }
    });

    return Math.round(discount);
  }

  private calculateDiscountedDeliveryCost(pkg: Package): number {
    return pkg.actualDeliveryCost - pkg.discount;
  }
}
