const request = require("request");
const chalk = require("chalk");

module.exports = function (vorpal) {
  vorpal
    .command('worldcup2018')
    .description('Display scores of soccer world cup 2018')
    .action(function (args, callback) {
      const requestUrl = `http://worldcup.sfg.io/matches/today`;
      this.log(requestUrl);

      request.get(requestUrl, (error, response, body) => {
        if (error) {
          callback(error);
          return error;
        }
        body = JSON.parse(body);

        const result = body.map(match => {
          const homeTeam = match.home_team.country
          const homeGoals = match.home_team.goals
          const awayTeam = match.away_team.country
          const awayGoals = match.away_team.goals

          const status = match.status
          const color = status === 'completed' ? chalk.green : status === 'in progress' ? chalk.yellow : chalk.gray
          const message = `${homeTeam} ${homeGoals} - ${awayTeam} ${awayGoals}`

          return color(message)
        }).join('\n')

        callback(result);
      });
    })
}