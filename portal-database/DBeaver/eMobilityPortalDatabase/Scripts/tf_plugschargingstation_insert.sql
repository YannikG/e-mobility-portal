-- DROP FUNCTION tf_plugschargingstation_insert();

CREATE OR REPLACE FUNCTION tf_plugschargingstation_insert() RETURNS TRIGGER as '

BEGIN

    DELETE FROM plugschargingstation;

	INSERT INTO plugschargingstation(plug_id, charging_station_id, import_timestamp)
	select distinct 
			CASE c.plug
				WHEN ''CCS Combo 1 Plug (Cable Attached)'' THEN 1
			    WHEN ''Type 2 Outlet'' THEN 2
			    WHEN ''CHAdeMO'' THEN 3
			    WHEN ''Type F Schuko'' THEN 4
			    WHEN ''Type J Swiss Standard'' THEN 5
			    WHEN ''Type 2 Connector (Cable Attached)'' THEN 6
			    WHEN ''Type 1 Connector (Cable Attached)'' THEN 7
			    WHEN ''Tesla Connector'' THEN 8
			    WHEN ''CCS Combo 2 Plug (Cable Attached)'' THEN 9
			    ELSE 0
			end as plug_id,
			c.charging_station_id,
			now()::timestamptz as import_timestamp
		from (
			select distinct 
				json_array_elements_text(b.EVSEDataRecord::JSON->''Plugs'')::text as plug,
				replace((b.EVSEDataRecord::JSON->''EvseID'')::varchar(50),''"'','''') as charging_station_id
			from (
				SELECT
					json_array_elements_text(a.EVSEData::JSON->''EVSEDataRecord'')::JSON as EVSEDataRecord
				from(
					SELECT
					json_array_elements_text(json_string::JSON->''EVSEData'')::JSON as EVSEData
					from public.staticdataraw
					WHERE import_timestamp = (SELECT MAX(import_timestamp) FROM public.staticdataraw)
				) as a
			) as b
		) as c;

  RETURN NULL;
END;
' LANGUAGE plpgsql;
