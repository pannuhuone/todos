Lists = new Meteor.Collection('lists');

Router.route('/list/:_id', {
    name: 'listPage',
    template: 'listPage',
    data: function(){
        var currentList = this.params._id;
        return Lists.findOne({ _id: currentList });
    }
});

if(Meteor.isClient) {
    Template.addList.events({
        'submit form': function(event){
            event.preventDefault();
            var listName = $('[name=listName]').val();
            Lists.insert({
                name: listName },
                function(error, results){
                    Router.go('listPage', {_id: results });
                });
            $('[name=listName]').val('');
        }
    });

    Template.lists.helpers({
        'list': function(){
            return Lists.find({}, {sort: {name: 1}});
        }
    });
}

if(Meteor.isServer) {
    // Code here
}