create database desafio_final;

create table Users (
  id serial primary key,
  name text not null,
  email text not null unique,
  password text not null,
  cpf varchar(14) unique,
  phone varchar(20) unique
);


create table costumers(
	id serial primary key,
  user_id integer not null references users(id),
  name text not null,
  email text not null unique,
  cpf varchar(14) not null unique,
  phone varchar(20) not null unique,
  cep varchar(20),
  public_place text,
  complement text,
  neighborhood text,
  city varchar(20),
  state varchar(20),
  status text default 'Em dia'
); 

create table charges(
  id serial primary key,
  costumer_id integer not null references costumers(id),
  costumer_name text not null,
  description text not null,
  status text not null,
  value integer not null,
  charge_date date not null
);
