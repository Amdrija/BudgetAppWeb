import { Category } from './Category';

export class Expense {
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

  private _category: Category = new Category();
  public get category(): Category {
    return this._category;
  }
  public set category(v: Category) {
    this._category = v;
  }

  private _categoryId: string = '00000000-0000-0000-0000-000000000000';
  public get categoryId(): string {
    return this._categoryId;
  }
  public set categoryId(v: string) {
    this._categoryId = v;
  }

  private _amount: number = 0;
  public get amount(): number {
    return this._amount;
  }
  public set amount(v: number) {
    this._amount = v;
  }

  private _date: Date = new Date();
  public get date(): Date {
    return this._date;
  }
  public set date(v: Date) {
    this._date = v;
  }

  private _description: string | null = null;
  public get description(): string | null {
    return this._description;
  }
  public set description(v: string | null) {
    this._description = v;
  }
}
