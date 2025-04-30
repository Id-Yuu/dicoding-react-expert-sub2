import Lists from './lists';

const meta = {
  title: 'Components/Comments/Lists',
  component: Lists,
  tags: ['autodocs'],
  argTypes: {
    upVoteComment: { action: 'upvoted comment' },
    downVoteComment: { action: 'downvoted comment' },
    neturalizeVoteComment: { action: 'neutralized comment vote' },
  },
};

export default meta;

const sampleComments = [
  {
    id: 'comment-1',
    content: '<p>Komentar pertama dalam diskusi ini.</p>',
    createdAt: '2024-01-01T07:00:00.000Z',
    owner: {
      id: 'user-1',
      name: 'John Doe',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random'
    },
    upVotesBy: ['user-2'],
    downVotesBy: [],
  },
  {
    id: 'comment-2',
    content: '<p>Saya setuju dengan pendapat di atas.</p>',
    createdAt: '2024-01-01T08:00:00.000Z',
    owner: {
      id: 'user-2',
      name: 'Jane Smith',
      avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=random'
    },
    upVotesBy: ['user-1', 'user-3'],
    downVotesBy: [],
  }
];

export const WithComments = {
  args: {
    comments: sampleComments,
    authUser: 'user-1',
    upVoteComment: () => {},
    downVoteComment: () => {},
    neturalizeVoteComment: () => {}
  }
};

export const WithLongDiscussion = {
  args: {
    comments: [
      ...sampleComments,
      {
        id: 'comment-3',
        content: `
          <p>Izinkan saya menambahkan beberapa poin penting:</p>
          <ul>
            <li>React hooks sangat membantu dalam state management</li>
            <li>Custom hooks dapat meningkatkan reusabilitas kode</li>
            <li>Testing adalah bagian penting dalam development</li>
          </ul>
        `,
        createdAt: '2024-01-01T09:00:00.000Z',
        owner: {
          id: 'user-3',
          name: 'React Expert',
          avatar: 'https://ui-avatars.com/api/?name=React+Expert&background=random'
        },
        upVotesBy: ['user-1', 'user-2', 'user-4'],
        downVotesBy: ['user-5']
      }
    ],
    authUser: 'user-1',
    upVoteComment: () => {},
    downVoteComment: () => {},
    neturalizeVoteComment: () => {}
  }
};