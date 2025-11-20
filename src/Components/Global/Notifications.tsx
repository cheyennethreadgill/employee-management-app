import { toSentenceCase } from "../../Helpers/strings";

// Deleted Notification
export function DeleteNotification({ deleteNotif, response }) {
  return (
    <div className={deleteNotif ? "project-card_delete-notification_show" : "project-card_delete-notification_remove"}>
      <p> {response} </p>
    </div>
  );
}

export function AddSuccessful({ thingAdded }) {
  return <p className="fw-medium mt-2"> {toSentenceCase(thingAdded)} Added Successfully!</p>;
}
