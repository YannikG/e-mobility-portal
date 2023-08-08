-- DROP PROCEDURE sp_locations_insert();

CREATE OR REPLACE PROCEDURE sp_locations_insert() AS '
BEGIN

  DELETE FROM locations;

  INSERT INTO locations(location_id, provider_id, provider, street, postal_code, city, google_coordinate_lat, google_coordinate_long, is_open_24h, accessibility, import_timestamp)
	 SELECT DISTINCT 
		replace((b.EVSEDataRecord->>''ChargingStationId''),''"'','''') AS location_id,
		b.provider_id, 
		b.provider,
		replace((b.EVSEDataRecord->''Address''->>''Street''),''"'','''') AS street,
		replace((b.EVSEDataRecord->''Address''->>''PostalCode''),''"'', '''') AS postal_code,
		replace((b.EVSEDataRecord->''Address''->>''City''), ''"'', '''') AS city,
		split_part(replace(replace(replace((b.EVSEDataRecord->''GeoCoordinates''->>''Google''), ''"'', ''''),'','','' ''),''  '','' ''), '' '', 1)::REAL AS google_coordinate_lat,
    	split_part(replace(replace(replace((b.EVSEDataRecord->''GeoCoordinates''->>''Google''), ''"'', ''''),'','','' ''),''  '','' ''), '' '', 2)::REAL AS google_coordinate_long,
		replace((b.EVSEDataRecord->>''IsOpen24Hours''),''"'','''') AS is_open_24h,
		replace((b.EVSEDataRecord->>''Accessibility''),''"'','''') AS accessibility,
		now()::timestamptz as import_timestamp
	from(
		SELECT
		json_array_elements_text(a.EVSEData->''EVSEDataRecord'')::JSON AS EVSEDataRecord
		,replace((a.EVSEData->>''OperatorID''),''"'','''') AS provider_id
		,replace((a.EVSEData->>''OperatorName''),''"'','''') AS provider
		from(
			SELECT
			json_array_elements_text(json_string::JSON->''EVSEData'')::JSON AS EVSEData
			FROM public.staticdataraw
			WHERE import_timestamp = (SELECT MAX(import_timestamp) FROM public.staticdataraw)
			) AS a
		) AS b;
END;
' LANGUAGE plpgsql;

