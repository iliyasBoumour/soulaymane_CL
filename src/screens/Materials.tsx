import { Box, Grid, styled, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Material } from '../components/Material';
import { PageTitle } from '../components/PageTitle';
import { TabsButtons } from '../components/Tabs';
import { useCategories } from '../hooks/useCategories';
import { useMaterials } from '../hooks/useMaterials';

export const MaterialsPage = () => {
  const [currentCategory, setCurrentCategory] = useState<number>(-1);
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
