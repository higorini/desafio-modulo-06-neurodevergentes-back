create database desrio_final;

create table funcionarios(
	id serial primary key,
  nome text not null,
  email text not null unique,
  senha text not null,
  cpf char(14) unique,
  telefone varchar(20) unique
);

create table clientes(
	id serial primary key,
  funcionario_id integer not null references funcionarios(id),
  nome text not null,
  cpf char(14) not null unique,
  email text not null unique,
  telefone varchar(20) unique,
  status text not null
); 