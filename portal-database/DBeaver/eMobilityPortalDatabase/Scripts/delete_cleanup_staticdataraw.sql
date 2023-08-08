DELETE FROM public.staticdataraw WHERE import_timestamp < now() - INTERVAL '1 month';
