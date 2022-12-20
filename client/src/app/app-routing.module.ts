import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowseComponent } from './browse/components/browse.component';
import { DesignerComponent } from './designer/components/designer.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/browse',
    pathMatch: 'full',
  },
  {
    path: 'browse',
    component: BrowseComponent,
  },
  {
    path: 'designer',
    component: DesignerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
