import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import actions from 'src/actions';


const Post = () => {

  const router = useRouter();
  const { token } = router.query;
  if(typeof token == undefined || Array.isArray(token)) {
    return failure();
  }
  const [loading, setLoading] = useState(true);
  useDispatch()(actions.auth.verify(token as string));
  setLoading(false);

  return <p>Post: {}</p>
}

const success = () => {

}

const failure = () => {

}

export default Post
