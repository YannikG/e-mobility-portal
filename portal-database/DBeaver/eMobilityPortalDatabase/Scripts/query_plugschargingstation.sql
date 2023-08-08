-- drop table plugschargingstation;

create table plugschargingstation as (
select distinct 
		CASE c.plug
			WHEN 'CCS Combo 1 Plug (Cable Attached)' THEN 1
			WHEN 'Type 2 Outlet' THEN 2
			WHEN 'CHAdeMO' THEN 3
			WHEN 'Type F Schuko' THEN 4
			WHEN 'Type J Swiss Standard' THEN 5
			WHEN 'Type 2 Connector (Cable Attached)' THEN 6
			WHEN 'Type 1 Connector (Cable Attached)' THEN 7
			WHEN 'Tesla Connector' THEN 8
			WHEN 'CCS Combo 2 Plug (Cable Attached)' THEN 9
			ELSE 0
		end as plug_id,
		c.charging_station_id,
		now()::timestamptz as import_timestamp
	from (
		select distinct 
			json_array_elements_text(b.EVSEDataRecord::JSON->'Plugs')::text as plug,
			replace((b.EVSEDataRecord::JSON->'EvseID')::varchar(50),'"','') as charging_station_id
		from (
			SELECT
				json_array_elements_text(a.EVSEData::JSON->'EVSEDataRecord')::JSON as EVSEDataRecord
			from(
				SELECT
				json_array_elements_text(json_string::JSON->'EVSEData')::JSON as EVSEData
				from public.staticdataraw
			) as a
		) as b
	) as c
);