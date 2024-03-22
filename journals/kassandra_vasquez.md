## Week 17
3/21

I continued working on getting my authentication working with my frontend event components without errors. After getting them working and completed, I moved on to making a unit test for the events.

3/20

I tested my event fronted components with venues to make sure all my endpoint and components are working and rendering on the page. I got details, create form, and all listed events working.

3/19

I worked on adjusting the members event list page to show all the events the user has created as well as the spectator and playing events. Changed the navigation to update the users events list. Tried to make a pytest to test the list all events, but kept running into errors.

3/18

I worked on getting my frontend components to work, testing them, and passing pipelines. I ran into a small block where I kept getting pipeline error because I forgot about a loose apostrophe in a sentence but once i fixed it, my pipelines were passing. I then moved on to work on the navigation section and added my routes to the frontend components.

## Week 16
3/14

I worked on the rough draft for my frontend components for all events list, create event form, the event details page, and the members events list.

3/13

I continued working on the the members attendance status endpoint player_or_spectating, that I broke down into two methods. one for spectating and one for playing and making sure both the post and delete methods were working correctly.

3/12

I started with working on the events list frontend component. I switched off to make the player_or_spectating endpoint that was needed for keeping track of the attendance status of a member for an event.

3/11

I started working on my frontend components and as a group we decided we will be using the tailwind resource for frontend. I ran into a block when pulling down changes from main once tailwind was installed into the project getting an Plugin failed error.  I was able to get it fixed all I had to do along with pruning everything in docker was remove package-lock.json and node_modules and then npm i to reinstall them and rebuild volume posgres-data and rebuild docker containers.

Overall fix:

- install the latest docker
- Delete the package-lock.json and node_modules locally in the ghi folder then recreated them in the ghi folder by running npm i
- Afterwards, run these commands:
```
docker-compose down --remove-orphans
docker network prune # Answer Y
docker container prune # Answer Y
docker volume prune # Answer Y
docker image prune # Answer Y
```
- Then recreate the volume and ran docker-compose up

## Week 15
3/8
Accomplished:

Completed week 14 checkpoint goals: backend authorization complete, I completed 1 backend merge request which was completed and that followed checklist criteria, I had 1 protected endpoint completed, had 1 use of pydantic data validation, journal updated, and started building out frontend component.

3/7
I added protected endpoints to my events create, update, and delete and got that merged with the main. After I had to make some adjustemnets to my protected endpoints so they could work correctly and going back to my queries and fixing my events endpoints so they reference the venues table.

3/6
I worked on getting my fastapi docs link to load up to test my endpoints. Got both links working after restarting my computer. Testing out the events endpoints.

3/5
Ran into a block when I pulled changes from main and merged then into my branch and now fastapi docs web link doesn't load up, will continue to try and fix the issue.

3/4
worked on my queries and routes for delete then spend time fixing my pipeline fail issues, which were mostly formatting problems but got them fixed and pipelines are now passing. completed all my queries for events.


## Week 14

3/1
Accomplished:

Completed the week 14 checkpoint goals. Creating issues, finalizing and setting up database, creating at least 1 table with migrations completed, 1 backend endpoint completed with merge request, getting backend authentication started. I worked on getting get events and the get routes and also added the put for events and the routers for put into my branch.

2/29
Had a little block where I kept getting an error in git where my committed data wasn’t being fetched but figured out through more googling it was because of a hashtag in my branch name. After I started getting the events queries into vscode and into my git branch. I completed getting post for events and its router and worked on the joined table for members and events and got that into the migrations branch.

2/28
Created a new file in /queries directory, named events.py and discussed and finalized database decision and started outlining my database tables and views

2/27
discussed database setup and worked on database relationships and many to many relationships


## Week 13

Accomplished:

Completed the week 13 checkpoint. Wireframes, API Endpoints planning, MVP form, forking project repo. I got docker containers up and running and can be viewed for both localhost:8000/docs and localhost:5173/ on my local computer.
