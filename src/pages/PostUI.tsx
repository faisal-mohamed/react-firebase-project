import React, { useEffect, useState } from 'react';
import { PostType } from './Main';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

interface Props {
    post: PostType
}
interface Like {
    likeId: string,
    userId: string
}
export const PostUI = (props:Props) => {

    const [likes,setLikes] = useState<Like[] | null>(null)
    const likesReference = collection(db, "likes");
    const [user] = useAuthState(auth);

    
    const likeDoc = query(likesReference, where("postId","==",props.post.id));

    const onLikePost = async ()=>{
        try{
        const newDoc = await addDoc(likesReference,{
            userId: user?.uid,
            postId:props.post.id , /**Here the id of the post is from the unique id of the post that is created by firebase when we create a post that is passed via props here in this code  */
        })
        /**The below if condition is used to update the UI to like  */
        if(user)
            setLikes((prev) => prev ? [...prev, {userId: user?.uid,likeId: newDoc.id}] : [{userId: user?.uid,likeId: newDoc.id}])
    
        } catch(err) {
            console.log(err);
        }
    }


    const onUnLikePost = async ()=>{
        try{
            const RemoveLikeQuey = query(likesReference, where("postId","==",props.post.id),where("userId","==",user?.uid))
            const RemoveLike = await getDocs(RemoveLikeQuey)
            const UnLike = doc(db,"likes",RemoveLike.docs[0].id);  /**The third parameter in this function call is the id of the post that we want to unlike */
            await deleteDoc(UnLike);
       
       if(user)
            setLikes((prev) => prev && prev.filter((like) => like.likeId !== RemoveLike.docs[0].id) )
    
        } catch(err) {
            console.log(err);
        }
    }



    async function getLike() {
        const data = await getDocs(likeDoc);
        //console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) )
        setLikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id })));
        /**here the concept is that when we hit the like button the length of the array is increased by 1 to that specific postid hence by konwing the length of that array we can able to count the amount of likes for a certain post  */
    }

    const isUserLiked = likes?.find((like)=>like.userId === user?.uid);

    useEffect(()=>{
        getLike();
    },[])

  return (
    <div>
        <div className="posts">   
            <div className='post-ui'>
                <div className="title">
                    <h1>{props.post.title}</h1>
                </div>
                <div className="body">
                    <p>{props.post.description}</p>
                </div>
                <div className="footer">
                    <p>@{props.post.username}</p>
                    <button style={{color: (isUserLiked) ? "red" : "grey"}} onClick={ isUserLiked ? onUnLikePost :   onLikePost}>  &#10084; </button>
                    {likes && <p>Like: {likes.length}</p> }
                </div>
            </div>
        </div>
    </div>
  )
}
