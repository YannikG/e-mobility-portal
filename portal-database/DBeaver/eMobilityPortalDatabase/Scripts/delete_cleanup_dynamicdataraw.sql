DELETE FROM public.dynamicdataraw WHERE import_timestamp < now() - INTERVAL '2 days';