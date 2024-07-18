const express = require("express");
const app = express();

const users = [{
  name: "yoga yogesh",
  kidneys: [
    {
      healthy: true
    },
    {
      healthy: true
    }
  ]
},
{
  name: "mogger melgi",
  kidneys: [
    {
      healthy: false
    },
    {
      healthy: true
    }
  ]
}
];

app.use(express.json());

app.get("/", function(req, res){
    const yogeshKidneys = users[1].kidneys;
    console.log(yogeshKidneys);
    numberOfKidneys = yogeshKidneys.length;
    let numberOfHealthyKidneys = 0;
    for (let i = 0; i < numberOfKidneys; i++){
      if(yogeshKidneys[i].healthy) numberOfHealthyKidneys+=1;
    }
    const numberofUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
    console.log(numberOfHealthyKidneys);
    res.json({
      numberOfKidneys,
      numberOfHealthyKidneys,
      numberofUnhealthyKidneys  
    })
})

app.post("/", function(req, res){
    const isHealthy = req.body.isHealthy;
    users[1].kidneys.push({
      healthy: isHealthy
    });
    res.json({
      msg: "Done!"
    })
})

app.put("/", function(req, res){
  if(isThereAtleastOneUnhealthyKidney() == false){
    res.status(411).json({
      msg: "no unhealthy kidneys left!"
    });
  }
  else{
  for(let i=0; i<users[1].kidneys.length; i++){
    users[1].kidneys[i].healthy = true;
  }
  res.json({
    msg: "all kidneys fixed!"
  })
}
})

app.delete("/", function(req, res){
  const newKidneys = [];
  console.log(isThereAtleastOneUnhealthyKidney());
  if(isThereAtleastOneUnhealthyKidney()){
  for (let i=0; i<users[1].kidneys.length; i++){
    if(users[1].kidneys[i].healthy){
      newKidneys.push({
        healthy: true
      })
    }
  }
  users[1].kidneys = newKidneys;
  res.json({
    msg: "all empty kidneys discarded \n ready to add new ones!"
  })}
  else{
    res.status(411).json({
      msg: "no unhealthy kidneys left!"
    });
  }
})

function isThereAtleastOneUnhealthyKidney(){
  let isThere = false;
  for(let i=0; i<users[1].kidneys.length; i++){
    if(users[1].kidneys[i].healthy == false) isThere = true;
  }
  return isThere;
}
/*
app.post("/", function(req, res){
  
})

app.put("/", function(req, res){
  
})

app.delete("/", function(req, res){
  
})*/

app.listen(3001);