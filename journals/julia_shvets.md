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

Week 16:

3/11. Worked on the frontend component that has a form "Add Game". Was trying to figure out how to not submit the game with the same title. I gave title unique constraint.

3/12. Moved to working on "All Games" frontend component. Added 3 endpoints for listing favorite games, wishlist games and owned games. Added 3 new components: wishlist games, want to play games, favorite games - these are just lists. Working on "favoriting" games feature.

3/13. Continued working on GameList Component. Was able to implement search functionality through filter and displaying a list of games based on a search term. Simultaneously, worked on "Add to" button functionality. I implemented a popover window that provides different options of adding a game to a specific list through respective API calls.

3/14. Worked on "favorites" feature on the game card. Created a child component, Like Button. With one function handleLike, able to make 2 different api calls through conditional rendering.

Week 17:
3/18. Worked on Game Detail front end component. Found it challenging to figure out how to implement the forwarding to the detail page of each game from lists of games. Managed to implement it by using Params.

3/19. Proceeded working on Game Detail component. Figured out the layout and styling of how the data will be rendered on page. Decided to go with tabs from Flowbite to display the description, rules and video. Blocker - embedding a video in instructional video section.

3/20. Managed to successfully display video in instructional video section through installing react-player with nmp install react-player directly in ghi docker container. Proceeding to work on unit tests.

3/21. I worked on pytests and making them pass. We had to implement the token as our endpoints are protected, but it would expire. So then we had to mock the authentication process by overriding the dependency that verifies the token and instead providing a simulated, authenticated user. This will allow to bypass the need for a real, valid token and avoid the issue of token expiration during testing. It passes the test and the pipelines in gitlab.
