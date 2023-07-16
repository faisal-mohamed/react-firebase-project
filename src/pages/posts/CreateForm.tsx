import React from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import {db} from '../../config/firebase';
import {addDoc, collection} from 'firebase/firestore';
import { auth } from '../../config/firebase';
import {useAuthState} from 'react-firebase-hooks/auth'; /*This hook is used to update the login logout functionality in sync with the UI*/
import { useNavigate } from 'react-router-dom';

interface CreateFormData  {
    title:String,
    description: String
}

export const CreateForm = () => {

    const schema = yup.object().shape({
        title: yup.string().required("Title field is required"),
        description: yup.string().required('Description field is required')
    });
    const { register, handleSubmit, formState: {errors}} = useForm <CreateFormData> ({
        resolver: yupResolver(schema),  /**yupResolver is udexd to connect the recat-hook-form and the yup for validation purpose */
    });

    const PostReference = collection(db,"posts");
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const onCreatePost = async (data: CreateFormData)=>{
            /*console.log(data);*/
            await addDoc(PostReference, {
                title: data.title,
                description: data.description,
                username: user?.displayName,
                userId: user?.uid, /**This is the id of the user loggedin that is specified by google   */

            });
        navigate("/");
    }

  return (
    <div>
        <form onSubmit={handleSubmit(onCreatePost)}>
            <input type="text" placeholder="Title..." {...register('title')}/>
            <p style={{color: "red"}}>{errors.title?.message}</p>
            <textarea  placeholder='Description...' {...register('description')} />
            <p style={{color: "red"}}>{errors.description?.message}</p>
            <input type="submit" className="postSubmit" />
        </form>
    </div>
  )
}
