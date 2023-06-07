import { EventEmitter } from 'eventemitter3';
import { BlockRef } from '../block-ref';
import { Notification } from './types';

type NotificationEvents = {
  received: (ref: BlockRef) => void;
};

class NotificationStore extends EventEmitter<NotificationEvents> {
  #notifications: Notification[] = [];

  public getByBlock = (ref: BlockRef) => {
    const notification = this.#notifications.filter((n) => n.ref === ref);
    return notification;
  };

  public getAll = () => {
    return this.#notifications;
  };

  public markNotificationsAsRead = (ref: BlockRef) => {
    this.#notifications = this.#notifications.filter((n) => n.ref !== ref);
    this.emit('received', ref);
  };

  public add = (notification: Notification) => {
    const current =
      notification.id &&
      this.#notifications.find(
        (n) => n.ref === notification.ref && n.id === notification.id,
      );
    if (current) {
      return;
    }
    this.#notifications.push(notification);
    this.emit('received', notification.ref);
  };
}

export { NotificationStore };
