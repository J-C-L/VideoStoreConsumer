
// Import jQuery & Underscore
import $ from 'jquery';
import _ from 'underscore';

import ApplicationtView from 'views/application_view';


// ready to go
$(document).ready(function() {

  var applicationView = new ApplicationView({
    el: $('.main-content')
  });

  applicationView.render();

});
