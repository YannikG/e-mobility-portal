-- DROP FUNCTION tf_plugschargingstation_insert();

CREATE OR REPLACE FUNCTION tf_plugs_insert() RETURNS TRIGGER AS '
BEGIN

  DELETE FROM plugs;

  INSERT INTO plugs(plug_id, plug, import_timestamp)
  SELECT DISTINCT
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
    END as plug_id,
    c.plug,
	now()::timestamptz as import_timestamp
  FROM (
    SELECT DISTINCT
      json_array_elements_text(b.EVSEDataRecord::JSON->''Plugs'')::text as plug
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
