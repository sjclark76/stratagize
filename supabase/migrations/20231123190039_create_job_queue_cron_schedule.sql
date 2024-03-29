CREATE  EXTENSION pg_cron;

-- Run this in PSQL to schedule pooling workers 20 seconds apart:
SET statement_timeout TO 0;
CREATE OR REPLACE FUNCTION schedule_jobs()
    RETURNS VOID
AS $body$
BEGIN
    -- Schedule retry job
    PERFORM cron.schedule(
            'job_queue_new',
            '* * * * *',
            $$ SELECT job_queue_new(); $$
            );
    -- Schedule second job with a 20-second delay
    PERFORM pg_sleep(5);

    PERFORM cron.schedule(
            'job_queue_processing',
            '* * * * *',
            $$ SELECT job_queue_processing(); $$
            );

    PERFORM cron.schedule(
                   'retry_jobs',
                   '* * * * *',
                   $$ SELECT job_queue_retry(); $$
           );

END;
$body$ LANGUAGE plpgsql;
