-- DROP TRIGGER t_plugs_insert;

CREATE TRIGGER t_plugs_insert
AFTER INSERT on public.staticdataraw
FOR EACH STATEMENT
EXECUTE FUNCTION tf_plugs_insert();
