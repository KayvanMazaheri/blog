'use strict';

var moment = require('moment-jalaali');

hexo.extend.helper.register('jalaali', function (date) {
  return moment(date).format('jMMMM jYYYY');
});
hexo.extend.helper.register('jalaaliyear', function (date) {
  return moment(date).format('jYYYY');
});
hexo.extend.helper.register('jalaalimonth', function (date) {
  return moment(date).format('jMMMM');
});
moment.loadPersian()
