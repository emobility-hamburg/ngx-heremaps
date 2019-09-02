import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';

import {HEREMAPS_OPTIONS} from '../providers/module.provider';
import {NgxHeremapsServicePlatformOptions} from '../interfaces/ngx-heremaps-service-platform.options';
import {bufferCount, concatMap, delayWhen, take} from 'rxjs/operators';
import {AsyncSubject, from, fromEvent, Observable, of, Subject} from 'rxjs';
import {fileTypes} from '../types/types';
import {modulesConfig} from '../configs/modules.config';
import {ModuleModel} from '../models/module.model';


@Injectable()
export class NgxHeremapsLoadModulesService {

  private readonly modulesConfig = modulesConfig;

  readonly modulesMounted: AsyncSubject<boolean> = new AsyncSubject();


  constructor(@Inject(HEREMAPS_OPTIONS) private readonly options: NgxHeremapsServicePlatformOptions,
              @Inject(DOCUMENT) private readonly document: Document) {

    this.mountAllModules();
  }


  private createModuleName(module: string, fileType: fileTypes): string {
    return 'mapsjs-'.concat(module, '.', fileType);
  }


  private getRessourcePath(): URL {
    if (!this.options.modulesRessourcePath.endsWith('/')) {
      this.options.modulesRessourcePath += '/';
    }

    try {
      return new URL(this.options.modulesRessourcePath);
    } catch (e) {
      return new URL(this.options.modulesRessourcePath, location.origin);
    }
  }


  private getModuleUrl(module: string, fileType: fileTypes): URL {
    return new URL(this.createModuleName(module, fileType), this.getRessourcePath());
  }


  mountScriptModule(name: string): Observable<Event> {
    const moduleScriptElement = this.document.createElement('script');
    moduleScriptElement.type = 'text/javascript';
    moduleScriptElement.src = this.getModuleUrl(name, 'js').toString();
    moduleScriptElement.defer = true;
    moduleScriptElement.async = true;

    this.document.body.appendChild(moduleScriptElement);

    return fromEvent(moduleScriptElement, 'load').pipe(
      take(1)
    );
  }


  mountStylesheetModule(name: string) {
    const moduleLinkElement = this.document.createElement('link');
    moduleLinkElement.rel = 'stylesheet';
    moduleLinkElement.type = 'text/css';
    moduleLinkElement.href = this.getModuleUrl(name, 'css').toString();

    this.document.body.appendChild(moduleLinkElement);
  }


  mountAllModules() {
    const loadModule: Subject<void> = new Subject();

    from(this.options.modules)
      .pipe(
        bufferCount(1),
        concatMap((bufferData) => {
          return of(bufferData).pipe(
            delayWhen(() => loadModule)
          );
        })
      )
      .subscribe((configModule: string[]) => {
        const module: ModuleModel = this.modulesConfig.find((fModule: ModuleModel) => fModule.name === configModule[0]);

        if (!module) {

          console.error('ngx-heremaps: invalid module: ', configModule[0]);
          console.error('ngx-heremaps: further modules are not loaded.');

        } else {

          this.mountScriptModule(module.name).subscribe(() => {
            const isLast = this.options.modules.indexOf(module.name) === this.options.modules.length - 1;

            if (isLast) {
              loadModule.complete();
              this.modulesMounted.next(true);
              this.modulesMounted.complete();
            }

            loadModule.next();
          });

          if (module.hasCss) {
            this.mountStylesheetModule(module.name);
          }

        }

      });

    loadModule.next();
  }


}
