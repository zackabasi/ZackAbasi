"use client";

import { motion } from "framer-motion";

export default function MyStoryClient({ biography }: { biography: any }) {
  // Use fallback if Sanity is empty
  const title = biography?.header || "My story is your story!";
  const coverUrl = biography?.coverImage || "/my story/cover.webp";
  
  // Format Sanity block content to paragraphs (very simple text parsing, assumes plain text paragraphs)
  const renderContent = () => {
    if (biography?.content) {
      const paragraphs = biography.content.split('\n\n');
      return paragraphs.map((p: string, idx: number) => (
        <p key={idx} style={{ 
          fontWeight: idx >= paragraphs.length - 2 ? 600 : 400, 
          color: idx >= paragraphs.length - 2 ? 'var(--text-primary)' : 'inherit' 
        }}>
          {p}
        </p>
      ));
    }
    
    // Fallback Content
    return (
      <>
        <p>
          I was born in Latakia, Syria, right where the first musical notation was discovered in the archaeological site of Ugarit. Something from the spirit of this ancient musical heritage has survived to live in me. Even in the times of conflict and division my country has witnessed, I have always found that profound connection in my inner music. Even through the wrong choices I made, going astray from my calling, I always found my solace in that pure essence of music, which has always waited for me to come back, to revive and rejoice in it.
        </p>
        <p>
          Until recently, I decided that nothing should be taken for granted. Life is short, so why waste it playing a role that is not meant for me? I took the jump to dive deeper into my love for music. I dropped my whole past: my day job, my social life, and even my engineering degree. No label, no achievement is worth clinging to in the alive presence of the musical soul. For me, everything else is secondary.
        </p>
        <p>
          While this might sound like just another artist's story, for me, it's more than that. My story is yours! Yes, you've read that right. I am unfolding my story because I owe it to the world to share what I have to make it a little more beautiful than it was before I entered it. If I don't unleash this potential, I am not just betraying myself, but also betraying YOU! At the end of the day, it's the people who risk everything to be themselves who contribute something meaningful to the world, in spite of the cruelty we live in.
        </p>
        <p>
          Imagine if your favorite artist, novelist, or poet had never existed or had decided not to pursue their passion. Something would be missing, right? That's why I am sharing my story with you—because this is ours. And I would also love to be a part of your story. By being myself, working on it, and growing it, I am also shaping the way for others and encouraging them to be themselves. So please, accept me as a friend by soul. We don't need to meet; the ignition of our hearts is what it takes to find peers dancing on the same frequency of love and celebration.
        </p>
        <p>
          Please, be yourself! Accept it, love it, nourish it. That's the only way to find harmony within yourself and the world around you. It's the only way to solve the human problems that we have created. No charity has worked; no political campaign has been able to fulfill its objectives. But you and I can contribute to the real solution by simply being true to ourselves, by choosing love over fear, and by choosing love over fear, and by rebelling against the burdens of the past that no longer serve us. This is not about any outer protest, but about the rebellion of the spirit to transcend its own limitations, which are made of nothing but illusions.
        </p>
        <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
          Let's break them together.
        </p>
        <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
          Let's make it happen!
        </p>
      </>
    );
  };

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: '80px' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ maxWidth: '800px', margin: '0 auto' }}
      >
        <h1 style={{ marginBottom: '2rem', textAlign: 'center', fontSize: '3rem', letterSpacing: '-0.02em' }}>
          {title}
        </h1>
        
        <div style={{ marginBottom: '3rem', width: '100%', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
          <img 
            src={coverUrl} 
            alt={title} 
            style={{ width: '100%', height: 'auto', display: 'block' }} 
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1200&h=600";
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem', color: 'var(--text-secondary)', fontSize: '1.125rem', lineHeight: 1.8 }}>
          {renderContent()}
        </div>
      </motion.div>
    </div>
  );
}
