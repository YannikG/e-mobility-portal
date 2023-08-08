-- public.plugs definition

-- Drop table

--DROP TABLE public.plugs;

CREATE TABLE public.plugs (
	plug_id int4 NULL,
	plug text null,
	import_timestamp timestamptz NULL
);