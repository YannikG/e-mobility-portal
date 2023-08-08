create table public.userfavourites (
	user_id varchar(50) primary key not null,
	location_id varchar(50)
)

create table public.userplugs (
	user_id varchar(50) primary key not null,
	plug_id int
)
