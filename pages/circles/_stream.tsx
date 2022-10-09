import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, ChannelList, LoadingIndicator, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';

import { useClient } from '../../hooks/useClient';

import 'stream-chat-react/dist/css/v2/index.css';

const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoibGluZ2VyaW5nLWRhd24tMCJ9.G3q0XkWAxDx8oENO36XCRKxobj4MDZjepouQbbL3yVI';

const user = {
  id: 'lingering-dawn-0',
  name: 'lingering-dawn-0',
  image: 'https://getstream.io/random_png/?id=lingering-dawn-0&name=lingering-dawn-0',
};

const filters = { type: 'messaging', members: { $in: ['lingering-dawn-0'] } };
const sort = { last_message_at: -1 };

const Circles = () => {
  const chatClient = useClient({ apiKey: 'r5e6gmzac9q5', userData: user, tokenOrProvider: userToken });

  if (!chatClient) {
    return <LoadingIndicator />;
  }

  return (
    <Chat client={chatClient} theme='str-chat__theme-light'>
      <ChannelList filters={filters} sort={sort} />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default Circles;