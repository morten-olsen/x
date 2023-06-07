import { BaseElement, Typography } from '@morten-olsen/x-ui';
import { withAuth } from '../../context';
import styled from 'styled-components';
import { useFetchAction } from '../../hooks';
import {
  useBlockContent,
  useBlockId,
  useBlockName,
  useOpen,
} from '@morten-olsen/x-blocks';
import { useCallback, useEffect } from 'react';
import { IoMdRefreshCircle } from 'react-icons/io';

// https://api.slack.com/methods

type ChannelContent = {
  id: string;
  user: any;
};
const Avatar = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
`;

const Wrapper = styled(BaseElement)`
  width: 200px;
`;

const UserRender = withAuth(() => {
  const id = useBlockId();
  const [name, setName] = useBlockName();
  const [value, setValue] = useBlockContent<ChannelContent>();
  const user = useFetchAction<any>(
    (o) => o('users.info', { user: value.id }),
    [value.id],
  );

  const open = useOpen();

  useEffect(() => {
    if (!value.id) {
      return;
    }
    if (!value.user) {
      user.update(null).then((data) => {
        const displayName =
          data.user?.real_name || data.user?.name || 'Unknown';
        setValue({ user: data });
        setName(name || `Slack: ${displayName}`);
      });
    }
  }, [value.id, setValue, user.update, value.user, user, name, setName]);

  const update = useCallback(() => {
    setValue({ user: undefined });
  }, [setValue]);

  if (user.loading) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper $fc $items="center" $justify="center" onClick={() => open(id)}>
      <Avatar src={value.user?.user?.profile?.image_192} alt="avatar" />
      <Typography>
        {value.user?.user?.real_name || value.user?.user?.name}{' '}
        <IoMdRefreshCircle onClick={update} />
      </Typography>
      <Typography variant="tiny">{value.user?.user?.profile?.title}</Typography>
    </Wrapper>
  );
});

export { UserRender };
