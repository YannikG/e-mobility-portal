-- public.userfavourites definition

-- Drop table

-- DROP TABLE public.userfavourites;

CREATE TABLE public.userfavourites (
	user_id varchar(50) NOT NULL,
	location_id varchar(50) NULL,
	CONSTRAINT userfavourites_pkey PRIMARY KEY (user_id)
);