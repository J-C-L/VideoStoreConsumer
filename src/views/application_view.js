import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

import MovieView from './movie_view';
import MovieList from '../collections/movie_list';
import MovieListView from 'views/movie_list_view';

import CustomerView from './customer_view';
import CustomerList from '../collections/customer_list';
import CustomerListView from 'views/customer_list_view';

import RentalView from './rental_view';
import RentalList from '../collections/rental_list';
import RentalListView from 'views/rental_list_view';



var ApplicationView = Backbone.View.extend({
  initialize: function(){
    console.log("Hi from Application initialize!");

    this.moviesFromRails = new MovieList();
    this.movieListView = new MovieListView({
      model: this.moviesFromRails,
      el: $('.movie-list-section')
    });

    this.customersFromRails = new CustomerList();
    this.customerListView = new CustomerListView({
      model: this.customersFromRails,
      el: $('.customer-list-section')
    });

    this.rentalsFromRails = new RentalList();
    this.rentalListView = new RentalListView({
      model: this.rentalsFromRails,
      el: $('.rental-list-section')
    });

    //   this.listenTo(this.model, 'add', this.addMovie);
    //   this.listenTo(this.model, 'remove', this.removeMovie);
    //   this.listenTo(this.model, "update", this.render);
  },

  render: function(){
    // var self = this;
    console.log("Hi from Application render!");
    // this.movieListView.render();
    // this.rentalListView.render();

    // this.customerListView.render();
    // var headingTemplate =_.template($('#movie-list-heading-template').html());
    // var headingTemplateHTML = headingTemplate(this.model);
    // this.$(".movie-list-heading").html(headingTemplateHTML);
    //
    //
    // self.$('.movie-list').empty();

    // return this;
  },

  events: {
    "click .search": function(e) {
      this.clearListsandViews(e);
      this.submitSearch(e);
    },

    "click .library-list": function(e) {
      this.clearListsandViews(e);
      this.getLibraryList(e);
    },
    "click .customer-button": function(e) {
      this.clearListsandViews(e);
      this.customerListView.model.type = "forViewing";
      this.getCustomerList(e);
    },
    "click .overdue-list": function(e) {
      this.clearListsandViews(e);
      this.getOverdueList(e);
    },

    "click .checkout": function(e) {
      this.clearListsandViews(e);
      this.customerListView.model.type = "forCheckout";
      // console.log(this.customerListView.model.type);
      this.getCustomerList(e);
    },

    // "click .checkin": function(e) {
    //   this.clearListsandViews(e);
    //   this.getOverdueList(e);
    // }
  },

  clearListsandViews: function(e){
    this.movieListView.$el.hide();
    this.customerListView.$el.hide();
    this.rentalListView.$el.hide();
  },
  getLibraryList: function(e){
    this.movieListView.$el.show();
    this.movieListView.getLibraryList();
  },
  getCustomerList: function(e){
    this.customerListView.$el.show();
    this.customerListView.getCustomerList();
  },

  getOverdueList: function(e){
    this.rentalListView.$el.show();
    this.rentalListView.getOverdueList();
  },

  submitSearch: function(e){
    this.movieListView.$el.show();
    var search_term = this.$(".search-form input[name='search']").val();
    this.movieListView.submitSearch(search_term);
  }

});


export default ApplicationView;
