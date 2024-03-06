steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE locations (
            id SERIAL PRIMARY KEY NOT NULL,
            city VARCHAR(100) NOT NULL,
            state VARCHAR(100) NOT NULL,
            state_abbrev VARCHAR(2) NOT NULL,
            weather VARCHAR(1000)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE locations;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE venues (
            id SERIAL PRIMARY KEY NOT NULL,
            venue_name VARCHAR(1000) NOT NULL,
            online BOOLEAN NOT NULL,
            online_platform VARCHAR(100) NOT NULL,
            location_id INT REFERENCES locations (id),
            hours_operation VARCHAR(50) NOT NULL,
            phone_number VARCHAR(50),
            venue_type VARCHAR(100),
            reservation_req BOOLEAN NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE venues;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE members (
            id SERIAL PRIMARY KEY NOT NULL,
            first_name VARCHAR(50) NOT NULL,
            last_name VARCHAR(50) NOT NULL,
            username VARCHAR(20) UNIQUE NOT NULL,
            hashed_password VARCHAR(200) NOT NULL,
            age SMALLINT NOT NULL,
            skill_level TEXT NOT NULL,
            avatar TEXT NOT NULL,
            about TEXT,
            location_id INT REFERENCES locations (id),
            password VARCHAR(15)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE members;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE games (
            id SERIAL PRIMARY KEY NOT NULL,
            title VARCHAR(200) NOT NULL,
            year INT,
            min_players INT,
            max_players INT,
            play_time VARCHAR(50),
            age VARCHAR(20),
            description TEXT,
            rules TEXT,
            picture VARCHAR (300),
            video TEXT,
            complexity VARCHAR(200),
            category VARCHAR(200),
            rating INT
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE games;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE events (
            id SERIAL PRIMARY KEY NOT NULL,
            game VARCHAR(100) NOT NULL,
            venue INT REFERENCES venues (id),
            date_time TIMESTAMP NOT NULL,
            competitive_rating VARCHAR(20) NOT NULL,
            max_players SMALLINT NOT NULL,
            max_spectators SMALLINT NULL,
            min_age SMALLINT NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE events;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE games_members(
            id SERIAL NOT NULL,
            game_id INTEGER NOT NULL REFERENCES members(id),
            member_id INTEGER NOT NULL REFERENCES games(id),
            member_game_list VARCHAR(50) NOT NULL,
            CONSTRAINT game_sort CHECK (member_game_list in ('favorites', 'wishlist')),
            CONSTRAINT games_members_pk PRIMARY KEY(game_id, member_id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE games_members;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE members_events (
            id SERIAL NOT NULL,
            member_id INTEGER NOT NULL REFERENCES events(id),
            event_id INTEGER NOT NULL REFERENCES members(id),
            attendee_type VARCHAR(50) NOT NULL,
            CONSTRAINT attendee_sort CHECK (attendee_type in ('player', 'spectator')),
            CONSTRAINT members_events_pk PRIMARY KEY(member_id, event_id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE members_events;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE games_events(
            id SERIAL NOT NULL,
            game_id INTEGER REFERENCES events(id),
            event_id INTEGER REFERENCES games(id),
            CONSTRAINT games_events_pk PRIMARY KEY(game_id, event_id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE game_events;
        """
    ]
]
