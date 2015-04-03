///<reference path="../typings/backbone/backbone.d.ts" />
///<reference path="../typings/backbone.paginator/backbone.paginator.d.ts" />
///<reference path="../typings/browserify/browserify.d.ts" />

'use strict';

require('../../../node_modules/backbone.paginator/lib/backbone.paginator.js');

import <%= name %> = require('./<%= name %>');

class <%= names %> extends Backbone.PageableCollection<<%= name %>> {
  model: typeof <%= name %>;
  constructor ( models?:<%= name %>[], options?:any){
    this.model = <%= name %>;
    this.url   = '/<%= lows %>';
    this.state = {
      firstPage: 0,
      currentPage: 0,
    };
    this.queryParams = {
      currentPage: 'current_page',
      pageSize:    'page_size',
    };

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

