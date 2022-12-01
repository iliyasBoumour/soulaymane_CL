import {
  Box,
  Button,
  Grid,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Material } from '../components/Material';
import { Modal } from '../components/Modal';
import { PageTitle } from '../components/PageTitle';
import { TabsButtons } from '../components/Tabs';
import { Store } from '../context/Store';
import { useCategories } from '../hooks/useCategories';
import { useMaterials } from '../hooks/useMaterials';

export const MaterialsPage = () => {
  const {
    state: {
      auth: { token },
    },
  } = useContext(Store);
  const [currentCategory, setCurrentCategory] = useState<number>(-1);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const { data: categories, error, isLoading } = useCategories();
  const {
    data: materials,
    error: errorMaterials,
    isLoading: loadingMaterials,
  } = useMaterials();

  useEffect(() => {
    if (currentCategory === -1 || !categories) {
      return;
    }
    console.log('fetch ', categories[currentCategory]);
  }, [categories, currentCategory]);

  if (error || errorMaterials) {
    return <Typography variant="body1">Error</Typography>;
  }

  if (isLoading || loadingMaterials) {
    return <Typography variant="body1">Loading</Typography>;
  }

  return (
    <Box>
      <PageTitle>Matériels disponibles</PageTitle>
      {token && (
        <>
          <Button variant="contained" color="secondary">
            Ajouter une offre
          </Button>
          <Modal open={addModalOpen} onClose={() => setAddModalOpen(false)}>
            <ModalContent>
              <Typography variant="h6">Ajouter une offre</Typography>
              <Form>
                <TextField
                  label="Nom du matériel"
                  variant="outlined"
                  fullWidth
                  color="secondary"
                />
                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  color="secondary"
                />
                <Button variant="outlined" color="secondary">
                  Ajouter
                </Button>
              </Form>
            </ModalContent>
          </Modal>
        </>
      )}
      <Container>
        {categories && (
          <TabsButtons
            options={categories?.map((category) => category.name)}
            value={currentCategory}
            onChange={setCurrentCategory}
          />
        )}
        <Grid container spacing={5}>
          {materials?.map((material) => (
            <Grid item key={material.id} xs={12} md={6} lg={4}>
              <Material {...material} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

const Container = styled('div')`
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ModalContent = styled('div')`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Form = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
