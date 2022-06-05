var Userdb = require('../model/model');

//create and save new user
exports.create = (request, response)=>{
    //validate request
    if(!request.body){
        response.status(400).send({message:"Content can not be empty"});
        return;
    }

    //new user
    const user= new Userdb({
      name: request.body.name,
      email: request.body.email,
      gender: request.body.gender,
      status: request.body.status
    })

    //save user in the database
    user
      .save(user)
      .then(data => {
            response.redirect('/add-user')
        })
        .catch(err => {
            response.status(500).send({
                message: err.message|| "Some error occured while creating a create operation"
            });
        });
        
}

//retrieve and return all users/retrive and return a single user
exports.find = (request, response)=>{

    if(request.query.id){
        
        const id=request.query.id;

        Userdb.findById(id)
            .then(data=>{
                if(!data){
                    response.status(404).send({ message:`Not found user with ${id}`});
                }else{
                    response.send(data);
                }
            })
            .catch(err=>{
                response.status(500).send({ message:`Error retrieving user id :${id}`})
            })

    }else{
        Userdb.find()
        .then(user=>{
            response.send(user)
        })
        .catch(err=>{
            response.status(500).send({message: err.message || 'Error Occured while retriving user information'})
        })
    }
}

//Update a new identified user by user id
exports.update = (request, response)=>{
    if(!request.body){
        return response.status(400).send({message:'Data to be updated can not be empty'})
    }
    const id = request.params.id;
    Userdb.findByIdAndUpdate(id,request.body)
     .then(data =>{
         if(!data){
             res.status(404).send({message:`Cannot Update user with ${id}, Maybe user not found!`})
         }else{
             response.send(data);
         }
     })
   .catch(err=>{
       response.status(500).send({message:'Error Update user information'});
   })
}

//delete a user with specified user id in the request
exports.delete = (request, response)=>{

    const id = request.params.id;

    Userdb.findByIdAndDelete(id)
      .then(data=>{
          if(!data){
              response.status(404).send({ message: `Cannot Delete with ${id}. Maybe id is wrong`})
          }else{
              response.send({message:'User was delete succesfull'})
          }
      })
      .catch(err=>{
          response.status(500).send({message: `Cound not delete user with id: ${id}`});
      });
}