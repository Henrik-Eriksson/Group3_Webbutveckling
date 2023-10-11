import React, { useState } from "react";
import { Icons, toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import Box from '@mui/material/Box';
import { useNotificationCenter } from "react-toastify/addons/use-notification-center";
import { Trigger } from "./Trigger";
import { ItemActions } from "./ItemActions";
import { Switch } from "./Switch";
import { TimeTracker } from "./TimeTracker";
import axios from 'axios';
import { authenticate } from '../../app.jsx'



const variants = {
  container: {
    open: { y: 0, opacity: 1 },
    closed: { y: -10, opacity: 0 }
  },
  content: {
    open: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
  },
  item: {
    open: {
      y: 0,
      opacity: 1,
      transition: { y: { stiffness: 1000, velocity: -100 } }
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: { y: { stiffness: 1000 } }
    }
  }
};

const UnreadFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  label { cursor: pointer; }
`;

const Container = styled(motion.aside)`
  position: absolute;
  top: 100%;
  right: 0;
  width: min(60ch, 100ch);
  border-radius: 8px;
  overflow: hidden;
  z-index: 1;
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  pointer-events: ${props => props.isOpen ? 'auto' : 'none'};
`;



const Footer = styled.footer`
  background: #222;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NotificationWrapper = styled.div`
  position: relative;
  z-index: 10;
`;

const Content = styled(motion.section)`
  background: #fff;
  pointer-events: auto;  // Always keep the content interactive
  height: 400px;
  overflow-y: scroll;
  overflow-x: hidden;
  color: #000;
  padding: 0.2rem;
  position: relative;
  h4 {
    margin: 0;
    text-align: center;
    padding: 2rem;
  }
`;

const IconWrapper = styled.div` width: 32px; `;

const Item = styled(motion.article)`
  display: grid;
  grid-template-columns: 40px 1fr 40px;
  gap: 8px;
  padding: 0.8rem;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Header = styled.header`
  background: #222;
  color: #fff;
  margin: 0;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NotificationCenter = () => {
  const {
    notifications,
    clear,
    markAllAsRead,
    markAsRead,
    remove,
    unreadCount
  } = useNotificationCenter();

const customClear =  () =>
{

  notifications.forEach((notification) => declineInvite(notification.data.inviteId,notification));
  clear();
}

  const [showUnreadOnly, toggleFilter] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const fetchEvent = async (eventId) => {
    try {
      const response = await axios.get(`http://localhost:5050/api/users/event/${eventId}`);
      return response.data.event;
    } catch (error) {
      console.error("Error fetching data from the target event:", error);
    }

    
  };
const acceptInvite = async (inviteId, eventId, notification) => {

    remove(notification.id);

    let eventData = await fetchEvent(eventId)
    let userId = await authenticate();
    const createEventResponse = await axios.post(`http://localhost:5050/api/users/createEvent`, {event: eventData, userId: userId, shared: []});
  if (createEventResponse.status !== 200) {
    console.error("Error creating the new event");
    return;
  }

  try {
    await axios.delete(`http://localhost:5050/api/invites/invite/${inviteId}`);
    // Refresh the notifications or remove the specific notification from the list
  } catch (error) {
    console.error("Error removing the invite", error);
  }
};

  //remove(notification.id)

const declineInvite = async (inviteId,notification) => {
  console.log(inviteId);
  remove(notification.id);
  try {
    await axios.delete(`http://localhost:5050/api/invites/invite/${inviteId}`);
    // Refresh the notifications or remove the specific notification from the list
  } catch (error) {
    console.error("Error declining invite:", error);
  }



};


  return (

    <NotificationWrapper>
      <Trigger onClick={() => setIsOpen(!isOpen)} count={unreadCount} />
      <Container initial={false} isOpen = {isOpen} variants={variants.container} animate={isOpen ? "open" : "closed"}>
        <Header>
          <h3>Notifications</h3>
          <UnreadFilter>
            <label htmlFor="unread-filter">Only show unread</label>
            <Switch id="unread-filter" checked={showUnreadOnly} onChange={() => toggleFilter(!showUnreadOnly)} />
          </UnreadFilter>
        </Header>
        <AnimatePresence>
          <Content variants={variants.content} animate={isOpen ? "open" : "closed"}>
            {(!notifications.length || (unreadCount === 0 && showUnreadOnly)) && (
              <motion.h4 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                Your queue is empty! you are all set 🎉
              </motion.h4>
            )}
            <AnimatePresence>
              {(showUnreadOnly ? notifications.filter(v => !v.read) : notifications).map(notification => (
                <motion.div key={notification.id} layout initial={{ scale: 0.4, opacity: 0, y: 50 }} exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }} animate={{ scale: 1, opacity: 1, y: 0 }} style={{ padding: "0.8rem" }}>
                  <Item key={notification.id} variants={variants.item}>
                    <IconWrapper>
                      {notification.icon || Icons.info({ theme: notification.theme || "light", type: toast.TYPE.INFO })}
                    </IconWrapper>
                    <div>
                      <div>{notification.content}</div>
                      <TimeTracker createdAt={notification.createdAt} />
                                    <div>
                <button onClick={() => acceptInvite(notification.data.inviteId, notification.data.eventId,notification)}>Accept</button>
                <button onClick={() => declineInvite(notification.data.inviteId,notification)}>Decline</button>
              </div>
                    </div>
                    <ItemActions notification={notification} markAsRead={markAsRead} remove={remove} />
                  </Item>
                </motion.div>
              ))}
            </AnimatePresence>
          </Content>
        </AnimatePresence>
        <Footer>
          <button onClick={customClear}>Clear All</button>
          <button onClick={markAllAsRead}>Mark All as read</button>
        </Footer>
      </Container>
    </NotificationWrapper>
  );
};

export default NotificationCenter;
