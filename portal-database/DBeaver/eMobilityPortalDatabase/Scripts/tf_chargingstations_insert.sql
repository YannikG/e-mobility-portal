-- DROP FUNCTION tf_chargingstations_insert();

CREATE OR REPLACE FUNCTION tf_chargingstations_insert() RETURNS TRIGGER as '

BEGIN

    DELETE FROM chargingstations;

	INSERT INTO chargingstations(charging_station_id, location_id, import_timestamp)
	SELECT DISTINCT
	    c.charging_station_id,
	    c.location_id,
	    now()::timestamptz as import_timestamp
	  FROM (
	    SELECT DISTINCT
	      replace((b.EVSEDataRecord::JSON->''EvseID'')::varchar(50),''"'','''') as charging_station_id,
	      replace((b.EVSEDataRecord::JSON->''ChargingStationId'')::varchar(50),''"'','''') as location_id
	    FROM (
	      SELECT
	        json_array_elements_text(a.EVSEData::JSON->''EVSEDataRecord'')::JSON as EVSEDataRecord
	      FROM (
	        SELECT
	          json_array_elements_text(json_string::JSON->''EVSEData'')::JSON as EVSEData
	        FROM public.staticdataraw
			WHERE import_timestamp = (SELECT MAX(import_timestamp) FROM public.staticdataraw)
	      ) AS a
	    ) AS b
	  ) AS c;

  RETURN NULL;
END;
' LANGUAGE plpgsql;
