// Data storage for live streams
export interface LiveComment {
  id: string;
  userId: string;
  username: string;
  message: string;
  timestamp: number;
  emoji?: string;
}

export interface LiveStream {
  id: string;
  title: string;
  description: string;
  userId: string;
  username: string;
  genre: string;
  isLive: boolean;
  startTime: number;
  viewers: number;
  comments: LiveComment[];
  audioUrl?: string;
  recordingId?: string;
}

// Mock data storage
export let liveStreams: LiveStream[] = [
  {
    id: '1',
    title: 'Acoustic Session Live',
    description: 'Tocando mis canciones favoritas en vivo',
    userId: '1',
    username: 'AcousticSam',
    genre: 'Acoustic',
    isLive: true,
    startTime: Date.now() - 3600000, // 1 hour ago
    viewers: 245,
    comments: [
      { id: '1', userId: '2', username: 'MusicFan', message: '¡Suena increíble!', timestamp: Date.now() - 1000, emoji: '🎵' },
      { id: '2', userId: '3', username: 'GuitarLover', message: 'Que técnica tan buena', timestamp: Date.now() - 2000 },
      { id: '3', userId: '4', username: 'NewFan', message: 'Primera vez aquí, me encanta', timestamp: Date.now() - 3000, emoji: '❤️' }
    ]
  }
];

// Recording sessions
export interface Recording {
  id: string;
  userId: string;
  title: string;
  description: string;
  audioBlob?: Blob;
  audioUrl?: string;
  duration: number;
  timestamp: number;
  isPublic: boolean;
}

export let recordings: Recording[] = [];

// Functions to manage live data
export const createLiveStream = (stream: Omit<LiveStream, 'id' | 'isLive' | 'startTime' | 'viewers' | 'comments'>) => {
  const newStream: LiveStream = {
    ...stream,
    id: Date.now().toString(),
    isLive: true,
    startTime: Date.now(),
    viewers: 0,
    comments: []
  };
  liveStreams.push(newStream);
  return newStream;
};

export const endLiveStream = (streamId: string) => {
  const stream = liveStreams.find(s => s.id === streamId);
  if (stream) {
    stream.isLive = false;
    return true;
  }
  return false;
};

export const addLiveComment = (streamId: string, comment: Omit<LiveComment, 'id'>) => {
  const stream = liveStreams.find(s => s.id === streamId);
  if (stream) {
    const newComment: LiveComment = {
      ...comment,
      id: Date.now().toString()
    };
    stream.comments.push(newComment);
    return newComment;
  }
  return null;
};

export const addLiveReaction = (streamId: string, userId: string, username: string, emoji: string) => {
  const stream = liveStreams.find(s => s.id === streamId);
  if (stream) {
    const newComment: LiveComment = {
      id: Date.now().toString(),
      userId,
      username,
      message: '',
      timestamp: Date.now(),
      emoji
    };
    stream.comments.push(newComment);
    return newComment;
  }
  return null;
};

export const incrementViewers = (streamId: string) => {
  const stream = liveStreams.find(s => s.id === streamId);
  if (stream) {
    stream.viewers += 1;
    return stream.viewers;
  }
  return 0;
};

export const decrementViewers = (streamId: string) => {
  const stream = liveStreams.find(s => s.id === streamId);
  if (stream && stream.viewers > 0) {
    stream.viewers -= 1;
    return stream.viewers;
  }
  return 0;
};

export const saveRecording = (recording: Omit<Recording, 'id' | 'timestamp'>) => {
  const newRecording: Recording = {
    ...recording,
    id: Date.now().toString(),
    timestamp: Date.now()
  };
  recordings.push(newRecording);
  return newRecording;
};

export const getUserRecordings = (userId: string) => {
  return recordings.filter(r => r.userId === userId);
};

export const getPublicRecordings = () => {
  return recordings.filter(r => r.isPublic);
};