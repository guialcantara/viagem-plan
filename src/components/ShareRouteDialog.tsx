import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import { Share, ContentCopy } from '@mui/icons-material';
import { TouristPoint } from '../services/touristService';
import { shareRoute, generateShareableLink, copyToClipboard } from '../services/routeSharingService';

interface ShareRouteDialogProps {
  open: boolean;
  onClose: () => void;
  cities: string[];
  points: TouristPoint[];
}

const ShareRouteDialog = ({ open, onClose, cities, points }: ShareRouteDialogProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [shareableLink, setShareableLink] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  const handleShare = async () => {
    try {
      const sharedRoute = await shareRoute(
        name,
        description,
        cities,
        points,
        'Usuário Anônimo' // Em um caso real, isso viria de um sistema de autenticação
      );

      const link = generateShareableLink(sharedRoute.id);
      setShareableLink(link);
      setShowSuccess(true);
    } catch (error) {
      console.error('Erro ao compartilhar rota:', error);
    }
  };

  const handleCopyLink = async () => {
    await copyToClipboard(shareableLink);
    setShowCopySuccess(true);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Compartilhar Rota</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Nome da Rota"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={3}
              fullWidth
              required
            />
            {shareableLink && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Link para compartilhar:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    value={shareableLink}
                    fullWidth
                    size="small"
                    InputProps={{ readOnly: true }}
                  />
                  <Button
                    startIcon={<ContentCopy />}
                    onClick={handleCopyLink}
                    variant="outlined"
                  >
                    Copiar
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          {!shareableLink && (
            <Button
              onClick={handleShare}
              startIcon={<Share />}
              variant="contained"
              disabled={!name || !description}
            >
              Compartilhar
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Rota compartilhada com sucesso!
        </Alert>
      </Snackbar>

      <Snackbar
        open={showCopySuccess}
        autoHideDuration={2000}
        onClose={() => setShowCopySuccess(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Link copiado para a área de transferência!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ShareRouteDialog; 