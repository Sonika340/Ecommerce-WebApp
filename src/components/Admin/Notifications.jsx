import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../state-mangement/contextApi";
import Spinner from "../../Spinner";
import Styles from "./Notifications.module.css";

const Notifications = () => {
  const {
    getAllNotificationsApi,
    updateNotificationStatusApi,
  } = useContext(AuthContext);

  const [notifications, setNotifications] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getAllNotificationsApi();

        setNotifications(response?.notifications ?? []);
      } catch (error) {
        console.error(
          "Failed to fetch notifications:",
          error
        );

        setNotifications([]);
      }
    };

    fetchNotifications();
  }, [getAllNotificationsApi]);

  if (notifications === null) {
    return <Spinner />;
  }

  const handleMarkAsRead = async (id) => {
    try {
      await updateNotificationStatusApi(id);

      setNotifications((previousNotifications) =>
        previousNotifications.map((notification) =>
          notification._id === id
            ? {
                ...notification,
                status: "read",
              }
            : notification
        )
      );
    } catch (error) {
      console.error(
        "Failed to mark notification as read:",
        error
      );
    }
  };

  return (
    <section className={Styles.notifications}>
      <h1>Notifications</h1>

      {notifications.length === 0 ? (
        <p>No notifications available.</p>
      ) : (
        <div className={Styles.notificationList}>
          {notifications.map((notification) => (
            <article
              key={notification._id}
              className={`${Styles.notification} ${
                notification.status === "unread"
                  ? Styles.unread
                  : ""
              }`}
            >
              <div>
                <h3>{notification.title}</h3>

                <p>{notification.message}</p>

                <small>
                  {new Date(
                    notification.createdAt
                  ).toLocaleString()}
                </small>
              </div>

              {notification.status === "unread" && (
                <button
                  onClick={() =>
                    handleMarkAsRead(notification._id)
                  }
                >
                  Mark as read
                </button>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default Notifications;