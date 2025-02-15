CREATE TABLE profile (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE shops (
    user_id INT PRIMARY KEY,
    username VARCHAR(50),
    rating INT CHECK (rating BETWEEN 1 AND 5),
    message VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES profile(user_id)
);

CREATE TABLE preference (
    user_id INT PRIMARY KEY,
    coffee_id VARCHAR(50),
    ingredients VARCHAR(255),
    temperature VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES profile(user_id)
);

CREATE TABLE coffee_id (
    coffee_id SERIAL PRIMARY KEY,
    name VARCHAR (100) NOT NULL,
    description TEXT,
    origin varchar(100),
    roast_level VARCHAR(50),
    caffeine_content VARCHAR(50)
);

CREATE TABLE login_sessions (
    session_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    jwt_token TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES profile(user_id) ON DELETE CASCADE
);