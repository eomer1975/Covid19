import {Component, OnInit, ViewContainerRef, ComponentFactoryResolver, Injector, ApplicationRef} from '@angular/core';
import {CommunicationsService} from '../communications.service';
import {AppInjector} from '../app-injector';

@Component({
  selector: 'tst-component-base',
  templateUrl: './component-base.component.html',
  styleUrls: ['./component-base.component.scss'],
})
export class ComponentBaseComponent implements OnInit {
  private communicationServiceInst: CommunicationsService;
  private injector: Injector;
  private componentFactoryResolverInst: ComponentFactoryResolver;
  private viewContainerInst: ViewContainerRef;
  private appRefInst: ApplicationRef;

  constructor() {
    this.setInjector();
  }

  get communicationService(): CommunicationsService {
    return this.communicationServiceInst;
  }

  setInjector() {
    this.injector = AppInjector.getInjector();
    if (this.injector) {
      this.communicationServiceInst = this.injector.get(CommunicationsService);
      this.componentFactoryResolverInst = this.injector.get(ComponentFactoryResolver);
      // debugger;
      this.appRefInst = this.injector.get(ApplicationRef);
      // this.viewContainerInst = this.injector.get(ViewContainerRef);
    }
  }

  setViewContainerRef(v: ViewContainerRef) {
    if (!this.viewContainerInst) {
      this.viewContainerInst = v;
    }
    // this.viewContainerInst = v;
  }

  createComponent(com: any){
    const backdropFactory = this.componentFactoryResolverInst.resolveComponentFactory(com);
    var cmp = this.viewContainerInst.createComponent(backdropFactory, null, this.injector);
  }

  ngOnInit() {}
}
