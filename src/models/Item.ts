export class Item {
  private _weight: number;

  constructor(weight: number) {
    this._weight = weight;
  }

  public get weight(): number {
    return this._weight;
  }
}
