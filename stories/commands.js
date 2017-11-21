const threadParam = {
  key: 'thread_id',
  placeholder: 'thread',
  selector: props => props.threads,
  itemStringKey: 'name',
  itemReturnKey: 'id',
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
];

const messageParam = { key: 'message', placeholder: 'why?' };
/** 💁 For when the operand is an activity. */
export const ACTIVITY_COMMANDS = [
  {
    action: 'ACTIVITY_END',
    copy: 'Activity: Just fucking end it.',
    status: ['active'],
  },
  {
    action: 'ACTIVITY_REJECT',
    copy: 'Activity: End by Rejection',
    parameters: [messageParam],
    status: ['active'],
  },
  {
    action: 'ACTIVITY_RESOLVE',
    copy: 'Activity: End by Resolution',
    parameters: [messageParam],
    status: ['active'],
  },
  {
    action: 'ACTIVITY_RESUME',
    copy: 'Activity: Resume',
    parameters: [messageParam],
    status: ['suspended'],
  },
  {
    action: 'ACTIVITY_SUSPEND',
    copy: 'Activity: Suspend',
    parameters: [messageParam],
    status: ['active'],
  },
  {
    action: 'ACTIVITY_DELETE',
    copy: 'Activity: Delete',
    status: ['active', 'suspended', 'complete'],
  },
];

export default COMMANDS;
