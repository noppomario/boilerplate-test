///<reference path="../typings/backbone-relational/backbone-relational.d.ts" />

'use strict';

module <%= name %>Model {
  'use strict';

  export interface <%= name %>Attributes {
    name: string;
  }

  export class <%= name %> extends Backbone.RelationalModel implements <%= name %>Attributes {
    constructor(attributes?:<%= name %>Attributes, options?:any) {
      // this.idAttribute = 'id';
      this.defaults = <any>{
        name: 'unknown',
      };
      this.relations = [/*{
        type: Backbone.HasOne,
        key: '',
        relatedModel: SomeModel,
        reverseRelation: {key: '', includeInJSON: false},
      }*/];

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

