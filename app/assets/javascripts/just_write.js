window.JustWrite = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    console.log('application initializing');

    window.projects = new JustWrite.Collections.ProjectCollection({});
    

    var projectListView = new JustWrite.Views.ProjectListView({
      collection: projects,
      el: $('.project-list')
    });


    window.currentProject = null;


    function ghostClick() {
      $('.ghost').click(function(e) {

        var left = (e.pageX-10).toString();
        var top = (e.pageY-10).toString();

        if (window.currentProject != null) {
          var pages = window.currentProject.get('pages');

          savePage(pages, left, top);  
        } else {
          window.currentProject = projects.create(
            { name: "New Project" }, 
            { success: function(newProject) {
              var pages = window.currentProject.get('pages');
              pages.url = '/projects/'+project.get('id')+'/pages';

              savePage(pages, left, top);
            }
          });
        };
        this.remove();
        $('body').unbind('mousemove');
      });
    };


    function ghostTrack() {
      $('body').mousemove(function(e) {
        $('.ghost').offset({left: e.pageX-10, top: e.pageY-10});
      });
    };


    $('.new-page').mouseup(function(e){
      saveCurrentPageDimensions();

      $('body').append('<div class="ghost">');
      var ghost = $('.ghost');
      ghost.offset({left:e.pageX-10,top:e.pageY-10})
      .css({display: 'inline-block'});

      ghostTrack();
      ghostClick();
    }); 


    $('.new-project').click(function() {
      window.projects.create({name: "New Project"})
    });

  } // end of initialize fn
}; // end of object definition


