import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './Home.css';
import { auth } from '../../firebase';

const ExpandMore = (props) => {
  const { onClick } = props;
  return <IconButton onClick={onClick} />;
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [user, setUser] = useState(null);

  const history = useHistory();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8001/api/products/timeline');
        const data = await response.json();
        setProducts(data);
        // Initialize expanded state for each product
        const initialExpandedState = {};
        data.forEach((product) => {
          initialExpandedState[product.id] = false;
        });
        setExpanded(initialExpandedState);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();

    // Add an auth state change listener
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);

      // Redirect to the login page if the user is not logged in
      if (!user) {
        history.push('/signin');
      }
    });

    // Cleanup the listener on component unmount
    return () => {
      unsubscribe();
    };
  }, [history]);

  const handleExpandClick = (productId) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [productId]: !prevExpanded[productId],
    }));
  };

  return (
    <div>
      {user ? (
        <>
          <h1>{user.displayName}'s timeline</h1>
          <a href='/create'>Sell your product</a>
          <div>
            {products.map((product) => (
              <Card key={product.id} sx={{ maxWidth: 345 }} className="card">
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      R
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={product.title}
                  subheader={product.date}
                />
                <CardMedia
                  component="img"
                  height="194"
                  image={product.image}
                  alt="Image"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Category: {product.category}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: {product.price}$
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.likes} likes
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                  <ExpandMore
                    onClick={() => handleExpandClick(product.id)}
                    aria-expanded={expanded[product.id]}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expanded[product.id]} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>{product.price}</Typography>
                  </CardContent>
                </Collapse>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <p>Please log in to view this page.</p>
      )}
    </div>
  );
};

export default Home;
