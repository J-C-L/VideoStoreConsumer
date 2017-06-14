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
    console.log(this.model.type);
    console.log(this.model);


    var headingTemplate =_.template($('#movie-list-heading-template').html());
    var headingTemplateHTML = headingTemplate(this.model);
    this.$(".movie-list-heading").html(headingTemplateHTML);


    self.$('.movie-list').empty();

    this.movieViewList.forEach(function(movieView) {
      movieView.render();
      self.$('.movie-list').append(movieView.$el);

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
    var search_term = this.$(".search-form input[name='search']").val();
    this.model.type = "Search Results";
    console.log(this.model.type);
    console.log(search_term);

    this.movieViewList = [];
    this.model.fetch( {data: $.param({'query': search_term})} );

//     this.model.fetch({
//   success: function(data) {
//     console.log("It worked!", data);
//   },
//   failure: function(data) {
//     console.log("Failure", data);
//   }
// });



  },
  getLibraryList:function(event) {
    this.model.type = "Rental Library";
    this.movieViewList = [];
    this.model.fetch();
  }
});



export default MovieListView;
