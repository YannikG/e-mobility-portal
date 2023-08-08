-- drop table locations;

CREATE TABLE public.locations as(
SELECT DISTINCT 
	replace((b.EVSEDataRecord->>'ChargingStationId'),'"','') AS location_id,
	b.provider_id, 
	b.provider,
	replace((b.EVSEDataRecord->'Address'->>'Street'),'"','') AS street,
	replace((b.EVSEDataRecord->'Address'->>'PostalCode'),'"', '') AS postal_code,
	replace((b.EVSEDataRecord->'Address'->>'City'), '"', '') AS city,
	split_part(replace(replace(replace((b.EVSEDataRecord->'GeoCoordinates'->>'Google'), '"', ''),',',' '),'  ',' '), ' ', 1)::REAL AS google_coordinate_lat,
    split_part(replace(replace(replace((b.EVSEDataRecord->'GeoCoordinates'->>'Google'), '"', ''),',',' '),'  ',' '), ' ', 2)::REAL AS google_coordinate_long,
	replace((b.EVSEDataRecord->>'IsOpen24Hours'),'"','') AS is_open_24h,
	replace((b.EVSEDataRecord->>'Accessibility'),'"','') AS accessibility
from(
	SELECT
	json_array_elements_text(a.EVSEData->'EVSEDataRecord')::JSON AS EVSEDataRecord
	,replace((a.EVSEData->>'OperatorID'),'"','') AS provider_id
	,replace((a.EVSEData->>'OperatorName'),'"','') AS provider
	from(
		SELECT
		json_array_elements_text(json_string::JSON->'EVSEData')::JSON AS EVSEData
		FROM public.staticdataraw
		) AS a
	) AS b
);