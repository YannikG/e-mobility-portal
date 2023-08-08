SELECT l.location_id, l.provider, l.street, l.city, l.postal_code, c.charging_station_id, ca.availability, p.plug_id, p.plug  FROM locations l 
LEFT JOIN chargingstations c ON c.location_id = l.location_id 
LEFT JOIN chargingstationavailability ca ON ca.charging_station_id  = c.charging_station_id 
LEFT JOIN plugs p ON p.plug_id  = c.plug_id 
WHERE l.location_id  = 'CH*ECUEV52WLYNJMK9LW7CXLBTFA2US8S'
