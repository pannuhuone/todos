if(Meteor.isClient){
    // Subcribes
    //Meteor.subscribe('todos');

    // Templates
    Template.todos.helpers({
        'todo': function(){
            var currentList = this._id;
            var currentUser = Meteor.userId();
            return Todos.find({ listId: currentList, createdBy: currentUser }, {sort: {createdAt: -1}});
        }
    });

    Template.addTodo.events({
        'submit form': function(event){
            event.preventDefault();
            var todoName = $('[name="todoName"]').val();
            var currentUser = Meteor.userId();
            var currentList = this._id;
            Todos.insert({
                name: todoName,
                completed: false,
                createdAt: new Date(),
                createdBy: currentUser,
                listId: currentList
            });
            $('[name="todoName"]').val('');
        }
    });

    Template.todoItem.events({
        'click .delete-todo': function(event){
            event.preventDefault();
            var documentId = this._id;
            var confirm = window.confirm("Delete this task?");
            if(confirm) {
                Todos.remove({_id: documentId});
            }
        },
        'keyup [name=todoItem]': function(event) {
            if (event.which == 13 || event.which == 27) {
                $(event.target).blur();
            } else {
                var documentId = this._id;
                var todoItem = $(event.target).val();
                Todos.update({_id: documentId}, {$set: {name: todoItem}});
            }
        },
        'change [type=checkbox]': function(){
            var documentId = this._id;
            var isCompleted = this.completed;
            if(isCompleted){
                Todos.update({ _id: documentId }, {$set: { completed: false }});
            } else {
                Todos.update({ _id: documentId }, {$set: { completed: true }});
            }
        }
    });

    Template.todoItem.helpers({
        'checked': function() {
            var isCompleted = this.completed;
            if(isCompleted){
                return "checked";
            } else {
                return "";
            }
        }
    });

    Template.todosCount.helpers({
        'totalTodos': function(){
            var currentList = this._id;
            return Todos.find({ listId: currentList }).count();
        },
        'completedTodos': function(){
            var currentList = this._id;
            return Todos.find({ listId: currentList, completed: true }).count();
        }
    });
}


if(Meteor.isServer){
    Meteor.publish('todos', function(currentList){
        var currentUser = this.userId;
        return Todos.find({ createdBy: currentUser, listId: currentList });
    });
}

Todos = new Mongo.Collection('todos');