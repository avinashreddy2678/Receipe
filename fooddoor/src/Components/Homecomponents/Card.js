import axios from "axios";
import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useNavigate } from "react-router-dom";
const Card = ({ item, liked, saved }) => {
  const [like, setlike] = useState();
  const [save, setsave] = useState();
  const [likecount, setlikecount] = useState();
  const userid = window.localStorage.getItem("userid");
  const navigate=useNavigate();
  useEffect(() => {
    setlikecount(item.Liked.length);
  }, [item.Liked]);
  useEffect(() => {
    setlike(liked);
  }, [liked]);
  useEffect(() => {
    setsave(saved);
  }, [saved]);
  //for clikcing the name and getting receipe of htat particular user
  const handlenameclick = (_id) => {
    console.log(_id);
  };

  // if no image is provided it will take default imate
  const img = item.imgurl
    ? item.imgurl
    : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHsAiQMBIgACEQEDEQH/xAAbAAEBAQEAAwEAAAAAAAAAAAAAAQQGAwUHAv/EADkQAAEDAgEHCAgHAQAAAAAAAAABAgMEBREGElFVYZPRFBUXISMxNbJBU2JzdIGSsTJCcpGhs+EH/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APsQAAAAAAAAAAAAAAAAAAAAAQpAKAAAAAAAAAAAAAAAAAAAAAEKQCgAAAAAB+Xvaxqve5GtamKqq4IiAfoGLne2awpN83iOd7ZrGk3zeIG0GLne2axpN83iOd7ZrGk3zeIG0GLne2awpN83iaopY5o0khe2Rju5zVxRQP2AAAAAEKQCgAAAABhvngtf8PJ5VNxhvngtf8PJ5VA8tNTQcni7CL8DfyJoPJyan9RF9CCnVEpolXqRI0x/Y4y65eMgu0cVDG2ajjXCZ/pk/TsT+QOxkhpY2Oe+KFrWoqucrEwRD1tou9mvEskVCkb3xpiqOizcU0psNsM1JeLaronpLTVDFauHUuCp1psU9LaMnrfkutRcZauRyIxUz5cERjfl3qoHQ8mp/URfQhhydREtTUREREll6k9443UtRDV08dRTSNkhkTOa5PShiye8Lb72X+xwHsgAAAAAhSAUAAAAAMN88Fr/AId/lU3HgraflVHPTq7NSWNzM7DHDFMMQPneVeVbqyBtutz1SnaxElkTqWRdCbPucih3yf8AOY8PE37lOJejmPWb9ynEDmcmsoJ7FVYtxkpZF7WLTtTQp5Mqco5r7U5rcY6ONezj0+0u37HRdHTNZv3P+jo5j1m/cpxA5/JTKOayVKMkzpKKR3aRp3t9pNp9GyZkbLZoZY1xY98jmrpRXuOZ6OY9Zv3KcTrbLb0tdsgokkWRIkVM9UwxxXHu+YG0AAAAAIUgFAAAAAAAAAAAAAAAAAAAAACFIBQAAAAAAAAAAAAAAAAAAAAAhSAUAAAAAAAAAAAAAAAAAAAAAIUgH//Z";

  //liked
  const handlelike = async (_id) => {
    if (userid) {
      setlike(false);
      setlikecount((pre) => pre + 1);
      const response = await axios.put("http://localhost:4001/like", {
        userid,
        _id,
      });
    } else {
      alert("login to like");
    }
  };

  //remove like
  const handleremovelike = async (_id) => {
    if (userid) {
      setlikecount((pre) => pre - 1);
      setlike(true);
      const response = await axios.delete("http://localhost:4001/like", {
        params: {
          userid,
          _id,
        },
      });
    } else {
      alert("login to like");
    }
  };

  //saving the items to saved list
  const handlesave = async (_id) => {
    if (userid) {
      setsave(false);
      const response = await axios.put("http://localhost:4001/saved", {
        userid,
        _id,
      });
    } else {
      alert("login to save");
    }
  };

  //remove saved
  const handleremovesave = async (_id) => {
    if (userid) {
      setsave(true);
      const response = await axios.delete("http://localhost:4001/saved", {
        params: {
          userid,
          _id,
        },
      });
    } else {
      alert("login to save");
    }
  };
  const handleinfopage=(id)=>{
      navigate(`/receipe/${id}`)
  }
  return (
    <div className="Cardbox shadow-lg rounded-3 bg-light mt-5 mx-2">
      <img className="shadow-sm rounded-3" src={img} alt="" onClick={()=>handleinfopage(item._id)}/>
      <div className="d-flex align-items-center justify-content-between">
        <div className="name px-5 py-2">
          <h2>{item.name}</h2>
        </div>

        <div className="like mx-2 mt-3">
          <>
            {like ? (
              <FavoriteBorderIcon
                className="border-0 bg-transparent"
                onClick={() => handlelike(item._id)}
                style={{ fontSize: 32, cursor: "pointer" }}
              />
            ) : (
              <FavoriteIcon
                className="border-0 bg-transparent"
                onClick={() => handleremovelike(item._id)}
                style={{ fontSize: 32, cursor: "pointer" }}
              />
            )}
            {likecount}
          </>
        </div>
        <div className="save mx-1 mt-3">
          <>
            {save ? (
              <BookmarkBorderIcon
                className="border-0 bg-transparent"
                onClick={() => handlesave(item._id)}
                style={{ fontSize: 32, cursor: "pointer" }}
              />
            ) : (
              <BookmarkIcon
                className="border-0 bg-transparent"
                onClick={() => handleremovesave(item._id)}
                style={{ fontSize: 32, cursor: "pointer" }}
              />
            )}
          </>
        </div>
      </div>

      <div className="username d-flex justify-content-end px-3">
        <p
          className="btn btn-link text-underline-none"
          onClick={() => handlenameclick(item.creatorid)}
        >
          -{item.creatorname}
        </p>
      </div>
    </div>
  );
};

export default Card;
