import styled from 'styled-components';
import profile from '../generated/profile.json';
import Avatar from './avatar';

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

export default function Profile() {
  return (
    <>
      <List>
        <li>{profile.id}</li>
        <li>{profile.type}</li>
        <li>{profile.location}</li>
      </List>
    </>
  );
}
