import type {
  NotificationCenterItem,
  UseNotificationCenter
} from "react-toastify/addons/use-notification-center";
import { Check, Archive } from "react-feather";

import styled from "styled-components";

import { PulsatingDot } from "./PulsatingDot";

const Wrapper = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  cursor: pointer;
  border: none;
  outline: none;
  background: transparent;
`;

interface Props
  extends Pick<UseNotificationCenter<{}>, "markAsRead" | "remove"> {
  notification: NotificationCenterItem;
}

export function ItemActions({ notification, markAsRead, remove }: Props) {
  return (
    <Wrapper>
      {notification.read ? (
        <Check color="green" />
      ) : (
        <Button
          title="Mark as read"
          onClick={() => {
            markAsRead(notification.id);
          }}
        >
          <PulsatingDot />
        </Button>
      )}
      <Button onClick={() => remove(notification.id)} title="Archive">
        <Archive color="#666" />
      </Button>
    </Wrapper>
  );
}
