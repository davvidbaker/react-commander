const threadParam = {
  key: 'thread_id',
  placeholder: 'thread',
  selector: props => props.threads,
  itemStringKey: 'name',
  itemReturnKey: 'id',
};
const categoryParam = {
  key: 'category_id',
  placeholder: 'category',
  selector: props => props.user.categories,
  itemStringKey: 'name',
  itemReturnKey: 'id',
};

const messageParam = { key: 'message', placeholder: 'why?' };

const activityLabel = {
  copy: 'Activity',
  background: 'rebeccapurple',
};

const COMMANDS = [
  {
    action: 'ACTIVITY_CREATE',
    copy: 'start a new task/activity',
    shortcut: '⌘ ⇧ M',
    parameters: [
      {
        key: 'name',
        placeholder: 'gist description of the activity',
      },
      threadParam,
      categoryParam,
    ],
  },
  {
    action: 'ACTIVITY_CREATE',
    copy: 'ask a question',
    parameters: [
      {
        key: 'name',
        placeholder: 'what the fuck is happening?',
      },
      threadParam,
    ],
  },
  /** ⚠️ TODO make sure the thread name is unique */
  {
    action: 'THREAD_CREATE',
    copy: 'new thread',
    parameters: [
      {
        key: 'name',
        placeholder: 'thread name',
      },
    ],
  },
  {
    action: 'TODOS_TOGGLE',
    copy: 'toggle todo list',
  },
  {
    action: 'ACTIVITY_END',
    copy: 'Just fucking end it.',
    status: ['active'],
  },
  {
    action: 'ACTIVITY_REJECT',
    copy: 'End by Rejection',
    parameters: [messageParam],
    status: ['active'],
    label: activityLabel,
  },
  {
    action: 'ACTIVITY_RESOLVE',
    copy: 'End by Resolution',
    parameters: [messageParam],
    status: ['active'],
    label: activityLabel,
  },
  {
    action: 'ACTIVITY_RESUME',
    copy: 'Resume',
    parameters: [messageParam],
    status: ['suspended'],
  },
  {
    action: 'ACTIVITY_SUSPEND',
    copy: 'Suspend',
    parameters: [messageParam],
    status: ['active'],
  },
  {
    action: 'ACTIVITY_DELETE',
    copy: 'Delete',
    status: ['active', 'suspended', 'complete'],
  },
];

const PROPS = {
  threads: [
    { rank: 0, name: 'Main', id: 0 },
    { rank: 3, name: 'Curiosity', id: 1 },
    { rank: 4, name: 'react-commander', id: 2 },
    { rank: 1, name: 'Puppy Club 🐶', id: 3 },
    { rank: 2, name: 'Blog', id: 21 },
    { rank: 6, name: 'davidbaker.is/', id: 4 },
    { rank: 6, name: 'whoa', id: 30 },
  ],
  user: {
    categories: [{ name: 'one', id: 1 }, { name: 'two', id: 2 }],
  },
};

export function getItems(selector) {
  return selector(PROPS);
}

export default COMMANDS;
