const axios = require('axios');

exports.homeRoutes = (request, response)=>{
    //Make a get request to /api/users
    axios.get("http://localhost:3000/api/users")
       .then(function(res){
        response.render('index',{users:res.data});
       })
        .catch(err=>{
            response.send(err)
       })
};

exports.add_user = (request,response)=>{
    response.render('add_user');
};

exports.update_user = (request, response)=>{
    axios.get("http://localhost:3000/api/users",{params:{id:request.query.id}})
      .then(function(userdata){
          response.render("update_user",{user:userdata.data})
      })
      .catch(err=>{
          response.send(err);
      })
};