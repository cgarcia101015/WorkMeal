# Work Meal

When lunchtime at work hits, do you ever feel like you don't know what to do? You know what you want, but should you cook and bring it in? Or go out and grab something? Work Meal to the rescue! Your new slackbot friend is available to bounce some ideas off of. 

## How It Works 

* When Slackbot Work Meal starts, it will ask you: "Would you like to cook or eat our for lunch today?" 

* Respond with a message that says either "cook" or "eat out". 

* If you reply with the message "cook", Work Meal will ask you "What do you want to cook?" Respond with any meal you'd like! Work Meal will call the edamam API to find a perfect recipe for your request. 

* If you replied with the message "eat out", Work Meal will ask you "What do you want to grab?" Respond with whatever food you'd like! Work Meal will call the zomato API to find restuarants near you that have that meal. 

## How to Run Locally

* Open your terminal

  ```
  git clone https://github.com/cgarcia101015/WorkMeal.git
  cd WorkMeal
  npm install 
  ```

* Edit the `config.json` file you have your password for your sql database tool. 

* In your sql database tool create a database called mealsdb. 

## Command

Run Work Meal locally by running `node server.js` in your terminal. 

* If completed successfully you should see all of the files uploaded to GitHub.

* All other group members should now clone the repo.

* Discuss as a group:

  * How would you now add changes to this project?
