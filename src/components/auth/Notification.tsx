import styled from "styled-components";

interface NotificationProps {
  message?: string;
}

const SNotification = styled.span`
  color: #2ecc71;
  font-weight: 600;
  font-size: 12px;
  margin: -10px 0px 6px 0px;
  text-align: center;
  line-height: 16px;
`;

function Notification({ message }: NotificationProps) {
  return message === "" || !message ? null : (
    <SNotification>{message}</SNotification>
  );
}

export default Notification;
