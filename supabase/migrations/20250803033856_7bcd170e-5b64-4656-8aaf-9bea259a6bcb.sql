-- Add primary key constraint to posts table if not exists
ALTER TABLE public.posts ADD CONSTRAINT posts_pkey PRIMARY KEY (id);

-- Create comments table for post discussions
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id BIGINT NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  upvotes INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on posts table
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Enable Row Level Security on comments table
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Create policies for posts table (allow public read/write for now)
CREATE POLICY "Allow public read access to posts" 
ON public.posts FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert to posts" 
ON public.posts FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public update to posts" 
ON public.posts FOR UPDATE 
USING (true);

-- Create policies for comments table (allow public read/write for now)
CREATE POLICY "Allow public read access to comments" 
ON public.comments FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert to comments" 
ON public.comments FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public update to comments" 
ON public.comments FOR UPDATE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates on comments
CREATE TRIGGER update_comments_updated_at
  BEFORE UPDATE ON public.comments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();