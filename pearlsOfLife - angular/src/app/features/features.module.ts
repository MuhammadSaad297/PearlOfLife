import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { FeaturesComponent } from './features.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SideNavComponent } from '../shared/side-nav/side-nav.component';
import { HeaderComponent } from '../shared/header/header.component';
import { NotesComponent } from './notes/notes.component';
import { MemoriesComponent } from './memories/memories.component';
import { KeyHoldersComponent } from './key-holders/key-holders.component';
import { AssetsComponent } from './assets/assets.component';
import { PasswordsComponent } from './passwords/passwords.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { ObituaryInfoComponent } from './obituary-info/obituary-info.component';
import { AddItemsCardComponent } from '../shared/add-items-card/add-items-card.component';
import { NotesCardComponent } from '../shared/notes-card/notes-card.component';
import { ManageNotesComponent } from './notes/manage-notes/manage-notes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '../shared/confirmation-modal/confirmation-modal.component';
import { ManagePasswordComponent } from './passwords/manage-password/manage-password.component';
import { NotesByYearComponent } from './notes/notes-by-year/notes-by-year.component';
import { ManageKeyHoldersComponent } from './key-holders/manage-key-holders/manage-key-holders.component';
import { KeyHolderDetailsComponent } from './key-holders/key-holder-details/key-holder-details.component';
import { ManageMemoryFolderComponent } from './memories/manage-memory-folder/manage-memory-folder.component';
import { MemoryFolderDetailsComponent } from './memories/memory-folder-details/memory-folder-details.component';
import { EditableHeadingComponent } from '../shared/editable-heading/editable-heading.component';
import { ManageMemoriesComponent } from './memories/manage-memories/manage-memories.component';
import { ManageObituaryComponent } from './obituary-info/manage-obituary/manage-obituary.component';
import { ObituaryByYearComponent } from './obituary-info/obituary-by-year/obituary-by-year.component';
import { ObituaryCardComponent } from '../shared/obituary-card/obituary-card.component';
import { LegacyComponent } from './legacy/legacy.component';
import { AuthRoutingModule } from '../auth/auth-routing.module';

@NgModule({
  declarations: [
    FeaturesComponent,
    DashboardComponent,
    NotesComponent,
    MemoriesComponent,
    KeyHoldersComponent,
    AssetsComponent,
    PasswordsComponent,
    PersonalInfoComponent,
    ObituaryInfoComponent,
    ManageNotesComponent,
    ManagePasswordComponent,
    NotesByYearComponent,
    ManageKeyHoldersComponent,
    KeyHolderDetailsComponent,
    ManageMemoryFolderComponent,
    MemoryFolderDetailsComponent,
    ManageMemoriesComponent,
    ManageObituaryComponent,
    ObituaryByYearComponent,
    LegacyComponent,
  ],
  imports: [
    CommonModule,
    SideNavComponent,
    HeaderComponent,
    AddItemsCardComponent,
    NotesCardComponent,
    ObituaryCardComponent,
    EditableHeadingComponent,
    ReactiveFormsModule,
    NgbDatepickerModule,
    ConfirmationModalComponent,
    FeaturesRoutingModule,
    AuthRoutingModule,
  ],
})
export class FeaturesModule {}
