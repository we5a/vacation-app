import { type FC } from "react";
import { type Vacation } from "store/types/vacation";
import VacationItem from "components/VacationItem/VacationItem";
import styles from "./VacationList.module.scss";

interface VacationListProps {
  items: Vacation[];
}

const VacationList: FC<VacationListProps> = ({ items = [] }) => {
  return (
    <div>
      <center className={styles.title}>
        {!!items.length
          ? "Your vacations list:"
          : "Your vacations list is empty"}
      </center>
      <div className={styles.list}>

      {items.map((item, index) => {
        return (
          <>
            <VacationItem item={item} number={index+1} key={item.id} />
          </>
        );
      })}
      </div>
    </div>
  );
};

export default VacationList;
