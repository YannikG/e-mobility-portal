-- public.staticdataraw definition

-- Drop table

-- DROP TABLE public.staticdataraw;

CREATE TABLE public.staticdataraw (
	json_string json NOT NULL,
	import_timestamp timestamptz NULL DEFAULT now()
);