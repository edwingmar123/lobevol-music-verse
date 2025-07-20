// Data storage for competitions
export interface Comment {
  id: string;
  userId: string;
  username: string;
  message: string;
  timestamp: number;
  emoji?: string;
}

export interface Participant {
  id: string;
  username: string;
  avatar: string;
  votes: number;
  isLive: boolean;
  streamUrl?: string;
}

export interface Competition {
  id: string;
  title: string;
  description: string;
  genre: string;
  status: 'live' | 'voting' | 'upcoming';
  participants: Participant[];
  maxParticipants: number;
  timeLeft: string;
  prize: string;
  currentRound: string;
  viewers: number;
  comments: Comment[];
  startTime?: string;
  requirements?: string;
}

// Mock data storage
export let competitions: Competition[] = [
  {
    id: '1',
    title: "Freestyle Friday Battle",
    description: "Batalla de freestyle en español con temática libre",
    genre: "Hip Hop",
    status: "live",
    participants: [
      { id: '1', username: "MC Flow", avatar: "MF", votes: 340, isLive: true, streamUrl: "stream1" },
      { id: '2', username: "Rima Real", avatar: "RR", votes: 287, isLive: true, streamUrl: "stream2" },
      { id: '3', username: "Beat Master", avatar: "BM", votes: 156, isLive: false },
      { id: '4', username: "Verso Libre", avatar: "VL", votes: 98, isLive: false }
    ],
    maxParticipants: 8,
    timeLeft: "05:23",
    prize: "$500",
    currentRound: "Semifinal",
    viewers: 2847,
    comments: [
      { id: '1', userId: '1', username: 'FanMusic', message: '¡Increíble batalla!', timestamp: Date.now() - 1000, emoji: '🔥' },
      { id: '2', userId: '2', username: 'HipHopLover', message: 'MC Flow está dominando', timestamp: Date.now() - 2000 },
      { id: '3', userId: '3', username: 'BeatFan', message: 'Que nivel tan alto', timestamp: Date.now() - 3000, emoji: '🎤' }
    ]
  },
  {
    id: '2',
    title: "Acoustic Guitar Showcase",
    description: "Muestra tu técnica con guitarra acústica",
    genre: "Acoustic",
    status: "voting",
    participants: [
      { id: '5', username: "Guitar Hero", avatar: "GH", votes: 523, isLive: false },
      { id: '6', username: "String Magic", avatar: "SM", votes: 445, isLive: false },
      { id: '7', username: "Chord Master", avatar: "CM", votes: 398, isLive: false },
      { id: '8', username: "Melody Maker", avatar: "MM", votes: 287, isLive: false }
    ],
    maxParticipants: 15,
    timeLeft: "12:45",
    prize: "$300",
    currentRound: "Fase de Votación",
    viewers: 1523,
    comments: []
  }
];

// Functions to manage competitions data
export const addComment = (competitionId: string, comment: Omit<Comment, 'id'>) => {
  const competition = competitions.find(c => c.id === competitionId);
  if (competition) {
    const newComment: Comment = {
      ...comment,
      id: Date.now().toString()
    };
    competition.comments.push(newComment);
  }
};

export const addReaction = (competitionId: string, userId: string, username: string, emoji: string) => {
  const competition = competitions.find(c => c.id === competitionId);
  if (competition) {
    const newComment: Comment = {
      id: Date.now().toString(),
      userId,
      username,
      message: '',
      timestamp: Date.now(),
      emoji
    };
    competition.comments.push(newComment);
  }
};

export const joinCompetition = (competitionId: string, participant: Omit<Participant, 'votes' | 'isLive'>) => {
  const competition = competitions.find(c => c.id === competitionId);
  if (competition && competition.participants.length < competition.maxParticipants) {
    const newParticipant: Participant = {
      ...participant,
      votes: 0,
      isLive: false
    };
    competition.participants.push(newParticipant);
    return true;
  }
  return false;
};

export const voteForParticipant = (competitionId: string, participantId: string) => {
  const competition = competitions.find(c => c.id === competitionId);
  if (competition) {
    const participant = competition.participants.find(p => p.id === participantId);
    if (participant) {
      participant.votes += 1;
      return true;
    }
  }
  return false;
};

export const startStream = (competitionId: string, participantId: string, streamUrl: string) => {
  const competition = competitions.find(c => c.id === competitionId);
  if (competition) {
    const participant = competition.participants.find(p => p.id === participantId);
    if (participant) {
      participant.isLive = true;
      participant.streamUrl = streamUrl;
      return true;
    }
  }
  return false;
};

export const stopStream = (competitionId: string, participantId: string) => {
  const competition = competitions.find(c => c.id === competitionId);
  if (competition) {
    const participant = competition.participants.find(p => p.id === participantId);
    if (participant) {
      participant.isLive = false;
      participant.streamUrl = undefined;
      return true;
    }
  }
  return false;
};