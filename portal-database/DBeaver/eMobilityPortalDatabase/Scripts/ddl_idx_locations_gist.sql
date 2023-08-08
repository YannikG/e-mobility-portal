-- drop index idx_location_gist;

CREATE INDEX idx_location_gist ON locations 
USING GIST(ll_to_earth(google_coordinate_lat, google_coordinate_long));