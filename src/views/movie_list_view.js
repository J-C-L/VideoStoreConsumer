import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

import MovieView from './movie_view';
import MovieList from '../models/movie';


var MovieListView = Backbone.View.extend({
  initialize: function(movieListParams){

    var self = this;
    this.movieViewList = [];

    this.model.forEach(function(rawMovie){
      self.addMovie(rawMovie);
    });

    this.listenTo(this.model, 'add', this.addMovie);
    this.listenTo(this.model, 'remove', this.removeMovie);
    this.listenTo(this.model, "update", this.render);
  },

  render: function(){
    var self = this;
    // console.log(this.model.type);
    // console.log(this.model);


    var headingTemplate =_.template($('#movie-list-heading-template').html());
    var headingTemplateHTML = headingTemplate(this.model);
    this.$(".movie-list-heading").html(headingTemplateHTML);


    self.$('.movie-list').empty();

    this.movieViewList.forEach(function(movieView) {
      movieView.render();
      self.$('.movie-list').prepend(movieView.$el);

      if (self.model.type == 'Search Results'){
        self.listenTo(movieView, "movieSelected", self.exportMovie);
      }
    });

    this.delegateEvents();
    return this;
  },

  events: {
    'click .search': "submitSearch",
    'click .library-list': "getLibraryList"
  },

  addMovie: function(movie){
    var movieView = new MovieView({
      model: movie
    });
    this.movieViewList.push(movieView);
  },

  submitSearch: function(event) {
    var self = this;

    var search_term = this.$(".search-form input[name='search']").val();
    if (!search_term || search_term === ""){
      self.$(".movie-list-heading").html("Please enter a valid search term.");
      self.$('.movie-list').empty();
      return;
    }


    this.model.type = "Search Results";
    // console.log(this.model.type);
    // console.log(search_term);
    this.movieViewList = [];
    // this.model.fetch({data: $.param({'query': search_term})}) ;

    this.model.fetch({
      data: $.param({'query': search_term}),
      success: function(result) {
        console.log("Search fetch worked!", result);
        if (self.movieViewList.length === 0){
          console.log("inside if");
          self.$('.movie-list').html("There are no results for "+ search_term+".");
        }
      },
      error: function(d) {
        // console.log("Failure from search fetch", d);
        self.$(".movie-list-heading").html("There was a problem with our servers. <br />Please try your search again later.");
        self.$('.movie-list').empty();
      }
    });

  },

  getLibraryList:function(event) {
    if(this.model.type !== "Rental Library") {
      this.movieViewList = [];
      this.model.type = "Rental Library";
      this.model.fetch();
    }
  },

  exportMovie: function(movie){



    this.model.create(movie, {

      success: (result)=> {
        this.model.type = "Rental Library";
        // console.log(movie.attributes.title);
        this.model.fetch();
        alert("You successfully added "+movie.attributes.title+ " to your database");
      },
      error: function(model, response, options) {

        console.log(model);
        alert("There was a problem. "+ movie.attributes.title + " could not be added. You may already own this movie.");
    }
  });

}
});


export default MovieListView;
