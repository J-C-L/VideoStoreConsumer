import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

import MovieView from './movie_view';
import MovieList from '../models/movie';


var MovieListView = Backbone.View.extend({
  initialize: function(movieListParams){
    this.type = movieListParams.type;

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

    var headingTemplate =_.template($('#movie-list-heading-template').html());
    var headingTemplateHTML = headingTemplate({'type': this.type});
    this.$("movie-list-heading").html(headingTemplateHTML);


    self.$('.movie-list').empty();

    this.movieViewList.forEach(function(movieView) {
      movieView.render();
      self.$('.movie-list').append(movieView.$el);

    });
    this.delegateEvents();

    return this;


  },
  events: {
    'click .search': "submitSearch"
  },

  addMovie: function(movie){
    var movieView = new MovieView({
      model: movie
    });
    this.movieViewList.push(movieView);
  },

  submitSearch: function(event) {
    var search_term = this.$(".search-form input[name='search']").val();
    this.type = "Search Results";
    console.log(this.type);
    console.log(search_term);

    this.movieViewList = [];
    this.model.fetch({data: $.param({'query': search_term})});
  }
});



export default MovieListView;
