import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainChartVisualizerComponent } from './components/main-chart-visualizer/main-chart-visualizer.component';
import { LegalNotesComponent } from './components/legal-notes/legal-notes.component';


const routes: Routes = [
  {path: '', component: MainChartVisualizerComponent},
  {path: 'legal', component: LegalNotesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
