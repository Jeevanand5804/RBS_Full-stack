import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Grid ,Card,CardContent,CardActions, Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';


const Menu = () => {
  // State variables to store form data
  const [productImage, setProductImage] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null);
  const [editProductData, setEditProductData] = useState({});

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to server to create a product
      const response = await axios.post('http://localhost:3000/create-product', {
        productImage,
        title,
        price,
        description
      });

      // If product creation is successful, reset form and show success message
      console.log('Product created:', response.data);
      setProductImage('');
      setTitle('');
      setPrice('');
      setDescription('');
      setErrorMessage('');
    } catch (error) {
      // If an error occurs, show error message
      console.error('Error creating product:', error.message);
      setErrorMessage('Failed to create product. Please try again.');
    }
  };
  useEffect(() => {
    // Fetch all products from the server when the component mounts
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/get-all-products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchProducts();
  }, []);
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/delete-product/${id}`);
      // Filter out the deleted product from the state
      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error.message);
    }
  };
  const handleEdit = (product) => {
    setEditProductId(product._id);
    setEditProductData({
      productImage: product.productImage,
      title: product.title,
      price: product.price,
      description: product.description
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProductData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`http://localhost:3000/edit-product/${editProductId}`, editProductData);
      // Update the product list with the edited product
      setProducts(products.map(product =>
        product._id === editProductId ? { ...product, ...editProductData } : product
      ));
      // Close the edit dialog
      setEditProductId(null);
    } catch (error) {
      console.error('Error editing product:', error.message);
    }
  };


  return (
    <>
    <Container maxWidth="sm">
    <Typography variant="h4" gutterBottom>Add MenuItems</Typography>
    {errorMessage && <Typography color="error">{errorMessage}</Typography>}
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            label="Item Image URL"
            rows={4}
            value={productImage}
            onChange={(e) => setProductImage(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Create Product
          </Button>
        </Grid>
      </Grid>
    </form>
  </Container>

<Container maxWidth="md" sx={{marginTop:"50px"}}>
<Grid container spacing={3}>
  {products.map(product => (
    <Grid item key={product._id} xs={12} sm={6} md={4}>
      <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <img src={product.productImage} alt={product.title} style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }} />
        <CardContent>
          <Typography variant="h5" component="h2">{product.title}</Typography>
          <Typography color="textSecondary" gutterBottom>{product.price}</Typography>
          <Typography variant="body2" component="p">{product.description}</Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" size="small" onClick={() => handleDelete(product._id)}>Delete</Button>
          <Button variant="contained" color="secondary" size="small" onClick={() => handleEdit(product)}>Edit</Button>
        </CardActions>
      </Card>
    </Grid>
  ))}
</Grid>
 {/* Edit Dialog */}
 <Dialog open={Boolean(editProductId)} onClose={() => setEditProductId(null)}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField fullWidth multiline rows={4} label="Product Image URL" name="productImage" value={editProductData.productImage} onChange={handleEditChange} />
          <TextField fullWidth label="Title" name="title" value={editProductData.title} onChange={handleEditChange} />
          <TextField fullWidth label="Price" name="price" value={editProductData.price} onChange={handleEditChange} />
          <TextField fullWidth multiline rows={4} label="Description" name="description" value={editProductData.description} onChange={handleEditChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditProductId(null)}>Cancel</Button>
          <Button onClick={handleEditSubmit} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
</Container>
</>
  );
};

export default Menu;
