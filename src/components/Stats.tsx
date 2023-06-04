'use client';
import { SummaryActivity } from '@/shared/types/strava/SummaryActivity';
import AnnualGoal from '@/components/AnnualGoal';
import MessageBlock from '@/components/MessageBlock';
import useActivityStats from '@/hooks/useActivityStats';
import { useAtom } from 'jotai';
import { annualHourGoalAtom } from '@/shared/atoms';
import ProgressCircle from '@/components/ProgressCircle';
import { StatsRow } from '@/components/StatsRow';
import HorizontalSpacer from '@/components/HorizontalSpacer';
import SportsBreakdown from '@/components/SportsBreakdown';

interface Props {
  activityStats: SummaryActivity[];
}

export default function Stats({ activityStats }: Props) {
  const [annualHourGoal, setAnnualHourGoal] = useAtom(annualHourGoalAtom);

  const { secondsPerDayToComplete, requiredActivityPerDay, year, month, day } =
    useActivityStats(annualHourGoal, new Date(), activityStats);

  // console.debug(year.sportStatistics);
  return (
    <>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="pb-4">
          <AnnualGoal
            value={annualHourGoal}
            onYearGoalChange={hours => {
              setAnnualHourGoal(hours);
            }}
          />
        </div>
        <HorizontalSpacer />
        <div className="grid gap-4 place-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mb-4">
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <ProgressCircle percentageComplete={year.percentageComplete} />
          </div>
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <MessageBlock
              header={year.projectedTotal().human}
              message={'Projected total'}
            />
          </div>
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <MessageBlock
              header={requiredActivityPerDay().human}
              message={'Per day'}
            />
          </div>
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <MessageBlock
              header={secondsPerDayToComplete().human}
              message={'Per day to complete'}
            />
          </div>
        </div>
        <HorizontalSpacer />
        <StatsRow
          title={year.totalMovingTime().human}
          subTitle="total moving time for the year"
          percentage={year.percentageAhead}
          period="year"
          messageBlocks={[
            {
              id: 'year.timeAhead',
              header: year.timeAhead().human,
              message: 'time ahead for year'
            },
            {
              id: 'year.actualDailyAverage',
              header: year.actualDailyAverage().human,
              message: 'average daily activity time'
            }
          ]}
        />
        <StatsRow
          title={month.totalMovingTime().human}
          subTitle="total moving time for the month"
          percentage={month.percentageAhead}
          period="month"
          messageBlocks={[
            {
              id: 'month.timeAhead',
              header: month.timeAhead().human,
              message: `time ${
                month.timeAhead().duration.isAhead ? 'ahead' : 'behind'
              } for month`
            },
            {
              id: 'month.averageDaily',
              header: month.averageDaily().human,
              message: 'average daily activity time'
            }
          ]}
        />
        <StatsRow
          title={day.totalMovingTime().human}
          subTitle="total moving time for the day"
          percentage={day.percentageAhead}
          period="day"
          messageBlocks={[
            {
              id: 'day.timeAhead',
              header: day.timeAhead().human,
              message: `time ${
                day.timeAhead().duration.isAhead ? 'ahead' : 'behind'
              } for day`
            }
          ]}
        />
        <div className="flex  justify-center">
          <SportsBreakdown sportStatistics={year.sportStatistics} />
        </div>
      </div>
    </>
  );
}
