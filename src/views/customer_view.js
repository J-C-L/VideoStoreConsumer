import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

var CustomerView = Backbone.View.extend({
  tagName: 'li',
  className: 'customer-item',

  initialize: function()
  {
    this.template = _.template($('#customer-name-template').html());
  },
  render: function () {

    var templateHTML = this.template(this.model.toJSON());
    // console.log(this.model);

    this.$el.html(templateHTML);

    return this;
  },
  events: {
    "click": "customerSelected"
  },
  customerSelected: function(event){
    this.trigger("customerSelected", this.model);
  }
});

export default CustomerView;
