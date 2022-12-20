import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ad } from '../models/ad.model';
import { AdsService } from '../services/ads.service';
@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss'],
})
export class BrowseComponent implements OnInit {
  posts: { title: string; content: string; size: string }[] = [];
  ads1: Ad[] = [];
  ads2: Ad[] = [];
  ads3: Ad[] = [];

  constructor(private adService: AdsService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    for (let i = 0; i < 90; i++) {
      const imageTitle = `Oglas ${i}`;
      const info = `Prodajem nesto..`;
      let ad = new Ad(imageTitle, info);
      await this.adService.generateDummyImageProps(ad);

      if (i % 3 == 0) {
        this.ads1.push(ad);
      } else if (i % 3 == 1) {
        this.ads2.push(ad);
      } else if (i % 3 == 2) {
        this.ads3.push(ad);
      }
    }
  }

  onAdClick(): void {
    this.router.navigate(['/designer']);
  }
}
