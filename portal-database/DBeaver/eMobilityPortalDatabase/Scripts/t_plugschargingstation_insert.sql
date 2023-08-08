-- DROP TRIGGER t_plugschargingstation_insert; 

CREATE TRIGGER t_plugschargingstation_insert
AFTER INSERT ON public.staticdataraw
FOR EACH STATEMENT
EXECUTE FUNCTION tf_plugschargingstation_insert();