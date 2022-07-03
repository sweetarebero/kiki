import { Item } from "./Item";
import { Offer } from "./Offer";

export class Package {
  private _id: string;
  private _actualDeliveryCost: number;
  private _discount: number;
  private _discountedDeliveryCost: number;

  private _baseDeliveryCost: number;
  private _item: Item;
  private _distance: number;
  private _offers: Offer[] = [];

  constructor(
    id: string,
    baseDeliveryCost: number,
    item: Item,
    distance: number
  ) {
    this._id = id;
    this.baseDeliveryCost = baseDeliveryCost;
    this.item = item;
    this.distance = distance;
  }

  public get id(): string {
    return this._id;
  }

  public get actualDeliveryCost(): number {
    return this._actualDeliveryCost;
  }

  public set actualDeliveryCost(actualDeliveryCost: number) {
    this._actualDeliveryCost = actualDeliveryCost;
  }

  public get discount(): number {
    return this._discount;
  }

  public set discount(discount: number) {
    this._discount = discount;
  }

  public get discountedDeliveryCost(): number {
    return this._discountedDeliveryCost;
  }

  public set discountedDeliveryCost(discountedDeliveryCost: number) {
    this._discountedDeliveryCost = discountedDeliveryCost;
  }

  public get baseDeliveryCost(): number {
    return this._baseDeliveryCost;
  }
  public set baseDeliveryCost(value: number) {
    this._baseDeliveryCost = value;
  }

  public get item(): Item {
    return this._item;
  }
  public set item(value: Item) {
    this._item = value;
  }

  public get distance(): number {
    return this._distance;
  }
  public set distance(value: number) {
    this._distance = value;
  }

  public get offers(): Offer[] {
    return this._offers;
  }
  public set offers(value: Offer[]) {
    this._offers = value;
  }
}
