import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

var RentalView = Backbone.View.extend({

  tagName: 'li',
  className: 'rental-item',

  initialize: function()
  {
    this.template = _.template($('#rental-name-template').html());
  },
  render: function () {

    var templateHTML = this.template(this.model.toJSON());
    // console.log(this.model);

    this.$el.html(templateHTML);

    return this;
  },
  events: {
    // "click": "movieSelected"
  }
});

export default RentalView;
