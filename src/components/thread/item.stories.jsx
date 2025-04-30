import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '@store/store';
import { ThreadItem } from './item';

export default {
  title: 'Components/Thread/Item',
  component: ThreadItem,
  tags: ['autodocs'],
};

function Template(args) {
  return (
    <Provider store={store}>
      <MemoryRouter>
        <div className="max-w-2xl mx-auto">
          <ThreadItem {...args} />
        </div>
      </MemoryRouter>
    </Provider>
  );
}

export const SimpleThread = Template.bind({});
SimpleThread.args = {
  id: 'thread-1',
  title: 'Diskusi React',
  body: '<p>Bagaimana pendapat kalian tentang React?</p>',
  category: 'react',
  createdAt: new Date().toISOString(),
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
  threadOwner: {
    id: 'user-1',
    name: 'Ayyub CS',
    avatar: 'https://ui-avatars.com/api/?name=Ayyub+CS&background=random',
  },
  authUser: 'user-1',
  upVote: () => alert('Upvoted!'),
  downVote: () => alert('Downvoted!'),
  neturalizeVote: () => alert('Vote removed!'),
};

export const PopularThread = Template.bind({});
PopularThread.args = {
  ...SimpleThread.args,
  title: 'Tips Belajar Programming',
  body: `
    <p>Berikut tips untuk belajar programming:</p>
    <ul>
      <li>Konsisten dalam belajar</li>
      <li>Praktek setiap hari</li>
      <li>Bergabung dengan komunitas</li>
    </ul>
  `,
  category: 'programming',
  upVotesBy: ['user-1', 'user-2', 'user-3'],
  downVotesBy: ['user-4'],
  totalComments: 15,
};

export const TechnicalThread = Template.bind({});
TechnicalThread.args = {
  ...SimpleThread.args,
  title: 'Perbedaan useState dan useReducer',
  body: `
    <p>useState cocok untuk state sederhana</p>
    <p>useReducer lebih baik untuk state kompleks yang:</p>
    <ul>
      <li>Memiliki banyak logic</li>
      <li>Saling berhubungan</li>
      <li>Sering diupdate bersamaan</li>
    </ul>
  `,
  category: 'react-hooks',
  upVotesBy: ['user-2', 'user-3'],
  downVotesBy: [],
  totalComments: 8,
  threadOwner: {
    id: 'user-2',
    name: 'React Expert',
    avatar: 'https://ui-avatars.com/api/?name=React+Expert&background=random',
  },
};

export const NewsThread = Template.bind({});
NewsThread.args = {
  ...SimpleThread.args,
  title: 'React 19 Akan Rilis!',
  body: `
    <p><strong>Breaking News!</strong></p>
    <p>React 19 akan membawa fitur baru:</p>
    <ul>
      <li>Peningkatan performa</li>
      <li>API baru</li>
      <li>Dokumentasi lebih baik</li>
    </ul>
  `,
  category: 'news',
  upVotesBy: ['user-1', 'user-2', 'user-3', 'user-4', 'user-5'],
  downVotesBy: [],
  totalComments: 25,
  createdAt: '2024-01-01T07:00:00.000Z',
};