import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturesComponent } from './features.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { KeyHoldersComponent } from './key-holders/key-holders.component';
import { MemoriesComponent } from './memories/memories.component';
import { NotesComponent } from './notes/notes.component';
import { AssetsComponent } from './assets/assets.component';
import { PasswordsComponent } from './passwords/passwords.component';
import { ObituaryInfoComponent } from './obituary-info/obituary-info.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { NotesByYearComponent } from './notes/notes-by-year/notes-by-year.component';
import { KeyHolderDetailsComponent } from './key-holders/key-holder-details/key-holder-details.component';
import { MemoryFolderDetailsComponent } from './memories/memory-folder-details/memory-folder-details.component';
import { ObituaryByYearComponent } from './obituary-info/obituary-by-year/obituary-by-year.component';

const routes: Routes = [
  {
    path: '',
    component: FeaturesComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'key-holders',
        component: KeyHoldersComponent,
      },
      {
        path: 'key-holders/:id',
        component: KeyHolderDetailsComponent,
      },
      {
        path: 'memories',
        component: MemoriesComponent,
      },
      {
        path: 'memories/folder/:id',
        component: MemoryFolderDetailsComponent,
      },
      {
        path: 'notes',
        component: NotesComponent,
      },
      {
        path: 'notes/:year',
        component: NotesByYearComponent,
      },
      {
        path: 'assets',
        component: AssetsComponent,
      },
      {
        path: 'passwords',
        component: PasswordsComponent,
      },
      {
        path: 'personal-info',
        component: PersonalInfoComponent,
      },
      {
        path: 'obituary-info',
        component: ObituaryInfoComponent,
      },
      {
        path: 'obituary-info/:year',
        component: ObituaryByYearComponent,
      },
      {
        path: 'subscriptions',
        loadChildren: () =>
          import('./subscriptions/subscriptions.module').then(
            (m) => m.SubscriptionsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
