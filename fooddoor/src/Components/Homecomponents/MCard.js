import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

export default function MediaCard({ item }) {
  const [cookies,]=useCookies(["access_token"]);
  const userid = window.localStorage.getItem("userid");
    const handledelete=async(_id)=>{
      console.log(_id)
        const response=await axios.delete("http://localhost:4001/delete",{
          params:{
            userid,
            _id
          },
          headers: {
            authorization: cookies.access_token,
          },
        })
        if(response){
            console.log(response);
        }
        else{

        }
    }
  
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
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=>handledelete(item._id)}>Delete</Button>
      </CardActions>
    </Card>
  );
}
