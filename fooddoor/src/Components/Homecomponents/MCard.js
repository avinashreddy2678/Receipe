import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";


export default function MediaCard({ item }) {


  let navigate = useNavigate();
  const handleinfopage = (id) => {
    navigate(`/receipe/${id}`);
  };
  return (
    <Card sx={{ maxWidth: 345 }} className="mt-24 mx-24">
      <CardMedia
        onClick={() => handleinfopage(item._id)}
        sx={{ height: 140 }}
        image={item.imgurl}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.time} min
        </Typography>
      </CardContent>
    </Card>
  );
}
