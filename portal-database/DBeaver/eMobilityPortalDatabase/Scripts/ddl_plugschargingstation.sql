-- public.plugschargingstation definition

-- Drop table

--DROP TABLE public.plugschargingstation;

CREATE TABLE public.plugschargingstation (
	plug_id int4 NULL,
	charging_station_id text null,
	import_timestamp timestamptz NULL
);