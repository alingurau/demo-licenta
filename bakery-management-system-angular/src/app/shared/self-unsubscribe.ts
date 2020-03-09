import { Subscription } from 'rxjs/Subscription';

export class SelfUnsubscribe {
  private subscriptions: Subscription[] = [];

  addSubscription(subscription: Subscription) {
    this.subscriptions.push(subscription);
  }

  dispose() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
