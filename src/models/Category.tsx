export class Category {
  private _id: string = '00000000-0000-0000-0000-000000000000';
  public get id(): string {
    return this._id;
  }

  private _name: string = 'Default name';
  public get name(): string {
    return this._name;
  }
  public set name(v: string) {
    this._name = v;
  }

  private _color: string = '#FFFFFF';
  public get color(): string {
    return this._color;
  }
  public set color(v: string) {
    this._color = v;
  }
}
