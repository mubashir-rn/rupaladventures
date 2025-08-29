import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import PostForm, { PostData } from '@/components/content/PostForm';
import { Plus, Edit, Trash2, Eye, Calendar, MapPin, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [posts, setPosts] = useState<PostData[]>([]);
  const [showPostForm, setShowPostForm] = useState(false);
  const [editingPost, setEditingPost] = useState<PostData | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    
    // Load user's posts from localStorage (replace with actual API call)
    const savedPosts = localStorage.getItem('rupal_posts');
    if (savedPosts) {
      try {
        const parsedPosts = JSON.parse(savedPosts);
        const userPosts = parsedPosts.filter((post: PostData) => post.author === user?.id);
        setPosts(userPosts);
      } catch (error) {
        console.error('Failed to load posts');
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleCreatePost = async (data: Omit<PostData, 'id' | 'createdAt' | 'author'>) => {
    const newPost: PostData = {
      ...data,
      id: Date.now().toString(),
      author: user?.id || '',
      createdAt: new Date(),
    };

    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);
    
    // Save to localStorage (replace with actual API call)
    localStorage.setItem('rupal_posts', JSON.stringify(updatedPosts));
    
    setShowPostForm(false);
    toast({
      title: "Success",
      description: "Post created successfully!",
    });
  };

  const handleUpdatePost = async (data: Omit<PostData, 'id' | 'createdAt' | 'author'>) => {
    if (!editingPost) return;

    const updatedPost: PostData = {
      ...editingPost,
      ...data,
    };

    const updatedPosts = posts.map(post => 
      post.id === editingPost.id ? updatedPost : post
    );
    
    setPosts(updatedPosts);
    
    // Save to localStorage (replace with actual API call)
    localStorage.setItem('rupal_posts', JSON.stringify(updatedPosts));
    
    setEditingPost(null);
    toast({
      title: "Success",
      description: "Post updated successfully!",
    });
  };

  const handleDeletePost = (postId: string) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
    
    // Save to localStorage (replace with actual API call)
    localStorage.setItem('rupal_posts', JSON.stringify(updatedPosts));
    
    toast({
      title: "Success",
      description: "Post deleted successfully!",
    });
  };

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'expedition':
        return '🏔️';
      case 'adventure':
        return '🧗';
      case 'tour':
        return '🚶';
      case 'news':
        return '📰';
      case 'alert':
        return '⚠️';
      default:
        return '📝';
    }
  };

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'expedition':
        return 'bg-blue-100 text-blue-800';
      case 'adventure':
        return 'bg-green-100 text-green-800';
      case 'tour':
        return 'bg-purple-100 text-purple-800';
      case 'news':
        return 'bg-orange-100 text-orange-800';
      case 'alert':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (showPostForm) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-6xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => setShowPostForm(false)}
            className="mb-4"
          >
            ← Back to Dashboard
          </Button>
          <PostForm onSubmit={handleCreatePost} />
        </div>
      </div>
    );
  }

  if (editingPost) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-6xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => setEditingPost(null)}
            className="mb-4"
          >
            ← Back to Dashboard
          </Button>
          <PostForm 
            onSubmit={handleUpdatePost} 
            initialData={editingPost}
            isEditing={true}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-muted-foreground">
            Manage your posts and create new content for the Rupal Adventures community
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Posts</p>
                  <p className="text-2xl font-bold">{posts.length}</p>
                </div>
                <div className="text-2xl">📝</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Published</p>
                  <p className="text-2xl font-bold">
                    {posts.filter(post => post.isPublished).length}
                  </p>
                </div>
                <div className="text-2xl">✅</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Drafts</p>
                  <p className="text-2xl font-bold">
                    {posts.filter(post => !post.isPublished).length}
                  </p>
                </div>
                <div className="text-2xl">📝</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold">
                    {posts.filter(post => {
                      const postDate = new Date(post.createdAt);
                      const now = new Date();
                      return postDate.getMonth() === now.getMonth() && 
                             postDate.getFullYear() === now.getFullYear();
                    }).length}
                  </p>
                </div>
                <div className="text-2xl">📅</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Button */}
        <div className="mb-6">
          <Button onClick={() => setShowPostForm(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create New Post
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="posts">My Posts</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your latest posts and activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                {posts.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No posts yet. Create your first post to get started!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {posts.slice(0, 5).map((post) => (
                      <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{getPostTypeIcon(post.type)}</span>
                          <div>
                            <h3 className="font-medium">{post.title}</h3>
                            <p className="text-sm text-muted-foreground">{post.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={post.isPublished ? "default" : "secondary"}>
                            {post.isPublished ? "Published" : "Draft"}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="posts" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>All Posts</CardTitle>
                <CardDescription>
                  Manage and edit your posts
                </CardDescription>
              </CardHeader>
              <CardContent>
                {posts.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No posts yet. Create your first post to get started!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {posts.map((post) => (
                      <div key={post.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{getPostTypeIcon(post.type)}</span>
                            <div>
                              <h3 className="font-medium text-lg">{post.title}</h3>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                <span className="flex items-center gap-1">
                                  <Tag className="h-3 w-3" />
                                  {post.type}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {post.location}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {new Date(post.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Badge className={getPostTypeColor(post.type)}>
                            {post.type}
                          </Badge>
                        </div>
                        
                        <p className="text-muted-foreground mb-3 line-clamp-2">
                          {post.content}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant={post.isPublished ? "default" : "secondary"}>
                              {post.isPublished ? "Published" : "Draft"}
                            </Badge>
                            {post.duration && (
                              <Badge variant="outline">{post.duration}</Badge>
                            )}
                            {post.difficulty && (
                              <Badge variant="outline">{post.difficulty}</Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingPost(post)}
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeletePost(post.id)}
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Post Analytics</CardTitle>
                <CardDescription>
                  Insights about your content performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Posts by Type</h4>
                    <div className="space-y-2">
                      {['expedition', 'adventure', 'tour', 'news', 'alert'].map((type) => {
                        const count = posts.filter(post => post.type === type).length;
                        const percentage = posts.length > 0 ? (count / posts.length) * 100 : 0;
                        return (
                          <div key={type} className="flex items-center justify-between">
                            <span className="capitalize">{type}</span>
                            <span className="text-sm text-muted-foreground">
                              {count} ({percentage.toFixed(1)}%)
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Recent Activity</h4>
                    <div className="space-y-2">
                      {posts.slice(0, 5).map((post) => (
                        <div key={post.id} className="flex items-center justify-between text-sm">
                          <span className="truncate">{post.title}</span>
                          <span className="text-muted-foreground">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
