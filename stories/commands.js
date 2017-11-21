const threadParam = {
  key: 'thread_id',
  placeholder: 'thread',
  selector: props => props.threads,
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
    parameters: [
      {
        key: 'name',
        placeholder: 'gist description of the activity',
      },
      threadParam,
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

export default COMMANDS;
