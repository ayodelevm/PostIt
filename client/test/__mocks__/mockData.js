export const groupData = {
  groups: {
    id: '2',
    username: 'toria',
    profileImage: 'https://www.media/major-images/Art.jpg',
    fullname: 'Toria Tobias',
    email: 'ay@gmail.com',
    telephone: '08087584922',
    Groups: [{
      name: 'New Group',
      description: 'Its a new group',
      id: '7',
      ownerId: '2',
      createdAt: '017-09-10T16:29:08.087Z',
    }, {
      name: 'A Second Group',
      description: 'A second for demo',
      id: '8',
      ownerId: '4',
      createdAt: '017-09-10T16:29:08.087Z'
    }]
  },
  groupUsers: {
    name: 'New Group',
    description: 'Its a new group',
    id: '7',
    ownerId: '4',
    createdAt: '017-09-10T16:29:08.087Z',
    Users: [{
      id: '2',
      username: 'toria',
      profileImage: 'https://www.media/major-images/Art.jpg',
      fullname: 'Toria Tobias',
      email: 'ay@gmail.com',
      telephone: '08087584922'
    }, {
      id: '3',
      username: 'jide',
      profileImage: 'https://www.media/major-images/Art.jpg',
      fullname: 'Jide Tobias',
      email: 'jide@gmail.com',
      telephone: '09074384397'
    }]
  },
  errors: { globals: 'name already exist' }
};

export const messageData = {
  groupMessages: {
    name: 'New Group',
    description: "It's a new group",
    id: '7',
    ownerId: '4',
    createdAt: '017-09-10T16:29:08.087Z',
    Messages: [{
      id: '2',
      GroupId: '2',
      ownerId: '4',
      createdAt: '017-09-10T16:29:08.087Z',
      message: 'Hello World!',
      priority: 'Normal'
    }, {
      id: '3',
      GroupId: '3',
      ownerId: '5',
      createdAt: '017-09-10T16:29:08.087Z',
      message: 'Welcome to this group!',
      priority: 'Urgent'
    }]
  },
};

export const userData = {
  users: [{
    id: '2',
    username: 'toria',
    profileImage: 'https://www.media/major-images/Art.jpg',
    fullname: 'Toria Tobias',
    email: 'ay@gmail.com',
    telephone: '08087584922'
  }, {
    id: '4',
    username: 'jide',
    profileImage: 'https://www.media/major-images/Art.jpg',
    fullname: 'Jide Tobias',
    email: 'jide@gmail.com',
    telephone: '09074384397'
  }]
};

export const currentUser = {
  currentUser: {
    id: '3',
    username: 'jide',
    profileImage: 'https://www.media/major-images/Art.jpg',
    fullname: 'Jide Tobias',
    email: 'jide@gmail.com',
    telephone: '09074384397'
  }
};

export const archiveData = {
  archivedMessages: {
    name: 'New Group',
    description: 'Its a new group',
    id: '7',
    ownerId: '4',
    createdAt: '017-09-10T16:29:08.087Z',
    Messages: [{
      id: '2',
      GroupId: '2',
      ownerId: '4',
      createdAt: '017-09-10T16:29:08.087Z',
      message: 'Hello World!',
      priority: 'Normal'
    }, {
      id: '3',
      GroupId: '3',
      ownerId: '5',
      createdAt: '017-09-10T16:29:08.087Z',
      message: 'Welcome to this group!',
      priority: 'Urgent'
    }]
  },
  archivableMessages: {
    name: 'New Group',
    description: 'Its a new group',
    id: '7',
    ownerId: '4',
    createdAt: '017-09-10T16:29:08.087Z',
    Messages: [{
      id: '5',
      GroupId: '2',
      ownerId: '4',
      createdAt: '017-09-10T16:29:08.087Z',
      message: 'Hello World!',
      priority: 'Normal'
    }, {
      id: '6',
      GroupId: '3',
      ownerId: '5',
      createdAt: '017-09-10T16:29:08.087Z',
      message: 'Welcome to this group!',
      priority: 'Urgent'
    }]
  },
  setGroupDetails: {
    id: 2,
    name: 'learn python'
  },
  errors: { globals: 'invalid credentials' }
};

export const event = {
  key: 'Enter',
  preventDefault: jest.fn(),
  target: {
    id: 2,
    name: 'learn python',
  }
};

export const passwordEvent = {
  persist: jest.fn(),
  target: {
    name: 'password',
    value: 'adeleke',
  }
};

export const errors = {
  errors: {
    password: 'this field is required',
    passwordConfirmation: 'this field is required'
  }
};

export const history = {
  action: 'REPLACE'
};

export const stateData = {
  fullname: 'ayo new',
  email: 'ayo@mail.com',
  telephone: '09065748493',
  username: 'ayo',
  password: 'ayonew',
  passwordConfirmation: 'ayonew',
};

export const newState = {
  content: 'new message',
  selected: { value: 'Urgent', label: 'Urgent' }
};

export const location = {
  search: 'tok=Rhfbecreibcc.24bicbicer'
};
