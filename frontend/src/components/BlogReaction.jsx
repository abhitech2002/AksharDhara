import { useState } from 'react';
import { sendReaction } from '../services/blogService';

const emojis = ['❤️', '😂', '😮', '😢', '👎'];

export default function BlogReaction({ blogId, currentUserReaction, reactionCounts }) {
    const [selected, setSelected] = useState(currentUserReaction || null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleReaction = async (emoji) => {
        if (isLoading) return;
        
        setIsLoading(true);
        setError(null);
        
        try {
            const newEmoji = selected === emoji ? null : emoji;
            await sendReaction(blogId, newEmoji);
            setSelected(newEmoji);
        } catch (err) {
            setError('Failed to update reaction');
            console.error('Reaction error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-2 mt-2">
            <div className="flex gap-2">
                {emojis.map((emoji) => (
                    <button
                        key={emoji}
                        onClick={() => handleReaction(emoji)}
                        disabled={isLoading}
                        className={`text-2xl transition-transform duration-200 ${selected === emoji ? 'scale-125' : ''} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {emoji} {reactionCounts[emoji]?.length || 0}
                    </button>
                ))}
            </div>
            {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
        </div>
    );
}
  