create table if not exists public.StaticDataRaw
(
	json_string JSON not null,
	import_timestamp timestamptz default now()	
);

create table if not exists public.DynamicDataRaw
(
	json_string JSON not null,
	import_timestamp timestamptz default now()	
);