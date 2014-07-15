var JustWrite = JustWrite || { Models: {}, Views: {}, Collections: {} };

JustWrite.Views.PageListView = Backbone.View.extend({
  initialize: function() {
    // this.listenTo(this.collection, 'change', this.render);
    this.listenTo(this.collection, 'add', this.renderPage);
    this.listenTo(this.collection, 'change', this.render);
  },
  render: function() {
    var that = this;
    this.$el.empty(); 
    _.each(this.collection.models, function(page) {
      var pageView = new JustWrite.Views.PageView({
        model: page
      });
      that.$el.append(pageView.render().el);
    });
    console.log('creating pagelistview');
  return this;
  },
  renderPage: function(page) {
    var pageView = new JustWrite.Views.PageView({model: page});
    this.$el.append(pageView.render().el);
    console.log('creating single pagelistview');
    return this;
  } 
});