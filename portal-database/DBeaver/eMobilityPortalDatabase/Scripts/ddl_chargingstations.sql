-- public.chargingstations definition

-- Drop table

-- DROP TABLE public.chargingstations;

CREATE TABLE public.chargingstations (
	charging_station_id text NULL,
	location_id text NULL,
	import_timestamp timestamptz
);