-- DROP TRIGGER t_chargingstationavailability_insert;

CREATE TRIGGER t_chargingstationavailability_insert
AFTER INSERT on public.dynamicdataraw
FOR EACH STATEMENT
EXECUTE FUNCTION tf_chargingstationavailability_insert();
