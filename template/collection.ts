///<reference path="../typings/backbone/backbone.d.ts" />
'use strict';
<% low = names.replace(/^./,function(e){ return e.toLowerCase(); }) %>

import Backbone = require('backbone');

import <%= name %> = require('../models/<%= name %>');

class <%= names %> extends Backbone.Collection<<%= name %>> {
  model: typeof <%= name %>;
  constructor ( models?:<%= name %>[], options?:any){
    this.model = <%= name %>;
    this.url   = '/<%= low %>';
    super(models, options);
  }
  /*
  parse(res:any):any{
    return res.list;
  }
  */
  /*
  comparator(arg1: <%= name %>, to?: <%= name %>):number {
    if(to instanceof <%= name %>){
      return arg1.name.localeCompare(to.name, 'ja', {numeric: true});
    } else {
      return null; // nazo
    }
  }
  */
}

export = <%= names %>;
