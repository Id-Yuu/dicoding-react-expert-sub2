import ThreadDetail from './detail';

export default {
  title: 'Components/Thread/Detail',
  component: ThreadDetail,
  tags: ['autodocs'],
  argTypes: {
    upVoteThreadDetail: { action: 'upvoted' },
    downVoteThreadDetail: { action: 'downvoted' },
    neturalizeVoteThreadDetail: { action: 'neutralized' },
  },
};

const Template = (args) => <ThreadDetail {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: 'thread-1',
  title: 'Example Thread Title',
  body: '<p>This is an example thread body with <strong>formatted</strong> content.</p>',
  owner: {
    id: 'user-1',
    name: 'Ayyub CS',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random',
  },
  category: 'general',
  createdAt: '2024-01-01T07:00:00.000Z',
  authUser: 'user-1',
  upVotesBy: [],
  downVotesBy: [],
};

export const WithVotes = Template.bind({});
WithVotes.args = {
  ...Default.args,
  upVotesBy: ['user-1', 'user-2'],
  downVotesBy: ['user-3'],
};

export const LongContent = Template.bind({});
LongContent.args = {
  ...Default.args,
  title: 'Ya ampun, ribet banget',
  body: `
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam, reiciendis!.</p>
    <p>It includes <strong>formatted text</strong>, <em>italics</em>, and:</p>
    <ul>
      <li>Bullet points</li>
      <li>For testing</li>
      <li>Layout handling</li>
    </ul>
  `,
};

export const DifferentUser = Template.bind({});
DifferentUser.args = {
  ...Default.args,
  authUser: 'user-2',
  owner: {
    id: 'user-3',
    name: 'Ayyub',
    avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=random',
  },
};