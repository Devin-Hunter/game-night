steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE members (
            id SERIAL PRIMARY KEY NOT NULL,
            first_name VARCHAR(50) NOT NULL,
            last_name VARCHAR(50) NOT NULL,
            username VARCHAR(20) NOT NULL,
            age SMALLINT NOT NULL,
            skill_level TEXT NOT NULL,
            avatar TEXT NOT NULL,
            about TEXT,
            member_since DATE NOT NULL DEFAULT CURRENT_DATE,
            location SMALLINT NOT NULL,
            games_list TEXT NOT NULL,
            events_list TEXT NOT NULL
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
            name VARCHAR NOT NULL,
            year_published INTEGER NOT NULL,
            number_of_players VARCHAR NOT NULL,
            playing_time VARCHAR NOT NULL,
            age VARCHAR NOT NULL,
            description TEXT NOT NULL,
            picture VARCHAR NOT NULL,
            video TEXT NOT NULL,
            complexity_level TEXT NOT NULL CHECK(complexity_level IN ('Easy', 'Medium', 'Difficult', 'Very Difficult')),
            category TEXT NOT NULL CHECK(category IN ('Abstract Strategy', 'Family', 'Party', 'Cards', 'Dice', 'Deduction', 'Campaign')),
            status TEXT NOT NULL CHECK(status IN ('Own', 'Want To Play', 'Favorite')),
            rating INTEGER NOT NULL CHECK(rating BETWEEN 1 AND 5)
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
            venue VARCHAR(200) NOT NULL,
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
        CREATE TABLE member_games (
            id SERIAL PRIMARY KEY NOT NULL,
            required_limited_text VARCHAR(1000) NOT NULL,
            required_unlimited_text TEXT NOT NULL,
            required_date_time TIMESTAMP NOT NULL,
            automatically_set_date_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            required_integer INTEGER NOT NULL,
            required_money MONEY NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE member_games;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE member_events (
            id SERIAL PRIMARY KEY NOT NULL,
            required_limited_text VARCHAR(1000) NOT NULL,
            required_unlimited_text TEXT NOT NULL,
            required_date_time TIMESTAMP NOT NULL,
            automatically_set_date_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            required_integer INTEGER NOT NULL,
            required_money MONEY NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE member_events;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE game_events (
            id SERIAL PRIMARY KEY NOT NULL,
            required_limited_text VARCHAR(1000) NOT NULL,
            required_unlimited_text TEXT NOT NULL,
            required_date_time TIMESTAMP NOT NULL,
            automatically_set_date_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            required_integer INTEGER NOT NULL,
            required_money MONEY NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE game_events;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE venues (
            id SERIAL PRIMARY KEY NOT NULL,
            required_limited_text VARCHAR(1000) NOT NULL,
            required_unlimited_text TEXT NOT NULL,
            required_date_time TIMESTAMP NOT NULL,
            automatically_set_date_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            required_integer INTEGER NOT NULL,
            required_money MONEY NOT NULL
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
        CREATE TABLE locations (
            id SERIAL PRIMARY KEY NOT NULL,
            required_limited_text VARCHAR(1000) NOT NULL,
            required_unlimited_text TEXT NOT NULL,
            required_date_time TIMESTAMP NOT NULL,
            automatically_set_date_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            required_integer INTEGER NOT NULL,
            required_money MONEY NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE locations;
        """,
    ],
]
