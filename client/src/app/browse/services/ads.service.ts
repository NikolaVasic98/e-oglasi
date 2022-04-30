import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RandomService } from 'src/app/common/services/random.service';
import { Ad } from '../models/ad.model';

export enum Sizes {
  'small' = 1,
  'medium',
  'large',
}

@Injectable({
  providedIn: 'root',
})
export class AdsService {
  private dummyImageUrl = 'https://dummyimage.com';

  constructor(private http: HttpClient, private randomService: RandomService) {}

  public async generateDummyImageProps(ad: Ad): Promise<void> {
    ad.width = this.randomService.getRandomNumber(400, 600);
    ad.height = this.randomService.getRandomNumber(600, 800);
    ad.backgroundColor = this.randomService.getRandomString(6);
    ad.foreGroundColor = this.randomService.getRandomString(6);
    ad.size = Sizes[this.randomService.getRandomNumber(3)];

    ad.imageUrl = this.generateDummyImageUrl(ad);
  }

  private generateDummyImageUrl(ad: Ad): string {
    return `${this.dummyImageUrl}/${ad.width}x${ad.height}/${ad.backgroundColor}/${ad.foreGroundColor}.png&text=${ad.imageTitle}`;
  }
}
