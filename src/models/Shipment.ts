import { Package } from "./Package";

export class Shipment {
  private _packages: Package[];

  constructor(packages: Package[]) {
    this.packages = packages;
  }

  public get packages(): Package[] {
    return this._packages;
  }
  public set packages(value: Package[]) {
    this._packages = value;
  }
}
