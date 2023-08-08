-- public.userplugs definition

-- Drop table

-- DROP TABLE public.userplugs;

CREATE TABLE public.userplugs (
	user_id varchar(50) NOT NULL,
	plug_id int4 NULL,
	CONSTRAINT userplugs_pkey PRIMARY KEY (user_id)
);