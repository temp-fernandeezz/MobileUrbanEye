import React, { createContext, useState, useContext } from 'react';


const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  // Inicialize com true para simular a presença de notificações
  const [hasNotifications, setHasNotifications] = useState(true);

  const updateNotifications = (has) => setHasNotifications(has);

  return (
    <NotificationContext.Provider value={{ hasNotifications, updateNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};
