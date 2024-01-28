import styles from "./TicketList.module.css";
import { useFormStore } from "../../store/FormContext";
import dayjs from "dayjs";
import api from "../../services/mockApi";
import { useEffect, useState, useMemo } from "react";
import ListItem from "../ListItem/ListItem";

interface SortOrder {
  timestamp: "asc" | "desc";
  price: "asc" | "desc";
  duration: "asc" | "desc";
}

const TicketList = () => {
  const formValues = useFormStore();
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([] as any[]);
  const [sortOrder, setSortOrder] = useState<SortOrder>({
    timestamp: "asc",
    price: "asc",
    duration: "asc",
  });

  useEffect(() => {
    api
      .getTickets()
      .then((data) => {
        setTickets(data);
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
        setLoading(false);
      });
  }, [formValues]);

  const sortTickets = (sortBy: string) => {
    const sortedTickets = [...tickets];
    if (sortBy === "timestamp") {
      sortedTickets.sort((a, b) => {
        const aTime = dayjs(a.time).format("HH:mm");
        const bTime = dayjs(b.time).format("HH:mm");
        if (sortOrder.timestamp === "asc") {
          return aTime.localeCompare(bTime);
        } else {
          return bTime.localeCompare(aTime);
        }
      });
    } else if (sortBy === "price") {
      sortedTickets.sort((a, b) => {
        if (sortOrder.price === "asc") {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
    } else if (sortBy === "duration") {
      sortedTickets.sort((a, b) => {
        if (sortOrder.duration === "asc") {
          return a.duration - b.duration;
        } else {
          return b.duration - a.duration;
        }
      });
    }
    setTickets(sortedTickets);
  };

  return (
    <div className={styles.container}>
      {formValues.from.name !== "" && (
        <div className={styles.buttonContainer}>
          <button
            className={styles.button}
            onClick={() => {
              sortTickets("timestamp");
              setSortOrder({
                ...sortOrder,
                timestamp: sortOrder.timestamp === "asc" ? "desc" : "asc",
              });
            }}
          >
            Sort by time
          </button>
          <button
            className={styles.button}
            onClick={() => {
              sortTickets("price");
              setSortOrder({
                ...sortOrder,
                price: sortOrder.price === "asc" ? "desc" : "asc",
              });
            }}
          >
            Sort by price
          </button>
          <button
            className={styles.button}
            onClick={() => {
              sortTickets("duration");
              setSortOrder({
                ...sortOrder,
                duration: sortOrder.duration === "asc" ? "desc" : "asc",
              });
            }}
          >
            Sort by duration
          </button>
        </div>
      )}
      {loading && formValues.from.name !== "" ? (
        <p>Loading tickets...</p>
      ) : (
        formValues.from.name !== "" && (
          <ul className={styles.ul}>
            {tickets.length > 0 ? (
              tickets.map((ticket) => (
                <ListItem
                  key={ticket.id}
                  ticket={ticket}
                  name={formValues.from.name}
                />
              ))
            ) : (
              <div>There is no flight ticket</div>
            )}
          </ul>
        )
      )}
    </div>
  );
};

export default TicketList;
