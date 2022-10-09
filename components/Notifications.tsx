import { Flex, useColorMode, FlexProps } from '@chakra-ui/react'
import { NotificationItem, chainNameType } from "@pushprotocol/uiweb";
import * as PushAPI from "@pushprotocol/restapi";


const Notifications = async (props: FlexProps) => {
  const { colorMode } = useColorMode()
  const bgColor = { light: 'gray.50', dark: 'gray.900' }
  const walletAddr = 'eip155:5:' + '0xD8634C39BBFd4033c0d3289C4515275102423681'
  const color = { light: 'black', dark: 'white' }

  const notifications = await PushAPI.user.getFeeds({
    user: walletAddr, // user address in CAIP
    env: 'staging'
  });

  return (
    <div>
        {notifications.map((oneNotification, i) => {
            const { 
                cta,
                title,
                message,
                app,
                icon,
                image,
                url,
                blockchain,
                theme,
                notification
            } = oneNotification;

        return (
            <NotificationItem
                key={`notif-${i}`} 
                notificationTitle={title}
                notificationBody={message}
                cta={cta}
                app={app}
                icon={icon}
                image={image}
                url={url}
                chainName={blockchain}
                theme={theme}
                // chainName={blockchain as chainNameType} // if using Typescript
            />
            );
        })}
    </div>
  )
}


export default Notifications;