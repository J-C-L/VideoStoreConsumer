import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

import RentalView from './rental_view';
import RentalList from '../collections/rental_list';


var RentalListView = Backbone.View.extend({
  initialize: function(rentalListParams){

    var self = this;
    this.rentalViewList = [];

    this.model.forEach(function(rawRental){
      self.addRental(rawRental);
    });

    this.listenTo(this.model, 'add', this.addRental);
    this.listenTo(this.model, 'remove', this.removeRental);
    this.listenTo(this.model, "update", this.render);
  },

  render: function(){
    var self = this;
    // console.log(this.model.type);
    // console.log(this.model);


    this.$(".rental-heading").html("Overdue Rentals");


    self.$('.rental-list').empty();

    this.rentalViewList.forEach(function(rentalView) {
      rentalView.render();
      self.$('.rental-list').prepend(rentalView.$el);

    });

    // this.delegateEvents();
    return this;
  },

  events: {
  },
  getOverdueList: function(e){
    this.rentalViewList = [];
    this.model.reset();
    this.model.fetch();
    console.log(this.model);
  },

  addRental: function(rental){
    var rentalView = new RentalView({
      model: rental
    });
    this.rentalViewList.push(rentalView);
  },

});


export default RentalListView;
