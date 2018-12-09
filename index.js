const Discord = require("discord.js");
const client = new Discord.Client();
const DBL = require('dblapi.js');
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ5ODUxNDE1MDMwNjA4NjkyMiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTQxMDkwMjAyfQ.VCAe7xkn5sG8U_ny7EJUwTMlQvFtZX2cZ54XMFFNgyw', client);
const mysql = require('mysql');
let con = mysql.createConnection({
  host     : 'localhost',
  port     : '3306',
  user     : 'root',
  password : '',
  database : 'hello bot'
});
//dbl
dbl.on('posted', () => {
  console.log('Server count posted!');
})
dbl.on('error', e => {
 console.log(`Oops! ${e}`);
})
dbl.hasVoted("95579865788456960").then(voted => {
    if (voted) console.log("Tonkku has voted!!!")
});
//clinet.on
client.on("ready", () => {
  console.log("I am ready!");
  client.user.setActivity('Hello the game !help for help');
});
client.on("guildDelete", guild => {
  console.log(`jeg bliv farnet fra ${guild.name}`);
});
client.on("guildCreate", guild => {
  console.log(`Jeg bliv kl ${new Date()} addet til ${guild.name}`);
});
//var
var code;
var comname;
var banmember;
var author;
var xp;
var setup;
//kommandor
client.on("message", (message) => {
  if (message.author.bot) {
    return;
  }
  else if (message.content === "") {
    return;
  }
  if (message.content.startsWith("!Hello")) {
    message.channel.send("hello");
    author = message.author.id;
    con.query(`SELECT * FROM xp WHERE id = '${author}'`, (err, rows) => {
      if (err) throw err;
      let sql;
      if (rows.length < 1) {
        sql = `INSERT INTO xp (id, xp, coins) VALUES ('${author}', 1, 0)`;
      }
      else {
        xp = parseInt(rows[0].xp);
        coins = parseInt(rows[0].coins);
        xp = 1 + xp;
        console.log(coins)
        sql = `UPDATE xp SET xp = ${xp} WHERE id = ${author}`;
      }
      con.query(sql);
    });
      if (message.content === "!Hello level") {
        con.query(`SELECT * FROM xp WHERE id = '${author}'`, (err, rows) => {
          if (err) throw err;
          let sql;
          if (rows.length < 1) {
            sql = `INSERT INTO xp (id, xp) VALUES ('${author}', 1)`;
          }
          else {
            xp = parseInt(rows[0].xp);
            message.channel.send("Your Hello Level is: " + xp);
          }
        });
      }
    }
  else if (message.content === "!LoL") {
    message.channel.send("XD");
  }
  if (message.content === "!Xd") {
    message.channel.send("LOL");
  }
  else if (message.content === "!i am so sad") {
    message.channel.send("Can a cookie:cookie: help you?");
  }
  if (message.content === "!cookie plz") {
    message.channel.send("her ar a cookie:cookie:");
  }
  else if (message.content.startsWith("!echo ")) {
    var echomsg = message.content.split("!echo ")[1];
    message.channel.send(echomsg);
  }
  if (message.content === "!help") {
    message.channel.send("", {
      file: "C:/Users/Jette & Bjarke Lund/Desktop/discord-bot/Hej Bot/!help.png"
    });
  }
  else if (message.content.startsWith("!ncc ")) {
      code = message.content.split("!ncc ")[1];
  }
  if (message.content === "!yc" || message.content === comname) {
    message.channel.send(code);
  }
  else if (message.content === "!c") {
    message.channel.send("'!ncc' - create custom command (!nc {i say on run})");
    message.channel.send("'!ncn' - use this command after '!ncc' (! ncn {command name - !})")
    message.channel.send("'!yc' - use you custom command");s
  }
  if (message.content.startsWith("!ncn ")) {
    comname = "!" + message.content.split("!ncn ")[1];
  }
  else if (message.content.startsWith("!embed ")) {
    var embedtext = message.content.split("!embed ")[1];
    message.channel.send({
      embed: {
        title: "This is an embed",
        color: 3447003,
        description: `${embedtext}`
      }
    })
  }
  if(message.content === "!vote") {
    message.channel.send("URL to vote: https://discordbots.org/bot/498514150306086922/vote if you have voted !voted");
  }
  else if (message.content === "!voted") {
    dbl.hasVoted(message.author.id).then(voted => {
      if (voted) {
        message.channel.send("thanks for voting");
        console.log(message.author.tag + " Have voted");
      }
      else {
        message.channel.send("URL to vote: https://discordbots.org/bot/498514150306086922/vote if you have voted !voted");
      }
    });
  }
  if (message.content.startsWith("https://")) {
    message.delete(1);
  }
  else {
    return;
  }
});
//function
client.login("NDk4NTE0MTUwMzA2MDg2OTIy.Dpu1Bg.ZsoehrQR-WpSLf9yHuNek2UKP_w");
