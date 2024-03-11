steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE locations (
            id SERIAL PRIMARY KEY NOT NULL,
            online BOOLEAN NOT NULL,
            city VARCHAR(100) NOT NULL,
            state VARCHAR(100) NOT NULL,
            state_abbrev VARCHAR(3) NOT NULL,
            weather VARCHAR(1000)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE locations;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE venues (
            id SERIAL PRIMARY KEY NOT NULL,
            venue_name VARCHAR(1000) NOT NULL,
            online_link VARCHAR(100) NOT NULL,
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
        """,
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
            location_id INT REFERENCES locations (id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE members;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE games (
            id SERIAL PRIMARY KEY NOT NULL,
            title VARCHAR(255) UNIQUE NOT NULL,
            year INT NOT NULL,
            min_players INT NOT NULL,
            max_players INT NOT NULL,
            play_time VARCHAR(50) NOT NULL,
            age VARCHAR(20) NOT NULL,
            description TEXT NOT NULL,
            rules TEXT NOT NULL,
            picture VARCHAR (300) NOT NULL,
            video TEXT,
            complexity VARCHAR(100) NOT NULL,
            category VARCHAR(255) NOT NULL,
            rating INT
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE games;
        """,
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
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE owned_games (
            id SERIAL NOT NULL UNIQUE,
            member_id INTEGER NOT NULL REFERENCES members(id),
            game_id INTEGER NOT NULL REFERENCES games(id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE owned_games;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE favorite_games (
            id SERIAL NOT NULL UNIQUE,
            member_id INTEGER NOT NULL REFERENCES members(id),
            game_id INTEGER NOT NULL REFERENCES games(id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE favorite_games;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE wishlist_games (
            id SERIAL NOT NULL UNIQUE,
            member_id INTEGER NOT NULL REFERENCES members(id),
            game_id INTEGER NOT NULL REFERENCES games(id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE wishlist_games;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE members_events (
            id SERIAL NOT NULL,
            member_id INTEGER NOT NULL REFERENCES events(id),
            event_id INTEGER NOT NULL REFERENCES members(id),
            attendee_type VARCHAR(50) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE members_events;
        """,
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
        """,
    ]
]
