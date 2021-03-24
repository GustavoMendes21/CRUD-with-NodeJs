create schema register

create table register.user (
    id uuid primary key,
    name text not null, 
    email text not null, 
    date timestamp default now()
)