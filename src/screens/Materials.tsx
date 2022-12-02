import { Box, Grid, styled, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { Material } from '../components/Material';
import { PageTitle } from '../components/PageTitle';
import { TabsButtons } from '../components/Tabs';
import { Store } from '../context/Store';
import { useCategories } from '../hooks/useCategories';
import { useMaterials } from '../hooks/useMaterials';
import { useDemandOffer } from '../hooks/useDemandOffer';

export const MaterialsPage = () => {
  const {
    state: {
      auth: { token, user },
    },
  } = useContext(Store);
  const [currentCategory, setCurrentCategory] = useState<number>(-1);
  const { data: categories, error, isLoading } = useCategories();
  const {
    data: materials,
    error: errorMaterials,
    isLoading: loadingMaterials,
  } = useMaterials();
  const { mutate: demandMaterial } = useDemandOffer();

  const sendDemand = (id: string) => {
    demandMaterial({ id, token });
    alert('Demande envoyée');
  };

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
              <Material {...m} user={user} demand={sendDemand} />
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
