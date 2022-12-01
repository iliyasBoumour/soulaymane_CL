import { Button, Paper, styled, Typography } from '@mui/material';
import { FunctionComponent } from 'react';

interface Props {
  id: string;
  name: string;
  description: string;
  demand: (id: string) => void;
}

export const Material: FunctionComponent<Props> = ({
  id,
  name,
  description,
  demand,
}) => {
  return (
    <Container elevation={3}>
      <Content>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body1">{description}</Typography>
      </Content>
      <Button variant="outlined" color="secondary" onClick={() => demand(id)}>
        Demander
      </Button>
    </Container>
  );
};

const Container = styled(Paper)`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-between;
  height: 100%;
`;

const Content = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
`;
