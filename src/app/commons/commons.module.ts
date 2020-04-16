import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonsRoutingModule } from './commons-routing.module';
import { RouterActivatorService } from './router-activator-service.service';
import { CommunicationsService } from './communications.service';
import { ComponentBaseComponent } from './component.base/component-base.component';


@NgModule({
  declarations: [ComponentBaseComponent],
  imports: [
    CommonModule,
    CommonsRoutingModule,
  ],
  providers: [RouterActivatorService, CommunicationsService],
  exports: []
})
export class CommonsModule { }
