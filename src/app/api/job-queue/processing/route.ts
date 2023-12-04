import { NextResponse } from 'next/server';
import serviceRoleDb from '@/shared/serviceRoleDb';
import { logDatabaseError } from '@/shared/logging/logDatabaseError';
import { batchSize } from '@/app/api/job-queue/constants';
import logError from '@/shared/logging/logError';
import { JobHandlerPayload } from '@/app/api/job-handler/types';

export async function POST() {
  console.log('processing jobs');

  const { data, error } = await serviceRoleDb
    .from('job_queue')
    .select('*')
    .eq('status', 'processing')
    .limit(batchSize);

  if (error) {
    logDatabaseError('an error occured retrieving processed jobs', error);
    return NextResponse.error();
  } else {
    if (data) {
      data.forEach(dataItem => {
        if (dataItem.url_path) {
          const payload: JobHandlerPayload<unknown> = {
            jobId: dataItem.job_id,
            payload: dataItem.payload
          };
          fetch(dataItem.url_path, {
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(payload),
            method: 'POST'
          });
        } else {
          logError(`missing job url_path for job number ${dataItem.job_id}`);
        }
      });
    }
    return NextResponse.json({ status: 'ok' });
  }
}
