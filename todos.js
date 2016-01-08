if(Meteor.isClient){
  Template.todos.helpers({
    'todo': function(){
      return Todos.find({}, {sort: {createdAt: -1}});
    }
  });

    Template.addTodo.events({
        'submit form': function(event){
            event.preventDefault();
            var todoName = $('[name="todoName"]').val();
            Todos.insert({
               name: todoName,
                completed: false,
                createdAt: new Date()
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
            return Todos.find().count();
        },
        'completedTodos': function(){
            return Todos.find({ completed: true }).count();
        }
    });
}


if(Meteor.isServer){

}

Todos = new Mongo.Collection('todos');