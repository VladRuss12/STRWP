import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const DeleteConfirmationDialog = ({ open, onClose, deleteHandler, item }) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (item && deleteHandler) {
      setLoading(true);
      try {
        await deleteHandler(item); 
      } finally {
        setLoading(false);
        onClose(); 
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete {item?.title ? `"${item.title}"` : "this item"}?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="error" disabled={loading}>
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
