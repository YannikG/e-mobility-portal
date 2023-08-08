-- DROP TRIGGER t_chargingstations_insert;

CREATE TRIGGER t_chargingstations_insert
AFTER INSERT ON public.staticdataraw
FOR EACH STATEMENT
EXECUTE FUNCTION tf_chargingstations_insert();