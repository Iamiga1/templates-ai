import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CheckCircle from '@material-ui/icons/CheckCircle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(6),
    maxWidth: '1280px',
    margin: '0 auto',
  },
  titleBar: {
    width: '128px',
    height: '4px',
    background: '#008080',
    borderRadius: '9999px',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  mainTitle: {
    fontSize: '1.875rem',
    fontWeight: 700,
    color: '#00796b',
  },
  mainCard: {
    padding: theme.spacing(8),
    background: 'linear-gradient(to bottom right, #e0f2f1, #ffffff)',
    borderColor: '#b2dfdb',
    marginBottom: theme.spacing(8),
  },
  subtitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    marginBottom: theme.spacing(4),
    color: '#424242',
  },
  featuresTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: theme.spacing(4),
    color: '#424242',
  },
  description: {
    color: '#616161',
    marginBottom: theme.spacing(6),
  },
  tealButton: {
    backgroundColor: '#008080',
    color: 'white',
    padding: '10px 24px',
    '&:hover': {
      backgroundColor: '#00695c',
    },
  },
  featureContainer: {
    marginBottom: theme.spacing(8),
  },
  featureItem: {
    display: 'flex',
    gap: theme.spacing(2),
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'white',
    border: '1px solid #f0f0f0',
    boxShadow: theme.shadows[1],
  },
  featureIcon: {
    color: '#009688',
    flexShrink: 0,
  },
  featureTitle: {
    fontWeight: 500,
    color: '#424242',
  },
  featureDescription: {
    fontSize: '0.875rem',
    color: '#616161',
  },
  callToAction: {
    padding: theme.spacing(6),
    backgroundColor: '#e0f2f1',
    borderColor: '#b2dfdb',
  },
  ctaTitle: {
    fontSize: '1.125rem',
    fontWeight: 500,
    color: '#00695c',
  },
  ctaText: {
    color: '#00796b',
  },
  image: {
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
  },
}));

function FeatureItem({ title, description }) {
  const classes = useStyles();
  
  return (
    <Box className={classes.featureItem}>
      <CheckCircle className={classes.featureIcon} />
      <Box>
        <Typography variant="h6" className={classes.featureTitle}>
          {title}
        </Typography>
        <Typography variant="body2" className={classes.featureDescription}>
          {description}
        </Typography>
      </Box>
    </Box>
  );
}

export function AccessPlatformContent() {
  const classes = useStyles();
  
  return (
    <Box className={classes.root}>
      <Box mb={8}>
        <Typography variant="h1" className={classes.mainTitle}>
          Nova Plataforma de Gestão de Acessos
        </Typography>
        <Box className={classes.titleBar}></Box>
      </Box>

      <Card className={classes.mainCard} variant="outlined">
        <CardContent>
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h2" className={classes.subtitle}>
                Simplifique o gerenciamento de acessos da sua organização
              </Typography>
              <Typography variant="body1" className={classes.description}>
                Nossa nova plataforma de gestão de acessos foi projetada para oferecer mais segurança, eficiência e
                facilidade de uso. Centralize o controle de permissões e identidades em um único lugar com uma interface
                intuitiva e recursos avançados.
              </Typography>
              <Button variant="contained" className={classes.tealButton}>
                Acessar Plataforma
              </Button>
            </Grid>
            <Grid item xs={12} md={4} style={{ display: { xs: 'none', md: 'block' } }}>
              <img
                src="/placeholder.svg?height=200&width=300"
                alt="Ilustração da plataforma de gestão de acessos"
                className={classes.image}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box className={classes.featureContainer}>
        <Typography variant="h3" className={classes.featuresTitle}>
          Principais Recursos
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <FeatureItem
              title="Autenticação Centralizada"
              description="Gerencie todas as identidades e métodos de autenticação em um único painel."
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FeatureItem
              title="Controle Granular de Permissões"
              description="Defina permissões específicas para usuários, grupos e recursos com precisão."
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FeatureItem
              title="Autenticação Multifator"
              description="Adicione camadas extras de segurança com diversos métodos de verificação."
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FeatureItem
              title="Integração com Serviços Existentes"
              description="Conecte facilmente com sistemas e aplicações já utilizados pela sua organização."
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FeatureItem
              title="Auditoria e Relatórios"
              description="Acompanhe todas as atividades e gere relatórios detalhados de segurança."
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FeatureItem
              title="Automação de Fluxos de Trabalho"
              description="Automatize processos de aprovação e revogação de acessos."
            />
          </Grid>
        </Grid>
      </Box>

      <Card className={classes.callToAction} variant="outlined">
        <CardContent>
          <Grid container alignItems="center" justifyContent="space-between" spacing={4}>
            <Grid item xs={12} md={8}>
              <Typography variant="h4" className={classes.ctaTitle}>
                Pronto para começar?
              </Typography>
              <Typography variant="body1" className={classes.ctaText}>
                Acesse agora e simplifique a gestão de acessos da sua organização.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} container justifyContent={{ xs: 'flex-start', md: 'flex-end' }}>
              <Button variant="contained" className={classes.tealButton}>
                Acessar Plataforma
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
