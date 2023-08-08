-- drop table chargingstationavailability;

create table chargingstationavailability as (
	select distinct 
		replace((b.EVSEStatusRecord::JSON->'EvseID')::varchar(50),'"','') as charging_station_id,
		replace((b.EVSEStatusRecord::JSON->'EVSEStatus')::varchar(50),'"','') as availability,
		now()::timestamptz as import_timestamp
	from (
		SELECT
			json_array_elements_text(a.EVSEStatuses::JSON->'EVSEStatusRecord')::JSON as EVSEStatusRecord
		from(
			SELECT
			json_array_elements_text(json_string::JSON->'EVSEStatuses')::JSON as EVSEStatuses
			from public.dynamicdataraw
		) as a
	) as b
);