-- public.dynamicdataraw definition

-- Drop table

-- DROP TABLE public.dynamicdataraw;

CREATE TABLE public.dynamicdataraw (
	json_string json NOT NULL,
	import_timestamp timestamptz NULL DEFAULT now()
);