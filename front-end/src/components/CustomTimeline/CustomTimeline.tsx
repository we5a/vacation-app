import React, {type FC } from "react";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
} from "react-calendar-timeline";
import moment from "moment";

import styles from "./CustomTilemeline.module.scss";
import { group } from "console";

type TUser = {
  id: string;
  title: string;
  stackItems?: boolean;
};

interface CustomTimelineProps {
  users: any[];
  items: any[];
}

const CustomTimeline: FC<CustomTimelineProps> = ({ users, items }) => {
  // console.log("Time", items);
  // console.log("Groups", users);

  return (
    <Timeline
      groups={users}
      items={items}
      defaultTimeStart={moment().subtract(1, 'month')}
      defaultTimeEnd={(moment().add(3, 'months'))}
      canMove={false}
      canResize={false}
      canChangeGroup={false}
      stackItems={true}
      className={styles.timeline}
      sidebarWidth={240}
      buffer={1}
      // minZoom={4}
      // maxZoom={8}
      // 15 * 60 * 1000
      // dragSnap={60*1000}
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

export default  React.memo(CustomTimeline);
 