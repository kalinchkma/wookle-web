
    import React, { useState, useEffect } from 'react';
    import { useAuth } from '@/contexts/AuthContext';
    import { useToast } from '@/components/ui/use-toast';
    import { Button } from '@/components/ui/button';
    import { Textarea } from '@/components/ui/textarea';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Star, UserCircle } from 'lucide-react';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
    import { motion, AnimatePresence } from 'framer-motion';

    const StarRatingInput = ({ rating, setRating }) => {
      const [hoverRating, setHoverRating] = useState(0);
      return (
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-6 w-6 cursor-pointer transition-colors ${
                (hoverRating || rating) >= star ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground'
              }`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            />
          ))}
        </div>
      );
    };

    const ProductReviews = ({ productId, initialReviewsCount }) => {
      const { user } = useAuth();
      const { toast } = useToast();
      const [reviews, setReviews] = useState([]);
      const [newReview, setNewReview] = useState({ rating: 0, title: '', comment: '' });
      const [showReviewForm, setShowReviewForm] = useState(false);
      const [isLoading, setIsLoading] = useState(false);
      const [visibleReviews, setVisibleReviews] = useState(3);

      useEffect(() => {
        const storedReviews = JSON.parse(localStorage.getItem(`reviews_${productId}`)) || [];
        setReviews(storedReviews);
      }, [productId]);

      const handleReviewSubmit = (e) => {
        e.preventDefault();
        if (!user) {
          toast({ title: "Login Required", description: "Please log in to submit a review.", variant: "destructive" });
          return;
        }
        if (newReview.rating === 0) {
          toast({ title: "Rating Required", description: "Please select a star rating.", variant: "destructive" });
          return;
        }
        if (!newReview.title.trim() || !newReview.comment.trim()) {
          toast({ title: "Fields Required", description: "Please fill in both title and comment.", variant: "destructive" });
          return;
        }

        setIsLoading(true);
        const reviewToAdd = {
          id: `review_${Date.now()}`,
          userId: user.id,
          userName: user.name || user.email.split('@')[0],
          userAvatar: user.avatarUrl || null,
          rating: newReview.rating,
          title: newReview.title.trim(),
          comment: newReview.comment.trim(),
          date: new Date().toISOString(),
          verifiedBuyer: true, 
        };

        setTimeout(() => { 
          const updatedReviews = [reviewToAdd, ...reviews];
          localStorage.setItem(`reviews_${productId}`, JSON.stringify(updatedReviews));
          setReviews(updatedReviews);
          setNewReview({ rating: 0, title: '', comment: '' });
          setShowReviewForm(false);
          setIsLoading(false);
          toast({ title: "Review Submitted!", description: "Thank you for your feedback." });
        }, 500);
      };

      const averageRating = reviews.length > 0 
        ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
        : 'N/A';

      const ratingDistribution = [5, 4, 3, 2, 1].map(star => {
        const count = reviews.filter(r => r.rating === star).length;
        const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
        return { star, count, percentage };
      });

      return (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h3 className="text-xl font-semibold text-foreground">Customer Reviews</h3>
            {user && (
              <Button 
                size="sm" 
                className="text-xs h-9 bg-primary hover:bg-primary/90 w-full sm:w-auto" 
                onClick={() => setShowReviewForm(!showReviewForm)}
              >
                {showReviewForm ? 'Cancel Review' : 'Write a Review'}
              </Button>
            )}
          </div>

          <AnimatePresence>
            {showReviewForm && user && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <Card className="mb-4 border-primary/50 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg">Submit Your Review</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="rating" className="block mb-1.5 text-sm font-medium">Your Rating</Label>
                        <StarRatingInput rating={newReview.rating} setRating={(r) => setNewReview(prev => ({ ...prev, rating: r }))} />
                      </div>
                      <div>
                        <Label htmlFor="reviewTitle" className="text-sm font-medium">Review Title</Label>
                        <Input
                          id="reviewTitle"
                          value={newReview.title}
                          onChange={(e) => setNewReview(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="e.g., Great product!"
                          className="compact-input"
                          maxLength={100}
                        />
                      </div>
                      <div>
                        <Label htmlFor="reviewComment" className="text-sm font-medium">Your Review</Label>
                        <Textarea
                          id="reviewComment"
                          value={newReview.comment}
                          onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                          placeholder="Tell us more about your experience..."
                          rows={4}
                          maxLength={500}
                        />
                      </div>
                      <Button type="submit" className="w-full sm:w-auto bg-primary hover:bg-primary/90 compact-button" disabled={isLoading}>
                        {isLoading ? 'Submitting...' : 'Submit Review'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {reviews.length > 0 && (
            <Card className="bg-secondary/40">
              <CardContent className="p-4 md:p-5">
                <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                  <div className="flex flex-col items-center md:items-start md:w-1/4">
                    <div className="text-4xl font-bold text-primary">{averageRating}</div>
                    <div className="flex items-center mt-1">
                      {[1,2,3,4,5].map(s => <Star key={s} className={`h-5 w-5 ${s <= parseFloat(averageRating) ? 'text-amber-400 fill-amber-400' : 'text-muted'}`} />)}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">Based on {reviews.length} reviews</div>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {ratingDistribution.map(item => (
                      <div key={item.star} className="flex items-center gap-2 text-sm">
                        <span className="w-12 text-muted-foreground">{item.star} star</span>
                        <div className="flex-1 bg-muted h-2.5 rounded-full overflow-hidden">
                          <div className="bg-amber-400 h-full" style={{ width: `${item.percentage}%` }}></div>
                        </div>
                        <span className="w-8 text-right text-muted-foreground text-xs">{item.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {reviews.length === 0 && !showReviewForm && (
            <div className="text-center py-8 text-muted-foreground">
              <Star className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="font-medium text-foreground">No reviews yet.</p>
              <p className="text-sm">Be the first to share your thoughts!</p>
            </div>
          )}

          <div className="space-y-5">
            {reviews.slice(0, visibleReviews).map((review) => (
              <motion.div 
                key={review.id} 
                className="border-b border-border pb-5 last:border-b-0 last:pb-0"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-9 w-9 mt-0.5">
                    <AvatarImage src={review.userAvatar || `https://avatar.vercel.sh/${review.userId}.png`} alt={review.userName} />
                    <AvatarFallback>{review.userName ? review.userName.charAt(0).toUpperCase() : <UserCircle />}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <div className="flex items-center text-amber-400 mr-2">
                        {[...Array(5)].map((_, i) => <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-amber-400' : 'fill-muted text-muted'}`} />)}
                      </div>
                      <h4 className="font-semibold text-sm text-foreground">{review.title}</h4>
                    </div>
                    <p className="text-sm text-foreground/80 mb-1.5 leading-relaxed">{review.comment}</p>
                    <div className="flex items-center text-xs text-muted-foreground gap-1.5 flex-wrap">
                      <span>{review.userName}</span>
                      {review.verifiedBuyer && <span className="text-green-600 dark:text-green-400">• Verified Buyer</span>}
                      <span>• {new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {reviews.length > visibleReviews && (
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full text-xs h-8 border-input hover:border-primary hover:text-primary mt-5"
              onClick={() => setVisibleReviews(prev => prev + 3)}
            >
              Load More Reviews
            </Button>
          )}
        </div>
      );
    };

    export default ProductReviews;
  