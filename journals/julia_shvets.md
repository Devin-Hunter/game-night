https://stackedit.io/app#

Week 13

We have finished checkpoints for Week 13. Completed: Wireframes, API endpoints, MVP form, the project is cloned onto local computer, docker is running, able to see:

-localhost:8000/docs

-localhost:5173/

Week 14

2/26: Discussed database setup. We have set on PostgreSQL.

2/27: Defined one to many, many to many relationships within the application.

2/28: Set up the database, created a successful merge request.

2/29: Worked on migrations, perfecting the table. Created pydantic models and started on 2 endpoints: create game and list all games.

3/1: Worked on create and list games endpoints. Tested their functionality on FastAPI.

Week 15:

3/4: Finished all game endpoints (create game, list all games, update game, delete game, get game details), made sure everything works. Starting to plan out how to tackle frontend. Will start out with just React, down the line might need to integrate Redux.

3/5: Reformatted the table games_members into 3 separate tables: favorite_games, owned_games, wishlist_games. Created 3 endpoints for those table, add_to_favorites, add_to_owned, add_to_wishlist.

3/6: Worked on GameList component in React.

3/7. Tried to install Tailwind. Was not achieved. Protected all of my endpoints. Predominantly worked on GameForm Component.

3/8. Continued working on frontend, mainly GameList and GameForm component. Realized that I needed to set Unique on title, so duplicate games won't be added to the database.
