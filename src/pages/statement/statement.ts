import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticationProvider, TransactionProvider } from '../../providers/providers';

/**
 * Generated class for the StatementPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
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
    public transactionProvider: TransactionProvider) {

    this.transactionProvider.updates().subscribe(data => {
      this.statements = data;
    });

    this.statements = this.transactionProvider.getTransactions();
  }

  ionViewWillEnter() {
    this.transactionProvider.refreshTransactions();
    this.doProfile();
  }

  doProfile() {
    let profile = this.authentication.getProfile();

    const auth = this.authentication.getAuthorization();

    this.profileView ='member';

    if (profile.type == 'cashier') {
      this.profileView ='cashier';
      this.profile = profile.object;
    } else if (profile.type == 'partner') {
      this.profileView ='partner';
      this.profile = profile.object;
    } else { // member
      this.profile = auth.member;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatementPage');
  }

}
