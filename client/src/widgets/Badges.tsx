import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { FunctionComponent, useEffect } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


interface BadgesProps {
  items: Array<string>;
  setLength: number;
  dataType: string;
}

const   Badges: FunctionComponent<BadgesProps> = ({ items, setLength , dataType}) => {
 

  let navigate = useNavigate();
  return (
    
    <Box
      sx={{
        marginLeft: "-3px",
        display: "flex",
        flexWrap: "wrap",
        gridAutoRows: "minmax(100px, auto)",
        mb: "10px",
        height: "100%" ,
        overflow: "hidden",
      }}
    >
      {items && items.map(
        (badge, i) =>
          i < setLength && (
            <Button
            onClick={() => navigate(`/browser?${dataType}=${badge}`)}
              key={i}
              variant="contained"
              sx={{
                backgroundColor: "secondary",
                padding: "3px",
                margin: "3px",
                fontSize: "10px",
                "&:hover": { color: "white" },
              }}
            >
              <Typography
                paddingInline={"2px"}
                color={"text.secondery"}
                fontWeight={500}
                fontSize={12}
                sx={{ "&:hover": { color: "white" } }}
              >
                {badge}
              </Typography>
            </Button>
          )
      )}
    </Box>
  );
};

export default Badges;
