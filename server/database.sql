CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create table users(
	id uuid primary key default uuid_generate_v4(),
	name varchar(255) not null,
	email varchar(255) not null,
	password varchar(255) not null
);

