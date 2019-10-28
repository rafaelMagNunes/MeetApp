import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import ptBR from 'date-fns/esm/locale/pt-BR';

import { MdAddCircleOutline } from 'react-icons/md';
import { findMeetupRequest } from '~/store/modules/meetup/actions';

import { Container, Main } from './styles';
import api from '~/Services/api';
import history from '~/Services/history';

export default function Details({ match }) {
  const dispatch = useDispatch();

  const [meetup, setMeetup] = useState([]);

  useEffect(() => {
    async function loadMeetup() {
      const { id } = match.params;

      const response = await api.get(`meetupsbyid/${id}`);

      const { data } = response;

      setMeetup([data]);
    }

    loadMeetup();
  }, [match.params, meetup]);

  async function handleCancel() {
    const { id } = match.params;

    try {
      await api.delete(`meetups/${id}`);

      history.push('/');
    } catch (err) {
      toast.error('Erro ao cadastrar a meetup, confira os dados');
    }
  }

  function handleEdit() {
    dispatch(findMeetupRequest(meetup));
  }

  return (
    <Container>
      {meetup.map(meetups => (
        <div key={meetups.id}>
          <header>
            <h2>{meetups.title}</h2>
            <aside>
              <button type="button" onClick={handleEdit}>
                <h4>
                  <MdAddCircleOutline size={22} /> <p> Editar </p>
                </h4>
              </button>
              <button type="button" onClick={handleCancel}>
                <h4>
                  <MdAddCircleOutline size={22} /> <p> Cancelar </p>
                </h4>
              </button>
            </aside>
          </header>

          <Main>
            <img src={meetups.File.url} alt="Imagem teste" />
            <h4>{meetups.description}</h4>
            <footer>
              <span>
                {format(parseISO(meetups.date), `dd 'de' MMMM, 'às' HH:mm'h'`, {
                  locale: ptBR,
                })}
              </span>
              <span>{meetups.location}</span>
            </footer>
          </Main>
        </div>
      ))}
    </Container>
  );
}
