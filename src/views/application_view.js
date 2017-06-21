import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

import MovieView from './movie_view';
import MovieList from '../collections/movie_list';
import MovieListView from 'views/movie_list_view';

import CustomerView from './customer_view';
import CustomerList from '../collections/customer_list';
import CustomerListView from 'views/customer_list_view';


var ApplicationView = Backbone.View.extend({
  initialize: function(){
    console.log("Hi from Application initialize!");

    // var moviesFromRails = new MovieList();
    // moviesFromRails.fetch();
    // console.log(moviesFromRails);
    //
    // this.movieListView = new MovieListView({
    //   model: moviesFromRails,
    //   el: $('.movie-list-section')
    // });


    var customersFromRails = new CustomerList();
    customersFromRails.fetch();
    console.log(customersFromRails);

    this.customerListView = new CustomerListView({
      model: customersFromRails,
      el: $('.customer-list-section')
    });



    //   this.listenTo(this.model, 'add', this.addMovie);
    //   this.listenTo(this.model, 'remove', this.removeMovie);
    //   this.listenTo(this.model, "update", this.render);
  },

  render: function(){
    // var self = this;
    console.log("Hi from Application render!");
    // this.movieListView.render();
    this.customerListView.render();
    // var headingTemplate =_.template($('#movie-list-heading-template').html());
    // var headingTemplateHTML = headingTemplate(this.model);
    // this.$(".movie-list-heading").html(headingTemplateHTML);
    //
    //
    // self.$('.movie-list').empty();

    // return this;
  },

  events: {
    'click .search': "submitSearch",
    'click .library-list': "getLibraryList"
  },
  getLibraryList: function(e){
    this.movieListView.getLibraryList();
  },
  submitSearch: function(e){
    var search_term = this.$(".search-form input[name='search']").val();
    this.movieListView.submitSearch(search_term);
  }

});


export default ApplicationView;
