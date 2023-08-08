-- drop table chargingstations;

create table chargingstations as (
	select distinct 
		c.charging_station_id,
		c.location_id,
		now()::timestamptz as import_timestamp
	from (
		select distinct 
			replace((b.EVSEDataRecord::JSON->'EvseID')::varchar(50),'"','') as charging_station_id,
			replace((b.EVSEDataRecord::JSON->'ChargingStationId')::varchar(50),'"','') as location_id
		from (
			SELECT
				json_array_elements_text(a.EVSEData::JSON->'EVSEDataRecord')::JSON as EVSEDataRecord
			from(
				SELECT
				json_array_elements_text(json_string::JSON->'EVSEData')::JSON as EVSEData
				from public.staticdataraw
			) as a
		) as b
	) as c);