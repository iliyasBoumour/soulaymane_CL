import {
  Autocomplete,
  Box,
  Button,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { useContext, useState } from 'react';
import { Modal } from '../components/Modal';
import { PageTitle } from '../components/PageTitle';
import { Store } from '../context/Store';
import { useAddMaterial } from '../hooks/useAddMaterial';
import { useCategories } from '../hooks/useCategories';
import { Material as MaterialType, Role } from '../types';

export const MyOffersPage = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [material, setMaterial] = useState<MaterialType>({
    id: '',
    name: '',
    description: '',
    categoryIds: [],
  });
  const {
    state: {
      auth: { token, user },
    },
  } = useContext(Store);
  const { data: categories } = useCategories();
  const { mutate: addOffer } = useAddMaterial();

  const handleMaterialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaterial({ ...material, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addOffer({
      material: { ...material, title: material.name },
      token,
    });
    setAddModalOpen(false);
    alert('Offre ajouté');
  };

  return (
    <Box>
      <PageTitle>Matériels disponibles</PageTitle>
      <Container>
        {user && user.role.includes(Role.ROLE_REPRESENTATIVE) && categories && (
          <>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setAddModalOpen(true)}
            >
              Ajouter une offre
            </Button>
            <Modal open={addModalOpen} onClose={() => setAddModalOpen(false)}>
              <ModalContent>
                <Typography variant="h6">Ajouter une offre</Typography>
                <Form onSubmit={(e) => handleSubmit(e)}>
                  <TextField
                    label="Nom du matériel"
                    variant="outlined"
                    name="name"
                    value={material.name}
                    onChange={handleMaterialChange}
                    fullWidth
                    color="secondary"
                  />
                  <TextField
                    label="Description"
                    variant="outlined"
                    name="description"
                    value={material.description}
                    onChange={handleMaterialChange}
                    fullWidth
                    color="secondary"
                  />
                  <Autocomplete
                    multiple
                    options={categories}
                    getOptionLabel={(option) => option.name}
                    filterSelectedOptions
                    onChange={(e, value) => {
                      setMaterial({
                        ...material,
                        categoryIds: value.map((v) => v.id),
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        color="secondary"
                        label="categories"
                      />
                    )}
                  />
                  <Button type="submit" variant="outlined" color="secondary">
                    Ajouter
                  </Button>
                </Form>
              </ModalContent>
            </Modal>
          </>
        )}
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
