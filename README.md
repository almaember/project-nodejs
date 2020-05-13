# GIT help
git remote add origin https://almaember@bitbucket.org/onlinevagyok/kreativliget-nodejs.git
git push -u origin master

# GIT remove remote
git remote remove origin

# Heroku
## Add remote
heroku git:remote -a kreativliget
## Force push
git push -f heroku master
## Logs
heroku logs --tail

# NODE enviroment on windows
SET NODE_ENV=development