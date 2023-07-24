import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  Input,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import List, { ListProps } from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListDivider from "@mui/joy/ListDivider";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Typography from "@mui/joy/Typography";
import useExam from "@/hooks/exam/useExam";
import { useParams } from "react-router-dom";
import CongratCard from "../CongratCrad";
import { useForm } from "react-hook-form";
function ExamTest() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [orientation, setOrientation] =
    React.useState<ListProps["orientation"]>("vertical");
  const [examData, setExamData] = useState({});
  const [showCongrat, setShowCongrat] = useState(false);
  const { id: examId } = useParams();
  const { data } = useExam(Number(examId));

  const handleClose = () => {
    setShowCongrat(false);
  };
  const [value, setValue] = React.useState({});

  const handleRadioChange = (questionIndex: any) => (event: any) => {
    setValue({
      ...value,
      [questionIndex]: event.target.value,
    });
  };

  // ...

  const onSubmit = (data) => {
    console.log(data);
    setShowCongrat(true);
    console.log("submit");
  };
  useEffect(() => {
    setExamData({ ...data });
  }, [data]);
  console.log(data?.questions?.options);
  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   console.log(value);
  //   // check exam condition
  //   setShowCongrat(true); // show CongratCard when exam conditions meet
  // };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card style={{ padding: "50px" }}>
        <CardContent>
          <Typography variant="h4">Take an exam {examData.name}</Typography>
          {examData?.questions?.map((item: any, index: number) => (
            <Grid
              key={index}
              container
              spacing={3}
              style={{ marginTop: "10px" }}
            >
              <Grid item md={12} xs={12}>
                <Typography
                  id="example-payment-channel-label"
                  level="body3"
                  textTransform="uppercase"
                  fontWeight="xl"
                  variant="h4"
                >
                  Question {index + 1}: {item?.name}
                </Typography>
                {errors[`${item.id}`] && <span>This field is required</span>}
              </Grid>
              <Grid item md={12} xs={12}>
                <RadioGroup
                  aria-labelledby="example-payment-channel-label"
                  overlay
                  name="example-payment-channel"
                  defaultValue="Paypal"
                >
                  <List
                    component="div"
                    variant="outlined"
                    orientation={orientation}
                    sx={{
                      borderRadius: "sm",
                      boxShadow: "sm",
                      bgcolor: "background.body",
                    }}
                  >
                    {item?.options?.map((value, index) => (
                      <React.Fragment key={value}>
                        {index !== 0 && <ListDivider />}
                        <ListItem>
                          <Radio
                            id={value}
                            value={value}
                            label={value}
                            onChange={handleRadioChange(item.id)}
                            {...register(`${item.id}`, {
                              required: true,
                            })}
                          />
                        </ListItem>
                      </React.Fragment>
                    ))}
                  </List>
                </RadioGroup>
              </Grid>
            </Grid>
          ))}
        </CardContent>
      </Card>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "end",
          mx: -1,
          mb: -1,
          mt: 3,
        }}
      >
        <Button sx={{ m: 1 }} type="submit" variant="contained">
          Save
        </Button>
      </Box>
      <CongratCard showCongrat={showCongrat} onClose={handleClose} />
    </form>
  );
}

export default ExamTest;
