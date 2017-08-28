import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthenticationProvider, TransactionProvider } from '../../providers/providers';

/**
 * Generated class for the StatementPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-statement',
  templateUrl: 'statement.html',
})
export class StatementPage {
  statements: any;
  profile: any;
  profileView: any;

  constructor(
    public authentication: AuthenticationProvider,
    public navCtrl: NavController,     
    public transaction: TransactionProvider) {

    this.transaction.transactionUpdates().subscribe(data => {
      this.statements = data;
      console.log('statement got data');
    });

  }

  ionViewWillEnter() {
    this.doProfile();
  }

  doProfile() {
    console.log('doProfile()');

    let profile = this.authentication.getProfile();
    this.profileView = profile.type;

    const auth = this.authentication.getAuthorization();

    this.statements = this.transaction.getTransactions();

    if (profile.type == 'partner' || profile.type == 'cashier') {
      this.profile = profile.object;
    } else { // member
      this.profile = auth.member;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatementPage');
  }

}
