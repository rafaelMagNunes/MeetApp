import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import PropTypes from 'prop-types';

import {
  updateMeetupRequest,
  storeMeetupRequest,
} from '~/store/modules/meetup/actions';

import MeetupImageInput from './MeetupImageInput';

import { Container } from './styles';

export default function Meetup({ match }) {
  const dispatch = useDispatch();
  const meetup_redux = useSelector(state => state.meetup.meetup);
  const [meetup, setMeetup] = useState(meetup_redux && null);

  useEffect(() => {
    function loadMeetup() {
      if (match.params.id) {
        setMeetup(meetup_redux);
      } else {
        setMeetup(null);
      }
    }

    loadMeetup();
  }, [meetup_redux, setMeetup, meetup, match.params.id]);

  async function handleSubmit(data) {
    if (match.params.id) {
      const { id } = match.params;
      const updatemeetup = Object.assign({ id }, data);
      dispatch(updateMeetupRequest(updatemeetup));
    } else {
      dispatch(storeMeetupRequest(data));
    }
  }

  return (
    <Container>
      <Form initialData={meetup} onSubmit={handleSubmit}>
        <MeetupImageInput name="file_id" />
        <Input name="title" type="text" placeholder="Título do Meetup" />
        <Input
          multiline
          name="description"
          type="text"
          placeholder="Descrição completa"
        />
        <Input name="date" type="datetime" placeholder="Data do Meetup" />
        <Input
          name="location"
          type="text"
          placeholder="Localização do Meetup"
        />
        <button type="submit">Salvar</button>
      </Form>
    </Container>
  );
}

Meetup.protoTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.string,
    }),
  }).isRequired,
};
