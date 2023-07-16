import React, { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../config/firebase';
import { PostUI } from './PostUI';

export interface PostType {
  id: string,
  userId: string,
  title: string,
  description: string,
  username: string
}

export const Main = () => {
  const [postsList, setPostsList] = useState<PostType[] | null>(null);

  const postReference = collection(db, "posts");

  const getPosts = async () => {
    const data = await getDocs(postReference);
    setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as PostType[]);
    // console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  useEffect(() => {
    getPosts();

  }, []);

  return (
    <div>
      {postsList?.map((post) => (
        <PostUI post={post} />
      ))}
    </div>
  );
}
