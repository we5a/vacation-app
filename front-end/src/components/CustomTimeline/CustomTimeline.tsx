import type { FC } from "react";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
} from "react-calendar-timeline";
import moment from "moment";

import styles from "./CustomTilemeline.module.scss";

type TUser = {
  id: string;
  title: string;
};

interface CustomTimelineProps {
  users: TUser[];
}

const CustomTimeline: FC<CustomTimelineProps> = ({ users }) => {
  const items = [
    // each item is a vacation for the user
    {
      id: 2,
      group: "1", // group means userId
      title: "vacation",
      start_time: moment("2023-08-25", "YYYY-MM-DD"),
      end_time: moment("2023-09-11", "YYYY-MM-DD"),
    },
    {
      id: 3,
      group: "2",
      title: "vacation",
      start_time: moment("2023-09-05", "YYYY-MM-DD"),
      end_time: moment("2023-09-17", "YYYY-MM-DD"),
    },
  ];
  return (
    <Timeline
      groups={users}
      items={items}
      defaultTimeStart={moment("2023-06-01", "YYYY-MM-DD")}
      defaultTimeEnd={moment("2023-10-31", "YYYY-MM-DD")}
      canMove={false}
      canChangeGroup={false}
      stackItems={true}
      className={styles.timeline}
    >
      <TimelineHeaders calendarHeaderClassName={styles.calendarHeader}>
        <SidebarHeader>
          {({ getRootProps }) => {
            return (
              <div {...getRootProps()} className={styles.calendarLeftPanel}>
                Team
              </div>
            );
          }}
        </SidebarHeader>
        <DateHeader unit="primaryHeader" className={styles.dateHeader} />
        <DateHeader />
      </TimelineHeaders>
    </Timeline>
  );
};

export default CustomTimeline;
