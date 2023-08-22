import { useCallback, useMemo } from 'react';
import { toggleLike } from '../../../api/user.api';
import { FilledHeartIcon } from '../../../svg/filledHeart.icon';
import { AddLike } from '../../../svg/add-like.icon';
import { LikeIcon } from '../../../svg/like.icon';
import { UnlikeIcon } from '../../../svg/unlike.icon';
import { c } from '../../../utils/classname.utils';
import { suppressEvent } from '../../../utils/event.utils';
import { useUser } from '../../../utils/hooks/user.hook';
import styles from './like-product.module.scss';

const useIsLiked = (productId: string) => {
  const {
    user,
    setUser,
  } = useUser();


  return {
    liked: useMemo(() => user!.favouriteProducts!.some(
      p => p._id === productId,
    ), [productId, user]),
    toggle: useCallback(async () => {
      const updatedUser = await toggleLike(productId);

      console.log(updatedUser.favouriteProducts);

      setUser(updatedUser);
    }, [productId, setUser]),
  };
};

export const LikeProduct = ({
  productId,
  isMobile,
}: { productId: string, isMobile?: boolean }) => {
  const {
    liked,
    toggle,
  } = useIsLiked(productId);

  const toggleLikeHandler = useCallback(suppressEvent(toggle), [toggle]);

  if (isMobile && liked) {
    return (
      <div
        onClick={toggleLikeHandler}
        className={c(styles.likeproduct, styles.likeproduct_liked, styles.likeproduct__mobile)}
      >
        <FilledHeartIcon className={styles.likeproduct__liked_mobile}/>
      </div>);
  }

  return <div onClick={toggleLikeHandler}
              className={c(styles.likeproduct, {
                [styles.likeproduct_liked]: liked,
                [styles.likeproduct__mobile]: isMobile,
              })}>
    <LikeIcon className={styles.likeproduct__likeicon} />
    <UnlikeIcon className={styles.likeproduct__unlikeicon} />
    <AddLike className={styles.likeproduct__addlikeicon} />
  </div>;
};
