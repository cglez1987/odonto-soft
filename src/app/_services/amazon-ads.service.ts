import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from './configuration.service';
import { AmazonAd } from '../_models/amazonAd';

@Injectable({
  providedIn: 'root'
})
export class AmazonAdsService {

  constructor(private http: HttpClient,
    private configurationService: ConfigurationService) { }


getAllAmazonAds(){
  return this.http.get<AmazonAd[]>(this.configurationService.getApiAmazonAds() + '/amazonAds');  
}

}
