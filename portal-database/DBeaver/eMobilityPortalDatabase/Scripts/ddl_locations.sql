-- public.locations definition

-- Drop table

-- DROP TABLE public.locations;

CREATE TABLE public.locations (
	location_id text not NULL,
	provider_id text NULL,
	provider text NULL,
	street text NULL,
	postal_code text NULL,
	city text NULL,
	google_coordinate_lat float4 NULL,
	google_coordinate_long float4 NULL,
	is_open_24h text NULL,
	accessibility text null,
	import_timestamp timestamptz NULL
);