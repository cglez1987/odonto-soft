import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root'
})
export class AmazonAdsService {

  constructor(private http: HttpClient,
    private configurationService: ConfigurationService) { }


getAllAmazonAds(){
  return this.http.get(this.configurationService.getApiURL() + '/amazonAds');  
}

}
