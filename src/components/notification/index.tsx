import { notification } from "antd"
import { ArgsProps } from "antd/lib/notification"

export const openNotification = ({type, message, title}:{type: string, message: string, title: string}) => {
  const props:ArgsProps = {
    message: title,
    placement: 'topRight',
    description: message,
  }
  switch(type){
    case 'error': notification.error(props); break;
    case 'success': notification.success(props); break;
    case 'warning': notification.warning(props); break;
    default: notification.info(props); break;
  }
}