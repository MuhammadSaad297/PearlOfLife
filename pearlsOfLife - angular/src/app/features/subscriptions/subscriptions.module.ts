import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SubscriptionsComponent } from './subscriptions.component';

const routes: Routes = [{ path: '', component: SubscriptionsComponent }];

@NgModule({
  declarations: [SubscriptionsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SubscriptionsModule {}
