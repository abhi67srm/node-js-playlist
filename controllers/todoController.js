var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to the database
mongoose.connect('mongodb://test:test@ds014118.mlab.com:14118/todo');

//Create a schema - this is like a blueprint of the data
var todoSchema = new mongoose.Schema({
  item:String
});
//Create a Model
var Todo = mongoose.model('Todo', todoSchema);
/*var itemOne = Todo({item: 'buy flowers'}).save(function(err){
  if(err) throw err;
  console.log('item Saved');
})
*/
//var data = [{item: 'get-milk'},{item: 'walk-dog'},{item:'kick some coding ass'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});
module.exports = function(app){

  app.get('/todo',function(req,res){
    //get data from mongodb and pass it to view
    Todo.find({}, function(err, data){
      res.render('todo',{todos: data});
    });

  });

  app.post('/todo', urlencodedParser ,function(req,res){
    //get data from the view and add it to database
    var newTodo = Todo(req.body).save(function(err,data){
      if(err) throw console.error();;
      res.json(data);
    });

  });

  app.delete('/todo/:item', function(req,res){
    //delete the requested item from mongodb
    Todo.find({item : req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
      if(err) throw err;
      res.json(data);
    });
    });
};
