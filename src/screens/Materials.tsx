import {
  Autocomplete,
  Box,
  Button,
  Grid,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { useContext, useState } from 'react';
import { Material as MaterialType } from '../types';
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
  const [material, setMaterial] = useState<MaterialType>({
    id: '',
    name: '',
    description: '',
    categoriesId: [],
  });
  const [currentCategory, setCurrentCategory] = useState<number>(-1);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const { data: categories, error, isLoading } = useCategories();
  const {
    data: materials,
    error: errorMaterials,
    isLoading: loadingMaterials,
  } = useMaterials();

  const handleMaterialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaterial({ ...material, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e:any)=>{
    e.preventDefault();
    console.log(material);
  }

  if (error || errorMaterials) {
    return <Typography variant="body1">Error</Typography>;
  }

  if (isLoading || loadingMaterials) {
    return <Typography variant="body1">Loading</Typography>;
  }

  return (
    <Box>
      <PageTitle>Matériels disponibles</PageTitle>
      <Container>
        {token && categories && (
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
                <Form onSubmit={(e)=>handleSubmit(e)}>
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
                    color="secondary"
                    options={categories}
                    getOptionLabel={(option) => option.name}
                    filterSelectedOptions
                    onChange={(e, value) => {
                      setMaterial({
                        ...material,
                        categoriesId: value.map((v) => v.id),
                      });
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="categories" />
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
        {categories && (
          <TabsButtons
            options={categories?.map((category) => category.name)}
            value={currentCategory}
            onChange={setCurrentCategory}
          />
        )}
        <Grid container spacing={5}>
          {materials?.map((m) => (
            <Grid item key={m.id} xs={12} md={6} lg={4}>
              <Material {...m} />
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
