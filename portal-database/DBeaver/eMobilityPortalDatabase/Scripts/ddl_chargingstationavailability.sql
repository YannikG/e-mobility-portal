-- public.chargingstationavailability definition

-- Drop table

-- DROP TABLE public.chargingstationavailability;

CREATE TABLE public.chargingstationavailability (
	charging_station_id text NULL,
	availability text NULL,
	import_timestamp timestamptz NULL
);