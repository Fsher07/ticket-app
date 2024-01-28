import React from "react";
import styles from "./ListItem.module.css";
import dayjs from "dayjs";

type ListItemProps = {
  key: string;
  name: string;
  ticket: {
    duration: number;
    time: Date;
    price: number;
  };
};

const ListItem = (props: ListItemProps) => {
  const time = dayjs(props.ticket.time).format("HH:mm");
  const roundedDuration = Math.round(props.ticket.duration / 60);
  return (
    <li className={styles.container}>
      <div>
        <p>Airport</p>
        <p>{props.name}</p>
      </div>
      <div>
        <p>Duration</p>
        <p>{roundedDuration}h</p>
      </div>
      <div>
        <p>Departure</p>
        <p>{time}</p>
      </div>
      <div>
        <p>Price</p>
        <p>{props.ticket.price}</p>
      </div>
    </li>
  );
};

export default ListItem;
