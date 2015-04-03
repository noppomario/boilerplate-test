///<reference path="../typings/backbone/backbone.d.ts" />

'use strict';

module <%= name %>Model {
  'use strict';

  export interface <%= name %>Attributes {
    name: string;
  }

  export class <%= name %> extends Backbone.Model implements <%= name %>Attributes {
    constructor(attributes?:<%= name %>Attributes, options?:any) {
      // this.idAttribute = 'id';
      this.defaults = <any>{
        name: 'unknown',
      };
      super(attributes, options);
    }

    initialize():void {
      // constructor
    }

    get name():string {
      return this.get('name');
    }

    set name(value: string) {
      this.set('name', value);
    }

    /*
    validate(attrs:any):string {
      return 'error message';
    }
    */
  }
}

import <%= name %> = <%= name %>Model.<%= name %>;
export = <%= name %>;

