create table
    public.strava_events (
                             id bigint generated by default as identity,
                             created_at timestamp with time zone null default now(),
                             data jsonb not null,
                             is_processed boolean not null default false,
                             constraint strava_events_pkey primary key (id)
) tablespace pg_default;

