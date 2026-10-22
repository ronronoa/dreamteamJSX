UPDATE "PatientLog"
SET report_data = jsonb_set(
  report_data #- '{responderDetails,teamAssigned}',
  '{responderDetails,dispositionType}',
  to_jsonb(
    CASE REGEXP_REPLACE(
      UPPER(COALESCE(
        report_data #>> '{responderDetails,teamAssigned,0}',
        report_data #>> '{responderDetails,teamAssigned}',
        ''
      )),
      '[^A-Z]',
      '',
      'g'
    )
      WHEN 'PICKUP' THEN 'PICK_UP'
      WHEN 'DROPOFF' THEN 'DROP_OFF'
      ELSE ''
    END
  ),
  true
)
WHERE report_data #> '{responderDetails,teamAssigned}' IS NOT NULL
  AND report_data #> '{responderDetails,dispositionType}' IS NULL;
