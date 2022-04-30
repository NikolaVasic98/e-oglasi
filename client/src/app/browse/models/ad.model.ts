import { Subscription } from 'rxjs';

export class Ad {
  public static Id: number = 0;
  public id: number;
  public imageUrl?: string;
  public imageTitle?: string;
  public info?: string;
  public height?: number;
  public width?: number;
  public backgroundColor?: string;
  public foreGroundColor?: string;
  public busy?: Subscription;
  private _size: string = '';

  public set size(value: string) {
    this._size = value + '-size';
  }

  public get size(): string {
    return this._size;
  }

  public constructor(imageTitle: string, info: string) {
    this.id = Ad.Id++;
    this.imageTitle = imageTitle;
    this.info = info;
  }
}
