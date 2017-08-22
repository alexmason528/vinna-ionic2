import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { BusinessProfilePage } from '../business-profile/business-profile';
import { DirectoryProvider } from '../../providers/directory';
/**
 * Generated class for the BusinessDirectoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-business-directory',
  templateUrl: 'business-directory.html',
})
export class BusinessDirectoryPage {
  partners = [];
  filteredPartners = [];

  constructor(
    public directory: DirectoryProvider,
    public navCtrl: NavController, 
    public navParams: NavParams) {

    this.directory.updates().subscribe(data => {
      this.partners = data;
      this.filter();
    });

    this.partners = directory.getPartners();
    this.filter();
  }

  ionViewWillEnter() {
    this.directory.refreshPartners(null);
  }
  
  navToBusinessDetail(partner) {
    this.navCtrl.push(BusinessProfilePage, {partner: partner});
  }

  filter(search='') {    
    search = search.toLowerCase();

    if (search && search.trim() != '') {
      this.filteredPartners = this.partners.filter((partner) => {
        return ((partner.text.toLowerCase().indexOf(search) != -1 ) || (partner.description.toLowerCase().indexOf(search) != -1));
      });
    } else {
      this.filteredPartners = this.partners;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusinessDirectoryPage');
  }
}
