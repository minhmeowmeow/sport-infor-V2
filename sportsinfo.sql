-- Create database if not exists
CREATE DATABASE sportsinfo;

-- Connect to the database
\c sportsinfo;

-- Drop tables if they exist (for re-running the script)
DROP TABLE IF EXISTS sport_country, record, recommend_score, player, organization, news, guestbook, country, users, team, tournament, sports, role;

-- Create table `country`
CREATE TABLE country (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

-- Insert data into `country`
INSERT INTO country (id, name) VALUES
(1, 'countryTest');

-- Create table `organization`
CREATE TABLE organization (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

-- Insert data into `organization`
INSERT INTO organization (id, name) VALUES
(1, 'orgTest');

-- Create table `recommend_score`
CREATE TABLE recommend_score (
  id SERIAL PRIMARY KEY,
  score INT,
  description VARCHAR(50)
);

-- Create table `guestbook`
CREATE TABLE guestbook (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  recommend_id INT,
  date_join TIMESTAMP WITH TIME ZONE,
  email VARCHAR(50),
  recommend_friend SMALLINT,
  message VARCHAR(500),
  FOREIGN KEY (recommend_id) REFERENCES recommend_score (id)
);

-- Create table `role`
CREATE TABLE role (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50)
);

-- Create table `sports`
CREATE TABLE sports (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  strategy VARCHAR(500) NOT NULL,
  is_team VARCHAR(50) NOT NULL,
  rule VARCHAR(500) NOT NULL,
  time_invented INT NOT NULL
);

-- Insert data into `sports`
INSERT INTO sports (id, name, strategy, is_team, rule, time_invented) VALUES
(1, 'sportTest', 'a', 'a', 'a', '1000-06-02');

-- Create table `sport_country`
CREATE TABLE sport_country (
  country_id INT NOT NULL,
  sport_id INT NOT NULL,
  year_join INT NOT NULL,
  total_score INT NOT NULL,
  international_trophy INT NOT NULL,
  PRIMARY KEY (country_id, sport_id),
  FOREIGN KEY (country_id) REFERENCES country (id),
  FOREIGN KEY (sport_id) REFERENCES sports (id)
);

-- Create table `team`
CREATE TABLE team (
  id SERIAL PRIMARY KEY,
  sport_id INT NOT NULL,
  organization_id INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  year_form INT NOT NULL,
  still_active BOOLEAN NOT NULL,
  FOREIGN KEY (sport_id) REFERENCES sports (id),
  FOREIGN KEY (organization_id) REFERENCES organization (id)
);

-- Insert data into `team`
INSERT INTO team (id, sport_id, organization_id, name, year_form, still_active) VALUES
(1, 1, 1, 'teamTest', 1111, 'true');

-- Create table `player`
CREATE TABLE player (
  id SERIAL PRIMARY KEY,
  team_id INT,
  sport_id INT,
  name VARCHAR(50),
  age INT,
  description VARCHAR(500),
  role VARCHAR(50),
  FOREIGN KEY (sport_id) REFERENCES sports (id),
  FOREIGN KEY (team_id) REFERENCES team (id)
);

-- Insert data into `player`
INSERT INTO player (id, team_id, sport_id, name, age, description, role) VALUES
(1, 1, 1, 'playerTest', 20, 'aaaaa', 'backline');


-- Create table `tournament`
CREATE TABLE tournament (
  id SERIAL PRIMARY KEY,
  sport_id INT,
  name VARCHAR(50),
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  FOREIGN KEY (sport_id) REFERENCES sports (id)
);

-- Insert data into `tournament`
INSERT INTO tournament (id, sport_id, name, start_date, end_date) VALUES
(1, 1, 'tournamentTest', '2024-06-04 10:02:24', '2024-06-13 10:02:24');

-- Create table `record`
CREATE TABLE record (
  id SERIAL PRIMARY KEY,
  player_id INT,
  tournament_id INT,
  record_type VARCHAR(50),
  record_value INT,
  date_recorded TIMESTAMP WITH TIME ZONE,
  FOREIGN KEY (player_id) REFERENCES player (id),
  FOREIGN KEY (tournament_id) REFERENCES tournament (id)
);

-- Create table `users`
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  role_id INT,
  username VARCHAR(50),
  password VARCHAR(100),
  email VARCHAR (100) UNIQUE,
  FOREIGN KEY (role_id) REFERENCES role (id)
);

-- Create table `news`
CREATE TABLE news (
  id SERIAL PRIMARY KEY,
  title VARCHAR(50),
  description VARCHAR(500),
  created_date TIMESTAMP WITH TIME ZONE,
  updated_date TIMESTAMP WITH TIME ZONE,
  user_id INT NOT NULL,
  sport_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user (id),
  FOREIGN KEY (sport_id) REFERENCES sport (id)
);
