
//DB simulation (Static Data)
let MatchesTab = [
    { id: 1, scoreOne: 2, scoreTwo: 4, teamOne: 'RM', teamTwo: 'FCB' },
    { id: 2, scoreOne: 3, scoreTwo: 5, teamOne: 'CA', teamTwo: 'EST' },
    { id: 3, scoreOne: 4, scoreTwo: 7, teamOne: 'JUV', teamTwo: 'ROM' },
    { id: 4, scoreOne: 5, scoreTwo: 3, teamOne: 'LIV', teamTwo: 'MUN' },
    { id: 5, scoreOne: 1, scoreTwo: 1, teamOne: 'EST', teamTwo: 'CA' },
  
  ]
  let Users = [
    { id: 1, fName: 2, lName: 4, email: 'RM', pwd: 'FCB',tel:"" },
    { id: 2, fName: 3, lName: 5, email: 'CA', pwd: 'EST',tel:""},
    { id: 3, fName: 4, lName: 7, email: 'JUV', pwd: 'ROM' ,tel:""},
    { id: 4, fName: 5, lName: 3, email: 'LIV', pwd: 'MUN' ,tel:""},
    { id: 5, fName: 1, lName: 1, email: 'EST', pwd: 'CA' ,tel:""},
  
  ]
   let teamsTab=[
    {id:1,name:"FCB",owner:'Salim',Foundation:"5"},
    {id:2,name:"Real Madrid",owner:'Nidhal',Foundation:"17"},
    {id:3,name:"Bayern Munchen",owner:'Nathir',Foundation:"19"},
  
  ]
   let playersTab=[
    {id:1,name:"Neymar at the world Cup",picture:'assets/images/img_1.jpg',number:"5",position:"CF1",age:22},
    {id:2,name:"Messi at the world Cup",picture:'assets/images/img_2.jpg',number:"17",position:"MDF",age:19},
    {id:3,name:"Fabregas at the world Cup",picture:'assets/images/img_3.jpg',number:"19",position:"GK",age:26},
  
  ]
  function IdGenerator(T) {
    var max;
  
    if (T.length === 0) {
      max = 0;
    } else {
      max = T[0].id;
  
      for (let i = 1; i < T.length; i++) {
        if (T[i].id > max) {
          max = T[i].id;
        }
      }
    }
  
    return max;
  }
  
  
  
  /******************  Module Importations**************** */
  //import express module
  const express = require("express");
  //Import body-parser module 
  const bodyParser = require("body-parser");
  const mongoose =require("mongoose");
  mongoose.connect('mongodb://127.0.0.1:27017/sportDB');
  
  /********** Express Application *************/
  
  //Creates express application 
  
  const app = express();
  
  //************************ App Configuration  ********************/
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
  });
  
  //Send Response with JSON Format
  app.use(bodyParser.json());
  //Get Objects from request (PUT,POST)
  app.use(bodyParser.urlencoded({ extended: true }));
  /******** Models Importations *****************/
  const Match=require(".models/match");
  
  
  
  
  /******** Business Logic *****************/
  /**** Get All matches */
  app.get("/matches", (request, response) => {
    //B.L
    console.log("here into BL :Get All Matches");
    response.json({ matches: MatchesTab, status: true })
  });
  app.get("/teams", (request, response) => {
    //B.L
    console.log("here into BL :Get  All teams ");
    response.json({ teams: teamsTab, status: true })
  });
  app.get("/players", (request, response) => {
    //B.L
    console.log("here into BL :Get  All players ");
    response.json({ players: playersTab, status: true })
  });
  
  /*** Get Match By iD */
  app.get("/matches/:id", (request, response) => {
    let id = request.params.id;
    let element = MatchesTab.find(match => match.id == id); // Use a unique property of MatchesTab to find the match
  
    response.json({ match: element }); // Return the found match
  
  });
  app.get("/teams/:id", (request, response) => {
    let id = request.params.id;
    let element = teamsTab.find(team => team.id == id); // 
  
    response.json({ team: element }); // Return the found team
  
  });
  app.get("/players/:id", (request, response) => {
    let id = request.params.id;
    let element = playersTab.find(player => player.id == id); // Use a unique property of MatchesTab to find the match
  
    response.json({ player: element }); // Return the found match
  
  });
  
  //** Delete Match By ID */
  
  app.delete("/matches/:id", (request, response) => {
     matchId = request.params.id;
     matchIndex = MatchesTab.findIndex(match => match.id ==matchId);
    
    if (matchIndex !== -1) {
      MatchesTab.splice(matchIndex, 1);
      response.json({ matches: MatchesTab, response: true });
    } else {
      response.json({ response: false});
    }
  })
  app.delete("/teams/:id", (request, response) => {
    teamID = request.params.id;
   const teamIndex = teamsTab.findIndex(team => team.id ==teamID);
   
   if (teamIndex !== -1) {
     teamsTab.splice(teamIndex, 1);
     response.json({ teams: teamsTab, response: "deleted" });
   } else {
     response.json({ error: "team not found" });
   }
  })
  app.delete("/players/:id", (request, response) => {
    playerID = request.params.id;
   const playerIndex = playersTab.findIndex(player => player.id ==playerID);
   
   if (playerIndex !== -1) {
     playersTab.splice(playerIndex, 1);
     response.json({ players: playersTab, response: "deleted" });
   } else {
     response.json({ error: "Player not found" });
   }
  })
  
  //** Add Match By ID */
  
  app.post("/matches", (request, response) => {
    console.log("here into BL :Add Match", request.body)
  
    let id = IdGenerator(MatchesTab) + 1
    let match = request.body
    match.id = id
    MatchesTab.push(match)
    response.json({response:"added"}); // Return the found match
  
    //B.L : Add  Match 
  });
  app.post("/players/", (request, response) => {
    let id = IdGenerator(playersTab) + 1
    let player = request.body
    player.id = id
    playersTab.push(player)
    response.json({ players: playersTab, response: "added" }); // Return the found match
  
    //B.L : Add  Match 
    console.log("here into BL :Add player", request.body, id)
  });
  app.post("/teams/", (request, response) => {
    let id = IdGenerator(teamsTab) + 1
    let team = request.body
    team.id = id
    teamsTab.push(team)
    response.json({ teams: teamsTab, response: "added" }); // Return the found match
  
    //B.L : Add  Match 
    console.log("here into BL :Add team", request.body, id)
  });
  //*******Edit match*****/
  app.put("/matches/", (request, response) => {
    let match = request.body
    id = match.id
    let index = MatchesTab.findIndex(elt => elt.id == id);
    MatchesTab[index] = match
    response.json({response: true });
  });
  
  app.put("/teams/", (request, response) => {
    let team = request.body
    id = team.id
    let index = teamsTab.findIndex(elt => elt.id == id);
    teamsTab[index] = team
    response.json({ teams: teamsTab, response: "added" });
  });
  app.put("/players/", (request, response) => {
    let player = request.body
    id = player.id
    let index = playersTab.findIndex(elt => elt.id == id);
    playersTab[index] = match
    response.json({ matchs: playersTab, response: "added" });
  });
  
  app.post("/users/", (request, response) => {
    let newUser = request.body; // Use a different variable name for the new user
    let emailExists = Users.find(user => user.email === newUser.email); // Use newUser to avoid shadowing
  
    if (!emailExists) {
      let id = IdGenerator(Users) + 1;
      newUser.id = id;
      Users.push(newUser);
      response.json({ users: Users, response: "added" });
    } else {
      response.json({ response: "email already exists in Users" });
    }
  });
  
  app.post("/login/", (request, response) => {
    let newUser = request.body; // Use a different variable name for the new user
    let userExists = Users.find(user => user.email === newUser.email && user.pwd === newUser.pwd ); // Use newUser to avoid shadowing
  
    if (userExists) {
      
      response.json({ users:Users,response: "Login with sucess" });
    } else {
      response.json({ response: "Please  check  your Credentials" });
    }
  });
  app.post("/search/", (request, response) => {
    let newMatch = request.body;
    let matchsExists = MatchesTab.filter(match => match.scoreOne == newMatch.scoreOne && match.scoreTwo == newMatch.scoreTwo);
  
    if (matchsExists.length > 0) { 
      response.json({ matches: matchsExists, response: "Matches exist", allmatches: MatchesTab });
    } else {
      response.json({ response: "There are no matches" });
    }
  });
  
  
  
  
  
  
  
  
  
  //************* Export Application ****************///
  //Make app exportable
  module.exports = app;
  
  