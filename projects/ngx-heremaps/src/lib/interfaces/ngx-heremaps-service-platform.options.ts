/// <reference types="heremaps" />

import {hereModules} from '../types/types';


export interface NgxHeremapsServicePlatformOptions extends H.service.Platform.Options {
  /**
   * Defines which HereMaps module should get loaded.
   */
  modules: hereModules[];

  /**
   * Defines the ressource path for loading modules.
   * Enter relative path for self hosted modules or absolute path for remote hosted modules
   */
  modulesRessourcePath: string;

  /**
   * v3.1 Api key wip
   */
  apikey?: string;
}
