## Journals

Please keep all of your individual journals in this directory.

Each team member is required to keep a development journal, which should be a single markdown file with an entry for each day the project was worked on.

## Week 17

### 22 March 2024

Merged all front-end changes into main.

My Venues List page holds the online venues list, in person venues list, and the add a new venue form. The add a new venue form holds the add a new location form inside of it.

## Week 16

### 11 March 2024

Installed Tailwind/Flowbite for front-end library.

Updated TESTING.md to house instructions for testing app while using Docker on local computer. Now it includes instructions for navigating to the front and back end sites with screenshots.

## Week 15

### 4 March 2024

Added "member_game_list" column to "Games_Members" table. This column will allow us to
set the games the member saves into either their favorites or wishlist/Want to play list.
An endpoint will neeed to be created to pull a members games set to favorites and another endpoint will be needed to pull a members games set to wishlist/want to play. Wishlist and Want To Play are interchangeable, but wishlist is easier to type for the backend.

Added "attendee_type" column to "Member_events" table. This column will allow members to sign up for events as either a player or a spectator. Two endpoints will need to be created for each of these options. One for a players list and one for a spectators list.

## Week 14

### 29 Feb 2024

Added Venues and Locations tables to migrations file
Created several Venues BaseModels for endpoints
Created several Venues methods to interact with the database


### 1 March 2024

Completed 5 Venues endpoints:
- Create new venue
- List venues
- Venue details
- Update venue
- Delete venue

Completed 4 Pydantic models for Venues

Completed 5 methods in the Venue repository class to support endpoints

Started Locations endpoints, Pydantic models, and repository methods:
- Create Location is fully functional

Now that venues is complete, I merged 2 development branches for ease of maintenance - Locations & Venues

### 29 Feb 2024

Changed FastAPI version in requirements.txt file to satisfy dependancy requirements with jwtdown-fastapi

Added Venues and Locations tables to migrations file

Created several Venues Pydantic BaseModels for endpoints

Created several Venues methods to interact with the database

## Week 13

Created GitLab group
Forked project to group and removed fork relationship
Created Journal files for each team member
Cloned project to local computer and tested Docker containers

Created wireframes for project features and user interface
Planned API endpoints for Venues model
Created & Submitted MVP (minimum viable product) for final project

Started a map to represent the project functionality for the README - to be updated as the project is built
