import { Component, ComponentRef, Injector, ViewChild, ViewContainerRef } from '@angular/core';
import { Header } from "../header/header";
import { Menu } from "../menu/menu";
import { loadRemoteModule } from '@angular-architects/native-federation';

@Component({
  selector: 'app-home',
  imports: [Header, Menu],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  @ViewChild('solar_consult', { read: ViewContainerRef, static: true }) solar_consult!: ViewContainerRef;

  private solar_consult_loaded: ComponentRef<any> | null = null;

  constructor(private injector: Injector) {}

  private pickRemoteComponent(m: any): any | null {
    if (!m) return null;
    // se expõe explicitamente
    const candidates = ['AppComponent', 'Solar', 'default'];
    for (const k of Object.keys(m)) {
      candidates.push(k);
    }
    // checa candidates por ɵcmp (Angular Ivy)
    for (const key of candidates) {
      const c = (key === 'default') ? (m as any).default : (m as any)[key];
      if (c && (c as any).ɵcmp) return c;
    }
    return null;
  }

  async ngAfterViewInit(): Promise<void> {
    try {
      const m = await loadRemoteModule('solar_consult', './Component');
      const RemoteComp = this.pickRemoteComponent(m);
      this.solar_consult.clear();
      if (!RemoteComp) {
        throw new Error('Remote component não encontrado em m (chaves: ' + (m ? Object.keys(m) : 'undefined') + ')');
      }
      this.solar_consult_loaded = this.solar_consult.createComponent(RemoteComp, { injector: this.injector });
    } catch (err) {
      console.error('Erro ao carregar/criar microfrontend solar_consult:', err);
    }
  }

  ngOnDestroy(): void {
    if (this.solar_consult_loaded) {
      this.solar_consult_loaded.destroy();
      this.solar_consult_loaded = null;
    }
    this.solar_consult?.clear();
  }
}
