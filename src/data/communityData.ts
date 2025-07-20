// Data storage for community features
export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  verified: boolean;
  followers: string;
  isFollowing?: boolean;
}

export interface PostContent {
  type: 'music' | 'video' | 'competition';
  text: string;
  audioTitle?: string;
  videoTitle?: string;
  battleTitle?: string;
  duration?: string;
  rank?: string;
  genre: string;
}

export interface PostStats {
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
}

export interface Post {
  id: string;
  user: User;
  content: PostContent;
  stats: PostStats;
  timestamp: string;
}

export interface TrendingTopic {
  name: string;
  posts: string;
}

// Mock data storage
export let communityPosts: Post[] = [
  {
    id: '1',
    user: {
      id: '1',
      name: "María González",
      username: "@mariasings",
      avatar: "MG",
      verified: true,
      followers: "12.5K",
      isFollowing: false
    },
    content: {
      type: "music",
      text: "Nueva canción que escribí anoche 🎵 ¿Qué opinan?",
      audioTitle: "Corazón de Fuego",
      duration: "3:42",
      genre: "Pop Latino"
    },
    stats: {
      likes: 1847,
      comments: 234,
      shares: 89,
      isLiked: false
    },
    timestamp: "hace 2 horas"
  },
  {
    id: '2',
    user: {
      id: '2',
      name: "DJ Carlos Beat",
      username: "@carlosbeat",
      avatar: "CB",
      verified: true,
      followers: "25.8K",
      isFollowing: false
    },
    content: {
      type: "video",
      text: "Live remix session desde mi estudio 🔥",
      videoTitle: "Electronic Fusion Live",
      duration: "15:32",
      genre: "Electronic"
    },
    stats: {
      likes: 3241,
      comments: 567,
      shares: 156,
      isLiked: false
    },
    timestamp: "hace 4 horas"
  },
  {
    id: '3',
    user: {
      id: '3',
      name: "Ana Vocalist",
      username: "@anavocals",
      avatar: "AV",
      verified: false,
      followers: "8.2K",
      isFollowing: false
    },
    content: {
      type: "competition",
      text: "¡Acabo de ganar la batalla de R&B! 🏆 Gracias por votar",
      battleTitle: "R&B Vocal Battle #145",
      rank: "1er Lugar",
      genre: "R&B"
    },
    stats: {
      likes: 892,
      comments: 134,
      shares: 45,
      isLiked: false
    },
    timestamp: "hace 6 horas"
  }
];

export const trendingTopics: TrendingTopic[] = [
  { name: "#FreestyleFriday", posts: "2.3K" },
  { name: "#AcousticChallenge", posts: "1.8K" },
  { name: "#LatinVibes", posts: "1.5K" },
  { name: "#ElectronicNights", posts: "1.2K" },
  { name: "#VocalPower", posts: "890" }
];

export let suggestedArtists: User[] = [
  { 
    id: '4',
    name: "Luis Rapper", 
    username: "@luisrap", 
    avatar: "LR",
    verified: false,
    followers: "18.5K", 
    isFollowing: false
  },
  { 
    id: '5',
    name: "Sofia Jazz", 
    username: "@sofiajazz", 
    avatar: "SJ",
    verified: true,
    followers: "15.2K", 
    isFollowing: false
  },
  { 
    id: '6',
    name: "Rock Band XYZ", 
    username: "@rockxyz", 
    avatar: "RB",
    verified: true,
    followers: "22.1K", 
    isFollowing: false
  }
];

// Functions to manage community data
export const likePost = (postId: string) => {
  const post = communityPosts.find(p => p.id === postId);
  if (post) {
    if (post.stats.isLiked) {
      post.stats.likes -= 1;
      post.stats.isLiked = false;
    } else {
      post.stats.likes += 1;
      post.stats.isLiked = true;
    }
    return post;
  }
  return null;
};

export const followUser = (userId: string) => {
  // Update in posts
  communityPosts.forEach(post => {
    if (post.user.id === userId) {
      post.user.isFollowing = !post.user.isFollowing;
    }
  });
  
  // Update in suggested artists
  const artist = suggestedArtists.find(a => a.id === userId);
  if (artist) {
    artist.isFollowing = !artist.isFollowing;
  }
  
  return true;
};

export const createPost = (userId: string, username: string, content: string) => {
  const newPost: Post = {
    id: Date.now().toString(),
    user: {
      id: userId,
      name: username,
      username: `@${username.toLowerCase()}`,
      avatar: username.substring(0, 2).toUpperCase(),
      verified: false,
      followers: "0",
      isFollowing: false
    },
    content: {
      type: "music",
      text: content,
      genre: "General"
    },
    stats: {
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false
    },
    timestamp: "ahora"
  };
  
  communityPosts.unshift(newPost);
  return newPost;
};

export const sharePost = (postId: string) => {
  const post = communityPosts.find(p => p.id === postId);
  if (post) {
    post.stats.shares += 1;
    return post;
  }
  return null;
};

export const addComment = (postId: string) => {
  const post = communityPosts.find(p => p.id === postId);
  if (post) {
    post.stats.comments += 1;
    return post;
  }
  return null;
};