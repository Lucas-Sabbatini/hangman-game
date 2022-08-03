var Twt = require('twit');
require("dotenv").config();
const axios = require('axios');
const fs = require('fs');

function sendRequest(palavra) {
  axios({
      method: 'get',
      url: 'https://api.twitter.com/2/tweets/search/recent?query='+ palavra +'%20lang%3Apt%20-is:retweet&expansions=author_id',
      headers: {'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAALkxaQEAAAAAdofeiyCgp6niqgog3OAQZUqC7j4%3D08KhcnFIBwnYOH82gajlzxkJzSd8fZbcuiivZpLYVrC7QtTA96'}

  }).then(function (response) {
      var responseData = new Object();
      console.log();
      var words= response.data;
      let tweets = [];
      let ids = [];
      let users = [];
      for (let i in words.data){
        tweets.push(words.data[i].text);
      }
      for (let i in words.data){
        ids.push(words.data[i].id);
      }
      for (let i in response.data.includes.users){
        users.push(response.data.includes.users[i].username);
      }
      responseData.tweets = tweets;
      responseData.ids = ids;
      responseData.users = users;

      process.send(responseData);
      process.exit();
      
  })
    .catch(function (response) {
    fs.writeFileSync('error.txt', JSON.stringify(response),(err)=>{if(err) throw err})
    process.exit();
      
  })
}
  
process.on('message', (msg) => {
  sendRequest(msg);
});