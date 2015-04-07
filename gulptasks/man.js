
module.exports = function(){
  'use strict';

  const message = `
  postinstall
    download definisions files after npm install,
    and bower install.

    entity: tsd reinstall -so; bower install

  man
    show this manual.

    entity: gulp man

  b
    build typescript files.

    entity: gulp compile-all

  lint
    lint typescript files.

    entity: gulp lint

  //test
  //  unit test.
  //
  //  entity: gulp test:local

  test-remote
    test using actual web browser.

    entity: gulp test:remote

  test-phantom
    test using phantomjs.

    entity: gulp test:phantom

  clean
    cleanup files.

    entity: gulp clean

  clean-test
    cleanup test files.

    entity: gulp clean:test

  t
    alias of template.

  template <templatetype> [options]
    make template.

    templatetype:
      model (alias: m)
      collection (alias: c)
      itemview (alias: i, iv, view)
      collectionview
      compositeview (alias: cv)
      layoutview (alias: l, layout)

    options:
      pazing
        make pageable collection instead of collection.

    entity: baki template

  doc
    make API document.

    entity: gulp typedoc

  showdoc
    show API document.

    entity: gulp opendoc

  showcov
    alias of showcoverage.

  showcoverage
    show coverage report.

    entity: gulp opencov

  server <actiontype>
    action for API server.

    actiontype:
      start
      stop
      delete
      reload
      list
    
    entity: gulp server --env

  show
    show my service.

    entity: gulp open

  sass
    compile sass to css.

    entity: gulp sass

  scss
    alias of sass.

  hello
    show hello message.

    entity: gulp hello

  nya
    show test message.

    entity: gulp nyamazing
`;

  console.log(message);
};
