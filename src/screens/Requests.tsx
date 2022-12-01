import { Box, Button, styled, TextField, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { ButtonsGroup } from '../components/ButtonsGroup';
import { Modal } from '../components/Modal';
import { PageTitle } from '../components/PageTitle';
import { Table } from '../components/Table';
import { Store } from '../context/Store';
import { useAcceptOffer } from '../hooks/useAcceptOffer';
import { useRejectOffer } from '../hooks/useRejectOffer';

enum Filter {
  ALL = 'Tout',
  ARCHIVED = 'Archivées',
}

const rows = Array.from({ length: 10 }, (_, i) => ({
  requestId: i.toString(),
  materialName: `Demande ${i}`,
  requestorName: `Description de la demande ${i}`,
}));

export const RequestsPage = () => {
  const [filter, setFilter] = React.useState<Filter>(Filter.ALL);
  const [showModal, setShowModal] = React.useState(false);
  const [comment, setComment] = React.useState('');
  const [selectedRequestId, setSelectedRequestId] = React.useState<
    string | null
  >(null);
  const {
    state: {
      auth: { token },
    },
  } = useContext(Store);
  const { acceptOffer, isLoading: isAcceptingDemand } = useAcceptOffer();
  const { rejectOffer, isLoading: isRefusingDemand } = useRejectOffer();

  const closeModal = () => setShowModal(false);

  const handleAcceptRequest = (requestId: string) => {
    acceptOffer({ token, offerId: requestId });
  };

  const handleRefuseRequest = (requestId: string) => {
    setShowModal(true);
    setSelectedRequestId(requestId);
  };

  const rejectRequest = () => {
    if (selectedRequestId) {
      rejectOffer({
        offerId: selectedRequestId,
        comment,
        token,
      });
    }
    setShowModal(false);
  };

  return (
    <Box>
      <Modal open={showModal} onClose={closeModal}>
        <ModalContent>
          <Typography variant="h5">
            Voulez-vous vraiment refuser cette demande ?
          </Typography>
          <TextField
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
            multiline
            rows={4}
            label="Raison du refus"
            color="secondary"
          />
          <Button
            variant="outlined"
            color="secondary"
            sx={{
              width: 'fit-content',
              marginLeft: 'auto',
            }}
            onClick={rejectRequest}
          >
            Valider
          </Button>
        </ModalContent>
      </Modal>
      <PageTitle>Demandes</PageTitle>
      <Container>
        <TogglesContainer>
          <ButtonsGroup
            options={[Filter.ALL, Filter.ARCHIVED]}
            value={filter}
            onChange={(value: string) => setFilter(value as Filter)}
          />
        </TogglesContainer>
        <Table
          rows={rows}
          requestId={selectedRequestId}
          loadingAcceptRequest={isAcceptingDemand}
          loadingRefuseRequest={isRefusingDemand}
          acceptRequest={handleAcceptRequest}
          refuseRequest={handleRefuseRequest}
        />
      </Container>
    </Box>
  );
};

const Container = styled('div')`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ModalContent = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TogglesContainer = styled('div')`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
