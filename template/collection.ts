///<reference path="../typings/backbone/backbone.d.ts" />
'use strict';
<% low = names.replace(/^./,function(e){ return e.toLowerCase(); }) %>

import Backbone = require('backbone');

import <%= name %>Model = require('../models/<%= name %>');
import <%= name %> = <%= name %>Model.<%= name %>;

class <%= names %> extends Backbone.Collection<<%= name %>> {
  model: typeof <%= name %>;
  idAttribute: string;
  constructor ( models?:<%= name %>[], options?:any){
    this.model = <%= name %>;
    this.url   = '/<%= low %>';
    //this.idAttribute = 'id';
    super(models, options);
  }
  /*
  parse(res:any):any{
    return res.list;
  }
  */
}

export = <%= names %>;
