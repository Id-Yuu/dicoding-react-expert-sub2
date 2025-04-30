import { VoteButton } from './index';

export default {
  title: 'Components/VoteButton',
  component: VoteButton,
  tags: ['autodocs'],
  argTypes: {
    upVote: { action: 'upvoted' },
    downVote: { action: 'downvoted' },
    neturalizeVote: { action: 'neutralized' },
  },
};

const Template = (args) => <VoteButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: 'vote-1',
  upVotesBy: [],
  downVotesBy: [],
  authUser: 'user-1'
};

export const UpVoted = Template.bind({});
UpVoted.args = {
  id: 'vote-1',
  upVotesBy: ['user-1', 'user-2'],
  downVotesBy: [],
  authUser: 'user-1'
};

export const DownVoted = Template.bind({});
DownVoted.args = {
  id: 'vote-1',
  upVotesBy: [],
  downVotesBy: ['user-1', 'user-2'],
  authUser: 'user-1'
};

export const WithMultipleVotes = Template.bind({});
WithMultipleVotes.args = {
  id: 'vote-1',
  upVotesBy: ['user-2', 'user-3', 'user-4'],
  downVotesBy: ['user-5', 'user-6'],
  authUser: 'user-1'
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  authUser: null
};

// Add custom controls
Default.parameters = {
  controls: {
    exclude: ['upVote', 'downVote', 'neturalizeVote']
  }
};