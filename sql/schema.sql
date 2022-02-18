-- Útfæra schema

DROP TABLE IF EXISTS events;

CREATE TABLE IF NOT EXISTS events(
  id serial primary key,
  title varchar(64) NOT NULL,
  slug character varying(64) NOT NULL,
  info varchar(400),
  created timestamp not null default current_timestamp,
  updated timestamp
);

DROP TABLE IF EXISTS registrations;

CREATE TABLE IF NOT EXISTS registrations (
    reg_id serial primary key,
    name varchar(64) NOT NULL,
    comment varchar(400),
    event INT NOT NULL,
    created timestamp with time zone not null default current_timestamp

);
